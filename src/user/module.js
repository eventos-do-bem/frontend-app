
import Config           from './config.js'
import Service          from './service.js'
import Register         from './controller/register.js'
import Confirmation     from './controller/confirmation.js'
import Me               from './controller/me.js'
import MeConfigurations from './controller/me.configurations.js'
import Change           from './controller/change.js'

export default angular
  .module('user', [])
  .config(Config)
  .controller('UserMe', Me)
  .controller('UserMeConfigurations', MeConfigurations)
  .controller('UserChange', Change)
  .controller('UserConfirmation', Confirmation)
  .controller('UserRegister', Register)
  .service('UserService', Service)
