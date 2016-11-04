import CommonService  from './../common/service/common.js'

export default class InstitutionService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    super.setRoute('institutions')
  }
  findById(slug) {
    super.setPublicToken()
    return super.findById(slug)
  }
  findAll() {
    super.setPublicToken()
    return super.findAll()
  }
  savePage(uuid,data) {
    super.setRoute(`institutions/${uuid}/page`)
    return super.create(data)
  }
  search(data) {
    super.setPublicToken()
    super.setParams(data)
    return super.search()
  }
}

InstitutionService.$inject = ['API','$http']