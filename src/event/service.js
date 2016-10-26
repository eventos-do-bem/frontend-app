import CommonService  from './../common/service/common.js'

export default class EventService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    super.setRoute('events')
  }
  findAll() {
    super.setPublicToken()
    return super.findAll()
  }
  findById(id) {
    super.setPublicToken()
    return super.findById(id)
  }
  search(data) {
    super.setPublicToken()
    super.setParams(data)
    return super.search()
  }
  save(data) {
    super.setRoute('events/create')
    return super.create(data)
  }
}

EventService.$inject = ['API','$http']