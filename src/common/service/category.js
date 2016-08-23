import CommonService  from './common.js'

export default class CategoryService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('categories')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

CategoryService.$inject = ['API','$http']