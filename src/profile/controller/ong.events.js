export default class OngEvents {
  constructor($rootScope, $uibModal, $state, ProfileService) {
    this.rootScope = $rootScope
    this.modal = $uibModal
    this.state = $state
    this.service = ProfileService
    this.pendings = 0
    this.pagination = { current_page: 1 }
    this.getEvents()
  }
  getEvents() {
    this.service.getEvents({
      withoutReport: true,
      page: this.pagination.current_page
    }).then(response => {
      // console.log(response)
      this.pagination = response.data.meta.pagination
      this.events = response.data.values.map(event => {
        event.dateStartSubmissionReport = new Date(event.dateStartSubmissionReport)
        return event
      })      
    })

    this.service.getEvents({
      onlyEnabledToReceiveReport: true,
      total: true
    }).then(response => {
      // console.log(response)
      this.pendings = response.data.total
      
      if (this.pendings > 0) {
        this.rootScope.$broadcast('alert', {
          type: 'alert-warning',
          icon: 'fa-warning',
          message: {
            message: `Você tem ${this.pendings} relatórios pendentes.`
          }
        })
      }
    })
  }
  changePage() {
    this.getEvents()
  }
  reportSubmit(event) {
    if (!event.enabledToReceiveReport) {
      this.canNotYetReportSubmit(event)
    } else {
      this.state.go('profile.ong.report', {uuid: event.uuid})
    }
  }
  canNotYetReportSubmit(event) {
    let modalInstance = this.modal.open({
      templateUrl: './../src/profile/view/ong.report.notyet.html',
      controller: 'OngReportNotYet',
      controllerAs: 'ctrl',
      windowClass: 'modal-default',
      resolve: {
        event: event
      }
    })
  }
}

OngEvents.$inject = ['$rootScope','$uibModal','$state','ProfileService']