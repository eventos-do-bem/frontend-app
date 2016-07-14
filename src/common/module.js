import CommonService  from './service/common.js'
import Header         from './controller/header.js'
import Storage        from './service/storage.js'

export default angular
  .module('common', [])
  .service('CommonService', CommonService)
  .service('StorageService', Storage)
  .controller('Header', Header)