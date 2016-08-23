import CommonService  from './common.js'

export default class CityService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('cities')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

CityService.$inject = ['API','$http']