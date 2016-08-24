import CommonService  from './common.js'

export default class ActivityAreaService extends CommonService {
  constructor(API, $http) {
    super(API, $http)
    this.setRoute('activityAreas')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

ActivityAreaService.$inject = ['API','$http']