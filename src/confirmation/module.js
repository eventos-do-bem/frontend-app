import Config        from './config.js'
import Profile       from './controller/confirmation.profile.js'
import Subscribe     from './controller/confirmation.subscribe.js'

export default angular
  .module('confirmation', [])
  .config(Config)
  .controller('ConfirmationProfile', Profile)
  .controller('ConfirmationSubscribe', Subscribe)
