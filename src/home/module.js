
import Config       from './config.js'
import Home         from './controller/home.js'
// import Service      from './service.js'
// import Confirmation from './controller/confirmation.js'
// import Me           from './controller/me.js'
// import Change       from './controller/change.js'

export default angular
  .module('home', [])
  .config(Config)
  .controller('Home', Home)
  // .service('UserService', Service)
