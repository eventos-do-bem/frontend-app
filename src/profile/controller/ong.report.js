export default class OngReport {
  constructor($rootScope, EventService, $stateParams) {
    this.rootScope = $rootScope
    this.service = EventService
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
  getEvent(id) {
    this.service.findById(id)
      .then(
        response => this.event = response.data,
        error => console.error(error)
      )
  }
  getReport(id) {
    this.service.getReport(id)
      .then(
        response => {
          this.report = response.data
          delete this.report.picture1
          delete this.report.picture2
          delete this.report.picture3
          delete this.report.picture4
        },
        error => console.error(error)
      )
  }
  save(id, data, submission) {
    let feedbackMessage
    if (submission) {
      data.submission = true
      feedbackMessage = 'Seu relatório foi enviado para aprovação, aguarde e se estiver tudo correto, será publicado.'
    } else {
      feedbackMessage = 'Seu relatório foi salvo, e permanece em progresso, assim que concluído, submeta para avaliação.'
    }
    this.service.saveReport(id, data, progress => {
      this.progress = progress
    }).then(response => {
      this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: feedbackMessage})
    }, error => {
      console.error(error.data)
    })
  }
}

OngReport.$inject = ['$rootScope','EventService','$stateParams']