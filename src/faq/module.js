import Config       from './config.js'
import Service      from './service.js'
import Faq          from './controller/faq.js'
import FaqCategory  from './controller/faq.category.js'
import FaqQuestion  from './controller/faq.question.js'

export default angular
  .module('faq', [])
  .config(Config)
  .controller('Faq', Faq)
  .controller('FaqCategory', FaqCategory)
  .controller('FaqQuestion', FaqQuestion)
  .service('FaqService', Service)
