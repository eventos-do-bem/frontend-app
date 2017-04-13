import CommonService        from './service/common.js'
import LocationService      from './service/location.js'
import CityService          from './service/city.js'
import CategoryService      from './service/category.js'
import ActivityAreaService  from './service/activityArea.js'
import LastStateUnloggedService from './service/last-state-unlogged.js'
import FacebookFactory      from './factory/facebook.js'
import FacebookService      from './service/facebook.js'
import CreditCardFactory    from './factory/creditcard.js'
import GeoLocationFactory   from './factory/geolocation.js'
import ValidationFactory    from './factory/validation.js'
import TourFactory          from './factory/tour.js'
import FixedOnScroll        from './directive/fixedOnScroll.js'
import FormatCurrency       from './directive/formatCurrency.js'
import ImageCrop            from './directive/img-crop.js'
import File                 from './component/file/file.js'
import Cover                from './component/cover/cover.js'
import Map                  from './component/map/map.js'
import Header               from './controller/header.js'
import Footer               from './controller/footer.js'
import Storage              from './service/storage.js'
import Hydrator             from './service/hydrator.js'
import NotificationService  from './service/notification.js'

export default angular
  .module('common', ['file','cover','map'])
  .service('CommonService', CommonService)
  .controller('Header', Header)
  .controller('Footer', Footer)
  .service('LocationService', LocationService)
  .service('CityService', CityService)
  .service('CategoryService', CategoryService)
  .service('ActivityAreaService', ActivityAreaService)
  .service('LastStateUnloggedService', LastStateUnloggedService)
  .factory('FacebookFactory', FacebookFactory.facebookFactory)
  .factory('CreditCardFactory', CreditCardFactory.creditCardFactory)
  .factory('GeoLocationFactory', GeoLocationFactory.geoLocationFactory)
  .factory('ValidationFactory', ValidationFactory.validationFactory)
  .factory('TourFactory', TourFactory.tourFactory)
  .service('FacebookService', FacebookService)
  .service('StorageService', Storage)
  .service('Hydrator', Hydrator)
  .service('NotificationService', NotificationService)
  .directive('fixedOnScroll', FixedOnScroll.directiveFactory)
  .directive('formatCurrency', FormatCurrency.directiveFactory)
  .directive('imageCrop', ImageCrop.imageCrop)
