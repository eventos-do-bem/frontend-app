import uiRouter         from 'angular-ui-router'
import uiBootstrap      from 'angular-ui-bootstrap'
import ngMessages       from 'angular-messages'
import APIConfig        from './api.json'
import AppConfig        from './config.js'
import HttpInterceptor  from './interceptor.js'
import controller       from './controller.js'
import common           from './../common/module.js'
import auth             from './../auth/module.js'
import user             from './../user/module.js'

angular
  .module('app', [
    'ui.bootstrap'
  , uiRouter
  ,'ngMessages'
  ,'common'
  ,'auth'
  ,'user'
  ])
  .config(AppConfig)
  .constant('API', APIConfig)
  .factory('HttpInterceptor', HttpInterceptor)
  .controller('AppController', controller)