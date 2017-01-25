import CommonService  from './../common/service/common.js'

export default class FaqService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
    this.$http = $http
  }
  findAll(params) {
    super.setRoute('faq')
    super.setPublicToken()
    if (params != undefined) {
      super.setParams(params)
    }
    return super.findAll()
  }
  findById(id) {
    super.setRoute('faq')
    super.setPublicToken()
    return super.findById(id)
  }
  filter(data) {
    super.setRoute('faq')
    super.setPublicToken()
    super.setParams(data)
    return super.findAll()
  }
}

FaqService.$inject = ['$http','envService']