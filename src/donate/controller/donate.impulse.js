export default class DonateImpulse {
  constructor($uibModalInstance, institution, profile, ProfileService, DonateService, StorageService) {
    this.instance = $uibModalInstance
    this.donateService = DonateService
    this.institution = institution
    this.step = 'amount'
    this.profile = profile
    this.donate = this.profile
    // this.logged = StorageService.getItem('token')
    this.amountOptions = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ',',
      mDec: '2',
      lZero: 'deny',
      aPad: true
    }
    this.months = []
    for (let m = 1; m <= 12; m++) {
      if (m <= 9) {
        this.months.push(`0${m}`)
      } else {
        this.months.push(m)
      }
    }
    this.years = []
    let today = new Date()
    let curYear = today.getFullYear()
    for (let y = curYear; y <= curYear + 10; y++) this.years.push(y)
  }
  suggest(amount) {
    this.donate.amount = amount
  }
  goToAmount() {
    this.step = 'amount'
  }
  chooseCard() {
    if (!(this.donate.name && this.donate.email && this.donate.document && this.donate.email)) {
      this.step = 'perfil'
    } else {
      this.step = 'credit_card'
    }
  }
  goToCard() {
    this.step = 'credit_card'
  }
  chooseBillet() {
    if (!(this.donate.name && this.donate.email && this.donate.document && this.donate.email)) {
      this.step = 'perfil'
    } else {
      this.step = 'finish'
    }
  }
  checkoutCard() {
    this.step = 'finish'
  }
  finish(donate) {
    this.instance.close(donate)
    // let method = (this.logged) ? 'printLoggedBillet' : 'printPublicBillet'
    // // this.donate.amount = parseInt(this.donate.amount)
    // this.donateService[method](this.uuid, this.donate)
    //   .then(
    //     response => this.instance.close({uuid: this.uuid, data: response.data}),
    //     error => this.instance.dismiss(error.data)
    //   )
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

DonateImpulse.$inject = ['$uibModalInstance', 'institution', 'profile', 'ProfileService', 'DonateService', 'StorageService']