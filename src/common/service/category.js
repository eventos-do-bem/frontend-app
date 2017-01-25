import CommonService  from './common.js'

export default class CategoryService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
    this.setRoute('categories')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

CategoryService.$inject = ['$http','envService']