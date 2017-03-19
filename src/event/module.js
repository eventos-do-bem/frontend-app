import Config             from './config.js'
import Service            from './service.js'
import Event              from './controller/event.js'
import EventStart         from './controller/event.start.js'
import EventExplore       from './controller/event.explore.js'
import EventReport        from './controller/event.report.js'
import EventHappens       from './controller/event.happens.js'
import ReportAuthorize    from './controller/report.authorize.js'
import RememberShare      from './controller/remember.share.js'

export default angular
  .module('event', [])
  .config(Config)
  .controller('Event', Event)
  .controller('EventStart', EventStart)
  .controller('EventExplore', EventExplore)
  .controller('EventReport', EventReport)
  .controller('EventHappens', EventHappens)
  .controller('ReportAuthorize', ReportAuthorize)
  .controller('RememberShare', RememberShare)
  .service('EventService', Service)
