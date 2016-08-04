import uiRouter         from 'angular-ui-router'
import uiBootstrap      from 'angular-ui-bootstrap'
import ngMask           from 'ng-mask'
import ngMessages       from 'angular-messages'
import APIConfig        from './api.json'
import AppConfig        from './config.js'
import HttpInterceptor  from './interceptor.js'
import Run              from './run.js'
import controller       from './controller.js'
import common           from './../common/module.js'
import home             from './../home/module.js'
import pages            from './../pages/module.js'
import faq              from './../faq/module.js'
import event            from './../event/module.js'
import auth             from './../auth/module.js'
import user             from './../user/module.js'

angular
  .module('app', [
    'ui.bootstrap'
  , 'ngMask'
  , uiRouter
  ,'ngMessages'
  ,'common'
  ,'home'
  ,'pages'
  ,'faq'
  ,'event'
  ,'auth'
  ,'user'
  ])
  .config(AppConfig)
  .constant('API', APIConfig)
  .factory('HttpInterceptor', HttpInterceptor)
  .controller('AppController', controller)
  .run(Run)
