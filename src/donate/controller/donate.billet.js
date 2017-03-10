export default class DonateBillet {
  constructor($uibModalInstance, data, DonateService, StorageService) {
    this.instance = $uibModalInstance
    this.donateService = DonateService
    this.uuid = data.uuid
    this.donate = data.donate
    this.user = data.user
    this.donate.is_anonymous = false
    this.logged = StorageService.getItem('token')
    this.amountOptions = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ',',
      mDec: '2',
      lZero: 'deny',
      aPad: true
    }
  }
  buildBillet() {
    let method = (this.logged) ? 'printLoggedBillet' : 'printPublicBillet'
    this.donateService[method](this.uuid, this.donate)
      .then(
        response => this.instance.close({uuid: this.uuid, data: response.data}),
        error => this.instance.dismiss(error.data)
      )
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

DonateBillet.$inject = ['$uibModalInstance', 'data', 'DonateService', 'StorageService']