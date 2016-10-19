import Config       from './config.js'
import Service      from './service.js'
import Page         from './controller/page.js'

export default angular
  .module('institution', [])
  .config(Config)
  .service('InstitutionService', Service)
  .controller('Page', Page)
