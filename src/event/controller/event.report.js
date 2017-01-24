class EventReport {
  constructor($state, $stateParams,EventService,StorageService,$uibModal,$rootScope) {
    this.state = $state
    this.service = EventService
    this.profile = StorageService.getItem('profile')
    if ($stateParams.uuid) {
      this.uuid = $stateParams.uuid
      this.getReport($stateParams.uuid)
    }
    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.active = 0;
    this.pagination = { current_page: 1 }
    this.modal = $uibModal
    this.rootScope = $rootScope
  }
  getRepeat(num) {
    return new Array(num)
  }
  getMessages(id, params) {
    let method = (this.profile) ? 'getMessages' : 'getMessagesPublic'
    params.page = this.pagination.current_page
    this.service[method](id, params)
      .then(response => {
        this.pagination = response.data.meta.pagination
        this.report.messages = response.data
      })
  }
  getReport(id) {
    let method = (this.profile) ? 'getReport' : 'getReportPublic'
    this.service[method](id)
      .then(
        response => {
          // console.log(response.data)
          if (response.data) {
            this.report = response.data
            // console.log(this.report.occurrence)
            if (this.report.messages.contains) {
              this.getMessages(this.uuid, {})
            }
            this.slides = []
            let x, picture
            for (x = 0; x < 3; x++) {
              picture = `picture${x + 1}`
              this.slides.push({
                id: x,
                image: this.report[picture].original
              })
            }
            if (!this.report.authorized_on && (this.profile.permissions['administration.global'] || this.profile.permissions.authorize_report)) {
              this.authorize_report = true
            }
          } else {
            this.state.go('home')
          }
        },
        error => console.error(error)
      )
  }
  authorizeReport() {
    let modalInstance = this.modal.open({
      templateUrl: './../src/event/view/report.authorize.html',
      controller: 'ReportAuthorize',
      controllerAs: 'ctrl',
      resolve: {
        uuid: () => {
          return this.report.uuid
        }
      }
    })
    modalInstance.result.then(response => {
      console.log('ok',response)
      this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.status})
    }, error => {
      console.error('no',error)
      this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error})
    })
  }
}

EventReport.$inject = ['$state','$stateParams','EventService','StorageService','$uibModal','$rootScope']

export default EventReport