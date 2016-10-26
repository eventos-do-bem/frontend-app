import Config               from './config.js'
import ProfileService       from './service.js'
import ProfileRegister      from './controller/register.js'
import ProfileConfirmation  from './controller/confirmation.js'
import ProfileUser          from './controller/user.js'
import ProfileOng           from './controller/ong.js'
import UserConfigurations   from './controller/user.configurations.js'
import OngConfigurations    from './controller/ong.configurations.js'
import UserEvents           from './controller/user.events.js'
import UserImpacts          from './controller/user.impacts.js'
import OngEvents            from './controller/ong.events.js'
import UserReport           from './controller/user.report.js'
import OngPage              from './controller/ong.page.js'
import OngReport            from './controller/ong.report.js'
import OngHistory           from './controller/ong.history.js'
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
  .controller('UserImpacts', UserImpacts)
  .controller('OngEvents', OngEvents)
  .controller('UserReport', UserReport)
  .controller('OngPage', OngPage)
  .controller('OngReport', OngReport)
  .controller('OngHistory', OngHistory)
  .controller('ProfileChange', ProfileChange)
