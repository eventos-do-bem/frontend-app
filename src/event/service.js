import CommonService  from './../common/service/common.js'

export default class EventService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.$http = $http
  }
  findAll(params) {
    super.setRoute('events')
    super.setPublicToken()
    if (params != undefined) {
      super.setParams(params)
    }
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
  save(data, progress) {
    super.setRoute('events/create')
    console.log(data)
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
  getMessages(id, user = null) {
    super.setRoute(`events/${id}/messages`)
    if (user) {
      super.setParams(user)
    }
    return this.$http.get(this.url + this.route, this.config)
  }
  getMessagesPublic(id, user = null) {
    super.setRoute(`events/${id}/messages`)
    super.setPublicToken()
    if (user) {
      super.setParams(user)
    }
    console.log(this.config)
    return this.$http.get(this.url + this.route, this.config)
  }
  saveReport(id, data, progress) {
    super.setRoute(`events/${id}/report/submit`)
    return super.postWithFile(data, progress)
  }
  authorizeReport(id, data) {
    super.setRoute(`reports/${id}`)
    return this.$http.put(this.url + this.route, data)
  }
}

EventService.$inject = ['API','$http']