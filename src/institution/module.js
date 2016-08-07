import Config       from './config.js'
import Service      from './service.js'

export default angular
  .module('institution', [])
  .config(Config)
  .service('InstitutionService', Service)
