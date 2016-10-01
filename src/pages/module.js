import Config       from './config.js'
import Contact      from './controller/contact.js'
import About        from './controller/about.js'
import Explore      from './controller/explore.js'
import Campaign     from './controller/campaign.js'
import DonateBillet from './controller/donate.billet.js'

export default angular
  .module('pages', [])
  .config(Config)
  .controller('Contact', Contact)
  .controller('About', About)
  .controller('Explore', Explore)
  .controller('Campaign', Campaign)
  .controller('DonateBillet', DonateBillet)
