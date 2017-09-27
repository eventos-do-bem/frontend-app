export default class OngReport {
  constructor ($rootScope, EventService, $stateParams, $uibModal, $location, $anchorScroll, Currency, Regex, TourFactory) {
    this.rootScope = $rootScope
    this.service = EventService
    this.stateParams = $stateParams
    this.modal = $uibModal
    this.location = $location
    this.anchorScroll = $anchorScroll
    this.currency = Currency
    this.regex = Regex
    this.tour = TourFactory
    this.report = {}
    this.images = {}
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid)
      this.getReport($stateParams.uuid)
    }
    this.benefit = [
      {label: 'Crianças', value: 'children'},
      {label: 'Jovens', value: 'young'},
      {label: 'Pessoas', value: 'people'},
      {label: 'Familias', value: 'families'},
      {label: 'Idosos', value: 'elderly'},
      {label: 'Animais', value: 'animals'},
      {label: 'Cachorros', value: 'dogs'},
      {label: 'Gatos', value: 'cats'},
      {label: 'Árvores', value: 'trees'}
    ]
  }
  initTour () {
    this.tour.init('ongReportTour')
    this.tour.start()
  }
  getEvent (id) {
    this.service.findById(id)
      .then(
        response => this.event = response.data,
        error => console.error(error)
      )
  }
  addPicture (pictures, picture, index) {
    if (picture && picture.indexOf('http') !== -1) {
      pictures[index] = picture
    }
    return pictures
  }
  getReport (id) {
    this.service.getReport(id)
      .then(
        response => {
          this.images = {}
          let report = response.data
          this.images = this.addPicture(this.images, report.picture1.thumb, 'picture1')
          this.images = this.addPicture(this.images, report.picture2.thumb, 'picture2')
          this.images = this.addPicture(this.images, report.picture3.thumb, 'picture3')
          this.images = this.addPicture(this.images, report.picture4.thumb, 'picture4')
          this.report = report
          delete this.report.picture1
          delete this.report.picture2
          delete this.report.picture3
          delete this.report.picture4
        },
        error => console.error(error)
      )
  }
  save (id, report, submission) {
    if (report.video && report.video.trim().indexOf('http') !== 0) {
      report.video = 'http://' + report.video
    }
    if (report.video == null) {
      delete report.video
    }
    if (report.messageOrganizer == null) {
      delete report.messageOrganizer
    }

    let feedbackMessage
    if (submission) {
      report.submission = true
      feedbackMessage = 'Seu relatório foi enviado para aprovação, aguarde e se estiver tudo correto, será publicado.'
    } else {
      feedbackMessage = 'Seu relatório foi salvo, e permanece em progresso, assim que concluído, submeta para avaliação.'
    }
    this.service.saveReport(id, report, progress => {
      this.progress = progress
    }).then(response => {
      if (submission) {
        this.modal.open({
          templateUrl: './../src/profile/view/ong.report.submit.html',
          controller: 'OngReportSubmit',
          controllerAs: 'ctrl'
        })
      }
      this.getReport(this.stateParams.uuid)
      this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: { message: feedbackMessage }})
      this.location.hash('body')
      this.anchorScroll()
    }, error => {
      if (error.status === 412) {
        this.getReport(this.stateParams.uuid)
      }
      this.rootScope.$broadcast('alert', {type: 'alert-warning', icon: 'fa-exclamation', message: error.data})
      this.location.hash('body')
      this.anchorScroll()
    })
  }
}

OngReport.$inject = ['$rootScope', 'EventService', '$stateParams', '$uibModal', '$location', '$anchorScroll', 'Currency', 'Regex', 'TourFactory']
