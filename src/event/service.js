import CommonService  from './../common/service/common.js'

export default class EventService {
  constructor(API, $http, $q) {
    this.$q = $q

  }
}

EventService.$inject = ['API','$http','$q']