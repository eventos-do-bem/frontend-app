
import AuthConfig       from './config.js'
import AuthLogin        from './controller/login.js'
import ModalAuthLogin   from './controller/modal/login.js'
import AuthLogout       from './controller/logout.js'
import AuthForgot       from './controller/forgot.js'
import AuthRecovery     from './controller/recovery.js'
import AuthService      from './service.js'

export default angular
  .module('auth', [])
  .config(AuthConfig)
  .controller('AuthLogin', AuthLogin)
  .controller('ModalAuthLogin', ModalAuthLogin)
  .controller('AuthLogout', AuthLogout)
  .controller('AuthForgot', AuthForgot)
  .controller('AuthRecovery', AuthRecovery)
  .service('AuthService', AuthService)
