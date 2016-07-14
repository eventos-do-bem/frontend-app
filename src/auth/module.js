
import AuthConfig       from './config.js'
import AuthLogin        from './controller/login.js'
import AuthLogout       from './controller/logout.js'
import AuthService      from './service.js'
import FbService        from './social/facebook.js'

export default angular
  .module('auth', [])
  .config(AuthConfig)
  .controller('AuthLogin', AuthLogin)
  .controller('AuthLogout', AuthLogout)
  .service('AuthService', AuthService)
  .service('FbService', FbService)
