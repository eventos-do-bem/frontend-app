import CommonService  from './common.js'

export default class ActivityAreaService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
    this.setRoute('activityAreas')
  }
  findAll() {
    this.setPublicToken()
    return super.findAll()
  }
}

ActivityAreaService.$inject = ['$http','envService']