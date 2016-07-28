import Config       from './config.js'
import Service      from './service.js'
import Faq          from './controller/faq.js'

export default angular
  .module('faq', [])
  .config(Config)
  .controller('Faq', Faq)
  .service('FaqService', Service)
