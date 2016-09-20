import Config               from './config.js'
import ProfileService       from './service.js'
import ProfileRegister      from './controller/register.js'
import ProfileConfirmation  from './controller/confirmation.js'
import ProfileUser          from './controller/user.js'
import ProfileOng           from './controller/ong.js'
import UserConfigurations   from './controller/user.configurations.js'
import OngConfigurations    from './controller/ong.configurations.js'
import UserEvents           from './controller/user.events.js'
import OngEvents            from './controller/ong.events.js'
import ProfileChange        from './controller/change.js'

export default angular
  .module('profile', [])
  .config(Config)
  .service('ProfileService', ProfileService)
  .controller('ProfileRegister', ProfileRegister)
  .controller('ProfileConfirmation', ProfileConfirmation)
  .controller('ProfileUser', ProfileUser)
  .controller('ProfileOng', ProfileOng)
  .controller('UserConfigurations', UserConfigurations)
  .controller('OngConfigurations', OngConfigurations)
  .controller('UserEvents', UserEvents)
  .controller('OngEvents', OngEvents)
  .controller('ProfileChange', ProfileChange)
