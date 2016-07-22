import CommonService    from './service/common.js'
import FacebookService  from './service/facebook.js'
import Header           from './controller/header.js'
import Storage          from './service/storage.js'
import Hydrator         from './service/hydrator.js'

export default angular
  .module('common', [])
  .service('CommonService', CommonService)
  .service('FacebookService', FacebookService)
  .service('StorageService', Storage)
  .service('Hydrator', Hydrator)
  .controller('Header', Header)