import CommonService  from './../common/service/common.js'

export default class EventService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
  }
  save(data) {
    this.setRoute('events/create')
    return this.create(data)
  }
}

EventService.$inject = ['API','$http']