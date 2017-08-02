import AppConfig            from './config.js'
import HttpInterceptor      from './interceptor.js'
import YoutubeFilter        from './../common/filter/youtube.js'
import Run                  from './run.js'
import controller           from './controller.js'

angular
  .module('app', [
   'environment'
  ,'ui.bootstrap'
  ,'ui.router'
  ,'bm.uiTour'
  ,'ngMask'
  ,'ngMessages'
  ,'ngSanitize'
  ,'textAngular'
  ,'zendeskWidget'
  ,'ngImgCrop'
  ,'common'
  ,'loading'
  ,'alert'
  ,'countdown'
  ,'facebook'
  ,'home'
  ,'pages'
  ,'faq'
  ,'event'
  ,'donate'
  ,'auth'
  ,'profile'
  ,'institution'
  ,'confirmation'
  ])
  .config(AppConfig)
  .factory('HttpInterceptor', HttpInterceptor)
  .filter('youtube', YoutubeFilter)
  .controller('AppController', controller)
  .constant('Regex', {
    URL: /^(((http)s?):\/\/)?(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i
  })
  .constant('Currency', {
    FORMAT: {
      // aSign: 'R$ ',
      aSep: '.',
      aDec: ',',
      mDec: '2',
      lZero: 'deny',
      aPad: true,
      vMin: '0.00'
    }
  })
  .run(Run)
