export default class EventStart {
  constructor($state, $window, $stateParams, CityService, EventService, CategoryService, InstitutionService) {
    console.log('start')
    this.$state = $state
    this.window = $window
    this.service = EventService
    if (this.hasDraft()) {
      this.draft = this.getDraft()
    }
    this.event = {}
    // this.categories = [
    //   { id: 'Aniversários', label: 'Aniversários' },
    //   { id: 'Casamentos', label: 'Casamentos' },
    //   { id: 'Corridas', label: 'Corridas' },
    //   { id: 'Jantares', label: 'Jantares' },
    //   { id: 'Voluntariado', label: 'Voluntariado' }
    // ]
    CityService.findAll()
      .then(response => this.cities = response.data.values)    
    InstitutionService.findAll()
      .then(response => this.institutions = response.data.values)
    CategoryService.findAll()
      .then(response => this.categories = response.data.values)
  }
  save(event) {
    event = angular.copy(event)
    event.institution_uuid = event.institution_uuid.uuid
    // let end_date = event.end_date.split('/')
    // event.end_date = `${end_date[2]}-${end_date[1]}-${end_date[0]}`
    console.log(JSON.stringify(event))
    this.service.save(event)
      .then(
        response => console.log(response),
        error => console.error(error)
      )
  }
  getAttr(name,attr) {
    let e = document.querySelector(`[name='${name}']`)
    return e.getAttribute(attr)
  }
  saveDraft(event) {
    let draft = angular.copy(event)
    this.window.localStorage.setItem('draftEvent', JSON.stringify(draft))
  }
  getDraft() {
    let draft = this.window.localStorage.getItem('draftEvent')
    return JSON.parse(draft)
  }
  loadDraft() {
    this.event = this.getDraft()
  }
  removeDraft() {
    this.window.localStorage.removeItem('draftEvent')
  }
  hasDraft() {
    return !!this.window.localStorage.getItem('draftEvent')
  }
}

EventStart.$inject = ['$state','$window','$stateParams', 'CityService', 'EventService', 'CategoryService', 'InstitutionService']