export default class ReportAuthorize {
  constructor($uibModalInstance, uuid, EventService) {
    this.instance = $uibModalInstance
    this.service = EventService
    this.uuid = uuid
  }
  ok() {
    this.service.authorizeReport(this.uuid, {authorize:1})
      .then(
        response => this.instance.close({uuid: this.uuid, data: response.data}),
        error => this.instance.close(error.data)
      )
  }
  cancel() {
    this.data.authorize = 0
    this.service.authorizeReport(this.uuid, this.data)
      .then(
        response => this.instance.dismiss({uuid: this.uuid, data: response.data}),
        error => this.instance.dismiss(error.data)
      )
  }
}

ReportAuthorize.$inject = ['$uibModalInstance', 'uuid', 'EventService']