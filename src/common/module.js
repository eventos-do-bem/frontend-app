import CommonService        from './service/common.js'
import CityService          from './service/city.js'
import CategoryService      from './service/category.js'
import ActivityAreaService  from './service/activityArea.js'
import FacebookFactory      from './factory/facebook.js'
import FacebookService      from './service/facebook.js'
import CreditCardFactory    from './factory/creditcard.js'
import FixedOnScroll        from './directive/fixedOnScroll.js'
import FileUpload           from './directive/fileUpload.js'
import Header               from './controller/header.js'
import Storage              from './service/storage.js'
import Hydrator             from './service/hydrator.js'
import NotificationService  from './service/notification.js'

export default angular
  .module('common', [])
  .service('CommonService', CommonService)
  .service('CityService', CityService)
  .service('CategoryService', CategoryService)
  .service('ActivityAreaService', ActivityAreaService)
  .factory('FacebookFactory', FacebookFactory.facebookFactory)
  .factory('CreditCardFactory', CreditCardFactory.creditCardFactory)
  .service('FacebookService', FacebookService)
  .service('StorageService', Storage)
  .service('Hydrator', Hydrator)
  .service('NotificationService', NotificationService)
  .controller('Header', Header)
  .directive('fixedOnScroll', FixedOnScroll.directiveFactory)
  .directive('fileUpload', FileUpload.factory)
