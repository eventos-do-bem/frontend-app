import uiRouter             from 'angular-ui-router'
import uiBootstrap          from 'angular-ui-bootstrap'
import environment          from 'angular-environment'
import ngMask               from 'ng-mask'
import ngMessages           from 'angular-messages'
import ngSanitize           from 'textangular/dist/textAngular-sanitize'
import textAngular          from 'textangular'
import ngLocale             from 'angular-i18n/pt-br'
import AppConfig            from './config.js'
import HttpInterceptor      from './interceptor.js'
import YoutubeFilter        from './../common/filter/youtube.js'
import Run                  from './run.js'
import controller           from './controller.js'
import common               from './../common/module.js'
import loading              from './../common/component/loading/loading.js'
import alert                from './../common/component/alert/alert.js'
import countdown            from './../common/component/countdown/countdown.js'
import facebook             from './../common/component/facebook/facebook.js'
import home                 from './../home/module.js'
import pages                from './../pages/module.js'
import faq                  from './../faq/module.js'
import event                from './../event/module.js'
import donate               from './../donate/module.js'
import auth                 from './../auth/module.js'
import profile              from './../profile/module.js'
import institution          from './../institution/module.js'
import confirmation         from './../confirmation/module.js'

angular
  .module('app', [
    'environment'
  , 'ui.bootstrap'
  , uiRouter
  ,'ngMask'
  ,'ngMessages'
  ,'ngSanitize'
  ,'textAngular'
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
  .run(Run)
