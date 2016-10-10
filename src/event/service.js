import CommonService  from './../common/service/common.js'

export default class EventService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
  }
  findAll() {
    this.setPublicToken()
    this.setRoute('events')
    return super.findAll()
  }
  findById(id) {
    this.setPublicToken()
    this.setRoute('events')
    return super.findById(id)
  }
  search(data) {
    this.setPublicToken()
    this.setParams(data)
    this.setRoute('events')
    return super.search()
  }
  save(data) {
    this.setRoute('events/create')
    return this.create(data)
  }
}

EventService.$inject = ['API','$http']