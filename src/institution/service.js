import CommonService  from './../common/service/common.js'

export default class InstitutionService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('institutions')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

InstitutionService.$inject = ['API','$http']