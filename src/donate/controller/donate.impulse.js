export default class DonateImpulse {
  constructor ($uibModalInstance, $uibModal, $window, $filter, institution, donate, ProfileService, DonateService, StorageService, LocationService, AuthService) {
    this.instance = $uibModalInstance
    this.modal = $uibModal
    this.window = $window
    this.filter = $filter
    this.profileService = ProfileService
    this.donateService = DonateService
    this.storageService = StorageService
    this.locationService = LocationService
    this.authService = AuthService
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
    // this.inputNumber = document.querySelector('input[name="number"')
  }
  login () {
    let modalInstance = this.modal.open({
      templateUrl: './../src/auth/view/modal/login.html',
      controller: 'ModalAuthLogin',
      controllerAs: 'ctrl',
      backdrop: 'static',
      size: 'sm',
      keyboard: false,
      resolve: {
        redirect: () => {
          return false
        }
      }
    })
    modalInstance.result.then(profile => {
      this.inputDocument = document.querySelector('input[name="document"]')
      if (!profile.document) {
        setTimeout(() => {
          this.inputDocument.focus()
        }, 100)
      }
      this.logged = this.storageService.getItem('token')
      this.getProfile()
    })
  }
  getProfile () {
    this.profileService.me()
      .then(
        response => {
          let {...profile} = angular.copy(response.data)
          profile.birthdate = this.filter('date')(profile.birthdate, 'dd/MM/yyyy')
          this.missingDoc = (profile.document) ? false : true
          profile = {
            name: profile.name,
            birthdate: this.filter('date')(profile.birthdate, 'dd/MM/yyyy'),
            email: profile.email,
            document: profile.document,
            type: profile.type,
            city: profile.city,
            district: profile.district,
            number: profile.number,
            state: profile.state,
            street: profile.street,
            zip_code: profile.zip_code
          }
          angular.extend(this.donate, profile)
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
    } else if (!this.donate.zip_code || !this.donate.street || !this.donate.number || !this.donate.city || !this.donate.state || !this.donate.district) {
      this.goToAddress()
    } else {
      this.checkoutBillet()
    }
  }
  checkEmail (email) {
    if (email) {
      this.authService.checkEmail(email)
        .then(response => this.login())
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
      delete donate.avatar
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

DonateImpulse.$inject = ['$uibModalInstance', '$uibModal', '$window', '$filter', 'institution', 'donate', 'ProfileService', 'DonateService', 'StorageService', 'LocationService', 'AuthService']
