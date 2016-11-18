import Config             from './config.js'
import Service            from './service.js'
import Event              from './controller/event.js'
import EventStart         from './controller/event.start.js'
import EventExplore       from './controller/event.explore.js'
import EventReport        from './controller/event.report.js'

export default angular
  .module('event', [])
  .config(Config)
  .controller('Event', Event)
  .controller('EventStart', EventStart)
  .controller('EventExplore', EventExplore)
  .controller('EventReport', EventReport)
  .service('EventService', Service)
