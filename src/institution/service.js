import CommonService  from './../common/service/common.js'

export default class InstitutionService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
  }
  findById(slug) {
    super.setRoute('institutions')
    super.setPublicToken()
    return super.findById(slug)
  }
  findAll() {
    super.setRoute('institutions')
    super.setPublicToken()
    return super.findAll()
  }
  getStatistics() {
    super.setRoute('institutions/statistics')
    return super.findAll()
  }
  savePage(data, progress) {
    super.setRoute(`institutions/${data.uuid}/page`)
    return super.postWithFile(data, progress)
  }
  update(data) {
    super.setRoute('institutions')
    return super.update(data)
  }
  search(data) {
    super.setRoute('institutions')
    super.setPublicToken()
    super.setParams(data)
    return super.search()
  }
}

InstitutionService.$inject = ['$http', 'envService']