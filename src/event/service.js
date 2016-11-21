import CommonService  from './../common/service/common.js'

export default class EventService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.$http = $http
    super.setRoute('events')
  }
  findAll() {
    super.setPublicToken()
    super.setRoute('events')
    return super.findAll()
  }
  findById(id) {
    super.setRoute('events')
    super.setPublicToken()
    return super.findById(id)
  }
  search(data) {
    super.setRoute('events')
    super.setPublicToken()
    super.setParams(data)
    return super.search()
  }
  getSlugByName(name) {
    super.setRoute(`events/create/previewSlug/${name}`)
    return this.$http.get(this.url + this.route, this.config)
  }
  save(data) {
    super.setRoute('events/create')
    return super.postWithFile(data, progress)
  }
  getReport(id) {
    super.setRoute(`events/${id}/report`)
    return this.$http.get(this.url + this.route)
  }
  getReportPublic(id) {
    super.setRoute(`events/${id}/report`)
    super.setPublicToken()
    return this.$http.get(this.url + this.route, this.config)
  }
  saveReport(id, data, progress) {
    super.setRoute(`events/${id}/report/submit`)
    return super.postWithFile(data, progress)
  }
}

EventService.$inject = ['API','$http']