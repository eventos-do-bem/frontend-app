export default class DonateImpulse {
  constructor ($uibModalInstance, $window, $filter, institution, donate, ProfileService, DonateService, StorageService, LocationService) {
    this.instance = $uibModalInstance
    this.window = $window
    this.filter = $filter
    this.profileService = ProfileService
    this.donateService = DonateService
    this.locationService = LocationService
    this.institution = institution
    this.step = 'amount'
    this.logged = StorageService.getItem('token')
    this.donate = donate ? this.donate = donate : this.donate = {}
    // this.donate = donate ? this.donate = donate : this.donate = {}
    if (this.logged) {
      this.getProfile()
    }
    this.amountOptions = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ',',
      mDec: '2',
      lZero: 'deny',
      aPad: true,
      vMin: '0.00'
    }
    this.months = ['01', '02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    this.years = []
    let today = new Date()
    let curYear = today.getFullYear()
    for (let y = curYear; y <= curYear + 10; y++) this.years.push(y)
    // this.inputCity = document.querySelector('input[name="city"]')
    // this.inputNumber = document.querySelector('input[name="number"')
  }
  getProfile () {
    this.profileService.me()
      .then(
        response => {
          this.donate = angular.copy(response.data)
          let {name, birthdate, email, type, document} = this.donate
          this.donate.birthdate = this.filter('date')(birthdate, 'dd/MM/yyyy')
          this.missingDoc = (this.donate.document) ? false : true
          // this.donate = {
          //   name: name,
          //   birthdate: this.filter('date')(birthdate, 'dd/MM/yyyy'),
          //   email: email,
          //   document: document,
          //   type: type
          // }
        }
      )
  }
  suggest (amount) {
    this.donate.amount = amount
  }
  goToAmount () {
    this.step = 'amount'
  }
  goToCard () {
    this.step = 'credit_card'
  }
  goToProfile () {
    this.step = 'profile'
  }
  goToAddress () {
    this.step = 'address'
    setTimeout(() => {
      this.inputNumber = document.querySelector('input[name="number"')
      this.inputCity = document.querySelector('input[name="city"]')
    }, 100)
    this.locationService.getStates()
      .then(response => { this.states = response.data.values })
  }
  chooseCard () {
    this.choose = 'card'
    if (!this.donate.name || !this.donate.birthdate || !this.donate.document || !this.donate.email) {
      this.goToProfile()
    } else if (!this.donate.zip_code || !this.donate.street || !this.donate.number || !this.donate.city || !this.donate.state || !this.donate.district) {
      this.goToAddress()
    } else {
      this.goToCard()
    }
  }
  chooseBillet () {
    this.choose = 'billet'
    if (!this.donate.name || !this.donate.birthdate || !this.donate.document || !this.donate.email) {
      this.goToProfile()
    } else if (!this.donate.zip_code || !this.donate.street || !this.donate.number || !this.donate.city && !this.donate.state && !this.donate.district) {
      this.goToAddress()
    } else {
      this.checkoutBillet()
    }
  }
  changeState () {
    setTimeout(() => {
      delete this.donate.city
      this.inputCity.focus()
    }, 100)
  }
  getCities (state, city) {
    return this.locationService.getCities(state, city)
      .then(response => {
        return response.data.values
      })
  }
  getAddress (zipcode) {
    if (zipcode) {
      this.inputNumber.focus()
      return this.locationService.getAddressByZipCode(zipcode)
        .then(response => {
          let {address, city, district, state} = response.data
          angular.extend(this.donate, {
            street: address,
            city: city,
            state: state,
            district: district
          })
        })
    }
  }
  checkoutBillet () {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      if (!this.missingDoc) {
        delete donate.document
      }
    } else {
      donate.document = donate.document.replace(/\-|\./g, '')
    }
    donate.is_anonymous = false
    let method = (this.logged) ? 'printLoggedBillet' : 'printPublicBillet'
    this.donateService[method](this.institution.uuid, donate)
      .then(
        response => {
          let billet = response.data.iugu_url.replace('?bs=true','.pdf')
          this.window.open(billet, '_self')
        },
        error => {
          if (error.data.errors) {
            for (let key in error.data.errors) {
              delete this.donate[key]
            }
          }
          this.instance.close(error.data)
        }
      )
  }
  checkoutCard () {
    let donate = angular.copy(this.donate)
    if (this.logged) {
      delete donate.name
      delete donate.email
      delete donate.birthdate
      if (!this.missingDoc) {
        delete donate.document
      }
    } else {
      donate.document = donate.document.replace(/\-|\./g, '')
    }
    donate.card_number = donate.card_number.replace(/\-/g, '')
    donate.card_validate = `${donate.card_month}/${donate.card_year}`
    donate.is_anonymous = false
    let method = (this.logged) ? 'payLogged' : 'payPublic'
    this.donateService[method](this.institution.uuid, donate)
      .then(response => {
        this.step = 'finish'
      }, error => {
        if (error.data && error.data.errors) {
          for (let key in error.data.errors) {
            delete this.donate[key]
          }
        } else {
          this.donate = {}
        }
        this.instance.close(error.data)
      })
  }
  close () {
    this.donate = {}
    this.instance.close()
  }
}

DonateImpulse.$inject = ['$uibModalInstance', '$window', '$filter', 'institution', 'donate', 'ProfileService', 'DonateService', 'StorageService', 'LocationService']
