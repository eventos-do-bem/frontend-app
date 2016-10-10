export default class DonateCard {
  constructor($uibModalInstance, data, DonateService, StorageService) {
    this.instance = $uibModalInstance
    this.donateService = DonateService
    this.uuid = data.uuid
    this.donate = data.donate
    this.donate.is_anonymous = false
    this.logged = StorageService.getItem('token')
  }
  buildCard() {
    let method = (this.logged) ? 'payLogged' : 'payPublic'
    this.donateService[method](this.uuid, this.donate)
      .then(
        response => this.instance.close({uuid: this.uuid, data: response.data}),
        error => this.instance.close(error.data)
      )
  }
  cancel() {
    this.instance.dismiss('cancel')
  }
}

DonateCard.$inject = ['$uibModalInstance', 'data', 'DonateService', 'StorageService']