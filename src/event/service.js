import CommonService  from './../common/service/common.js'

export default class EventService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('events')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
  findById(id) {
    this.setPublicToken()
    return super.findById(id)
  }
  search(data) {
    this.setPublicToken()
    this.setParams(data)
    return super.search()
  }
  save(data) {
    this.setRoute('events/create')
    return this.create(data)
  }
  pay(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/credit_card')
    return this.create(data)
  }
}

EventService.$inject = ['API','$http']