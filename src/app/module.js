import uiRouter         from 'angular-ui-router'
import uiBootstrap      from 'angular-ui-bootstrap'
import ngMask           from 'ng-mask'
import easyFb           from 'angular-easyfb'
import ngMessages       from 'angular-messages'
import APIConfig        from './api.json'
import AppConfig        from './config.js'
import HttpInterceptor  from './interceptor.js'
import Run              from './run.js'
import controller       from './controller.js'
import common           from './../common/module.js'
import home             from './../home/module.js'
import auth             from './../auth/module.js'
import user             from './../user/module.js'

angular
  .module('app', [
    'ui.bootstrap'
  , 'ngMask'
  , 'ezfb'
  , uiRouter
  ,'ngMessages'
  ,'common'
  ,'home'
  ,'auth'
  ,'user'
  ])
  .config(AppConfig)
  .constant('API', APIConfig)
  .factory('HttpInterceptor', ['API', '$q', '$injector', '$window', HttpInterceptor])
  .controller('AppController', controller)
  .run(Run)
