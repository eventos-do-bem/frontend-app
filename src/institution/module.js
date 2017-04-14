import Config           from './config.js'
import Service          from './service.js'
import Page             from './controller/page.js'
import PagePreview      from './controller/page.preview.js'
import RememberBirthday from './controller/remember.birthday.js'

export default angular
  .module('institution', [])
  .config(Config)
  .service('InstitutionService', Service)
  .controller('Page', Page)
  .controller('PagePreview', PagePreview)
  .controller('RememberBirthday', RememberBirthday)
