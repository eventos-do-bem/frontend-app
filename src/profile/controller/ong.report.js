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
          console.log(response.data)
          delete this.report.picture1
          delete this.report.picture2
          delete this.report.picture3
        },
        error => console.error(error)
      )
  }
  save(id, data) {
    console.log(id, data)
    this.service.saveReport(id, data, progress => {
      this.progress = progress
    }).then(response => {
      this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.data.status})
    }, error => {
      console.error(error.data)
    })
  }
}

OngReport.$inject = ['$rootScope','EventService','$stateParams']