import CommonService  from './common.js'

export default class CityService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('cities')
  }
}

CityService.$inject = ['API','$http']