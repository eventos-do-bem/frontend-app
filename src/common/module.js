import CommonService        from './service/common.js'
import CityService          from './service/city.js'
import CategoryService      from './service/category.js'
import ActivityAreaService  from './service/activityArea.js'
import FacebookFactory      from './factory/facebook.js'
import FacebookService      from './service/facebook.js'
import CreditCardFactory    from './factory/creditcard.js'
import GeoLocationFactory   from './factory/geolocation.js'
import FixedOnScroll        from './directive/fixedOnScroll.js'
import File                 from './component/file/file.js'
import Map                  from './component/map/map.js'
import Header               from './controller/header.js'
import Storage              from './service/storage.js'
import Hydrator             from './service/hydrator.js'
import NotificationService  from './service/notification.js'

export default angular
  .module('common', ['file','map'])
  .service('CommonService', CommonService)
  .service('CityService', CityService)
  .service('CategoryService', CategoryService)
  .service('ActivityAreaService', ActivityAreaService)
  .factory('FacebookFactory', FacebookFactory.facebookFactory)
  .factory('CreditCardFactory', CreditCardFactory.creditCardFactory)
  .factory('GeoLocationFactory', GeoLocationFactory.geoLocationFactory)
  .service('FacebookService', FacebookService)
  .service('StorageService', Storage)
  .service('Hydrator', Hydrator)
  .service('NotificationService', NotificationService)
  .controller('Header', Header)
  .directive('fixedOnScroll', FixedOnScroll.directiveFactory)
