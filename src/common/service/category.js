import CommonService  from './common.js'

export default class CategoryService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('categories')
  }
}

CategoryService.$inject = ['API','$http']