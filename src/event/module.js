import Config       from './config.js'
import Service      from './service.js'
import Event        from './controller/event.js'
import EventStart   from './controller/event.start.js'

export default angular
  .module('event', [])
  .config(Config)
  .controller('Event', Event)
  .controller('EventStart', EventStart)
  .service('EventService', Service)
