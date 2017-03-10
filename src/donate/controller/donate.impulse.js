export default class DonateImpulse {
  constructor($uibModalInstance, $window, institution, donate, ProfileService, DonateService, StorageService) {
    this.instance = $uibModalInstance
    this.window = $window
    this.profileService = ProfileService
    this.donateService = DonateService
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
      aPad: true
    }
    this.months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    this.years = []
    let today = new Date()
    let curYear = today.getFullYear()
    for (let y = curYear; y <= curYear + 10; y++) this.years.push(y)
  }
  getProfile() {
    this.profileService.me()
      .then(
        response => {
          this.donate = angular.copy(response.data)
          let {name, birthdate, email, type, document} = this.donate
          this.donate.birthdate = new Date(birthdate)
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
  suggest(amount) {
    this.donate.amount = amount
  }
  goToAmount() {
    this.step = 'amount'
  }
  goToCard() {
    this.step = 'credit_card'
  }
  chooseCard() {
    this.choose = 'card'
    if (!(this.donate.name && this.donate.email && this.donate.document && this.donate.email)) {
      this.step = 'perfil'
    } else {
      this.step = 'credit_card'
    }
  }
  chooseBillet() {
    this.choose = 'billet'
    if (!(this.donate.name && this.donate.email && this.donate.document && this.donate.email)) {
      this.step = 'perfil'
    } else {
      this.checkoutBillet()
    }
  }
  checkoutBillet() {
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
  checkoutCard() {
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
      .then(
        response => this.step = 'finish',
        error => {
          if (error.data && error.data.errors) {
            for (let key in error.data.errors) {
              delete this.donate[key]
            }
          } else {
            this.donate = {}
          }
          this.instance.close(error.data)
        }
      )
  }
  close() {
    this.donate = {}
    this.instance.close()
  }
}

DonateImpulse.$inject = ['$uibModalInstance', '$window', 'institution', 'donate', 'ProfileService', 'DonateService', 'StorageService']