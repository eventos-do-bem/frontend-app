import CommonService    from './service/common.js'
import FacebookFactory  from './factory/facebook.js'
import FacebookService  from './service/facebook.js'
import Header           from './controller/header.js'
import Storage          from './service/storage.js'
import Hydrator         from './service/hydrator.js'

export default angular
  .module('common', [])
  .service('CommonService', CommonService)
  .factory('FacebookFactory', FacebookFactory.facebookFactory)
  .service('FacebookService', FacebookService)
  .service('StorageService', Storage)
  .service('Hydrator', Hydrator)
  .controller('Header', Header)