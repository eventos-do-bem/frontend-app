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
  pay(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/credit_card')
    return this.$http.post(this.url + this.route, data, this.config)
  }
  payLogged(uuid, data) {
    return this.pay(uuid, data)
  }
  payPublic(uuid, data) {
    this.setPublicToken()
    return this.pay(uuid, data)
  }
  printBillet(uuid, data) {
    this.setRoute('payments/event/' + uuid + '/boleto')
    return this.$http.post(this.url + this.route, data, this.config)
  }
  printLoggedBillet(uuid, data) {
    return this.printBillet(uuid, data)
  }
  printPublicBillet(uuid, data) {
    this.setPublicToken()
    return this.printBillet(uuid, data)
  }
}

EventService.$inject = ['API','$http']