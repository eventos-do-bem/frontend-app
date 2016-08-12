import Config       from './config.js'
import Contact      from './controller/contact.js'
import Donate       from './controller/donate.js'
import DonateBillet from './controller/donate.billet.js'

export default angular
  .module('pages', [])
  .config(Config)
  .controller('Contact', Contact)
  .controller('Donate', Donate)
  .controller('DonateBillet', DonateBillet)
