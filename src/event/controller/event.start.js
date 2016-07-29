export default class EventStart {
  constructor($state, $window, $stateParams, EventService) {
    this.$state = $state
    this.window = $window
    this.service = EventService
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
    this.event = JSON.parse(draft)
  }
  removeDraft() {
    this.window.localStorage.removeItem('draftEvent')
  }
  hasDraft() {
    return !!this.window.localStorage.getItem('draftEvent')
  }
}

EventStart.$inject = ['$state','$window','$stateParams', 'EventService']