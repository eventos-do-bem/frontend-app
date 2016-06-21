
import Config   from './config.js'
import Service  from './service.js'
import Register from './controller/register.js'
import Me       from './controller/me.js'
import Change   from './controller/change.js'

export default angular
  .module('user', [])
  .config(Config)
  .controller('UserMeController', Me)
  .controller('UserChangeController', Change)
  .controller('UserRegisterController', Register)
  .service('UserService', Service)
