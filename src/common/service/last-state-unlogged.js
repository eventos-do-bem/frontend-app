export default class LastStateUnlogged {
  constructor() {
    this.name
    this.params
  }
  setName(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  setParams(params) {
    this.params = params
  }
  getParams() {
    return this.params
  }
  clear() {
    this.name = null
    this.params = null
  }
}

LastStateUnlogged.$inject = []