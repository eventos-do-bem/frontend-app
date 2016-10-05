import Config             from './config.js'
import Service            from './service.js'
import Event              from './controller/event.js'
import EventStart         from './controller/event.start.js'
import EventDonate        from './controller/event.donate.js'
import EventDonateCard    from './controller/event.donate.card.js'
import EventDonateBillet  from './controller/event.donate.billet.js'

export default angular
  .module('event', [])
  .config(Config)
  .controller('Event', Event)
  .controller('EventStart', EventStart)
  .controller('EventDonate', EventDonate)
  .controller('EventDonateCard', EventDonateCard)
  .controller('EventDonateBillet', EventDonateBillet)
  .service('EventService', Service)
