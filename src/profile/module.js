import Config                   from './config.js'
import ProfileService           from './service.js'
import ProfileRegister          from './controller/register.js'
import ProfileConfirmation      from './controller/confirmation.js'
import ProfileUser              from './controller/user.js'
import ProfileOng               from './controller/ong.js'
import Unavailable              from './controller/unavailable.js'
import EventDonors              from './controller/event.donors.js'
import UserConfigurations       from './controller/user.configurations.js'
import OngConfigurations        from './controller/ong.configurations.js'
import UserEvents               from './controller/user.events.js'
import UserImpacts              from './controller/user.impacts.js'
import OngEvents                from './controller/ong.events.js'
import OngPage                  from './controller/ong.page.js'
import OngReport                from './controller/ong.report.js'
import OngHistory               from './controller/ong.history.js'
import ProfileChange            from './controller/change.js'
import UserEventsRemoveConfirm  from './controller/user.events.remove.confirm.js'
import UserEventsRemoveDenied   from './controller/user.events.remove.denied.js'

export default angular
  .module('profile', [])
  .config(Config)
  .service('ProfileService', ProfileService)
  .controller('ProfileRegister', ProfileRegister)
  .controller('ProfileConfirmation', ProfileConfirmation)
  .controller('ProfileUser', ProfileUser)
  .controller('ProfileOng', ProfileOng)
  .controller('EventDonors', EventDonors)
  .controller('UserConfigurations', UserConfigurations)
  .controller('OngConfigurations', OngConfigurations)
  .controller('UserEvents', UserEvents)
  .controller('UserImpacts', UserImpacts)
  .controller('OngEvents', OngEvents)
  .controller('OngPage', OngPage)
  .controller('OngReport', OngReport)
  .controller('OngHistory', OngHistory)
  .controller('ProfileChange', ProfileChange)
  .controller('Unavailable', Unavailable)
  .controller('UserEventsRemoveConfirm', UserEventsRemoveConfirm)
  .controller('UserEventsRemoveDenied', UserEventsRemoveDenied)
