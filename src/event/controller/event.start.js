export default class EventStart {
  constructor($state, $window, $stateParams, EventService, InstitutionService) {
    this.$state = $state
    this.window = $window
    this.service = EventService
    if (this.hasDraft()) {
      this.draft = this.getDraft()
    }
    this.categories = [
      { id: 'Aniversários', label: 'Aniversários' },
      { id: 'Casamentos', label: 'Casamentos' },
      { id: 'Corridas', label: 'Corridas' },
      { id: 'Jantares', label: 'Jantares' },
      { id: 'Voluntariado', label: 'Voluntariado' }
    ]
    InstitutionService.findAll()
      .then(response => this.institutions = response.data.values)
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

EventStart.$inject = ['$state','$window','$stateParams', 'EventService', 'InstitutionService']