import CommonService  from './service/common.js'
import Header         from './controller/header.js'

export default angular
  .module('common', [])
  .service('CommonService', CommonService)
  .controller('Header', Header)