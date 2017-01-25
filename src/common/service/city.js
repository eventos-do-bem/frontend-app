import CommonService  from './common.js'

export default class CityService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
    this.setRoute('cities')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

CityService.$inject = ['$http','envService']