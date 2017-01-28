(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _module = require('./src/app/module.js');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.bootstrap(document, ['app']);

},{"./src/app/module.js":5,"angular":"angular"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppConfig;
function AppConfig($httpProvider, envServiceProvider, $urlRouterProvider, $sceDelegateProvider) {
  // set the domains and variables for each environment
  envServiceProvider.config({
    domains: {
      development: ['127.0.0.1:8000', 'localhost:8000', 'frontend.eventosdobem.com'],
      production: ['production.eventosdobem.com.br', 'eventodobem.com.br', 'eventosdobem.com', 'eventodobem.com', 'eventosdobem.com.br', 'production.eventosdobem.com']
      // anotherStage: ['domain1', 'domain2'], 
      // anotherStage: ['domain1', 'domain2'] 
    },
    vars: {
      development: {
        apiUrl: 'https://dev.eventosdobem.com/api/',
        staticUrl: 'https://frontend.eventosdobem.com/',
        accept: "application/vnd.api.v1+json",
        contenttype: "application/json",
        token: "0IphXRqJZe9wkMYQJJBp2X0TsVjQyg",
        // fbAppId: "922781867788493"
        fbAppId: "813381015395246"
      },
      production: {
        apiUrl: 'https://prod.eventosdobem.com/api/',
        staticUrl: 'https://production.eventosdobem.com/',
        accept: "application/vnd.api.v1+json",
        contenttype: "application/json",
        token: "0IphXRqJZe9wkMYQJJBp2X0TsVjQyg",
        fbAppId: "813381015395246"
      }
      // anotherStage: { 
      // 	customVar: 'lorem', 
      // 	customVar: 'ipsum' 
      // } 
    }
  });

  // run the environment check, so the comprobation is made 
  // before controllers and services are built 
  envServiceProvider.check();

  $httpProvider.interceptors.push('HttpInterceptor');
  $sceDelegateProvider.resourceUrlWhitelist(['self', "http://www.youtube.com/embed/**", "https://www.youtube.com/embed/**"]);

  $urlRouterProvider.otherwise('/#');
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function AppController(envService, FacebookFactory) {
  _classCallCheck(this, AppController);

  FacebookFactory.init({
    appId: envService.read('fbAppId'),
    xfbml: true
  });
};

exports.default = AppController;


AppController.$inject = ['envService', 'FacebookFactory'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function config($q, $window, $rootScope, $injector) {
  return {
    'request': function request(config) {
      var envService = $injector.get('envService');
      if (config.url.indexOf('.html') === -1) $rootScope.loading = true;
      config.headers = config.headers || {};
      config['headers']['Accept'] = envService.accept;
      // console.log($window.localStorage.getItem('token'))
      if (!config.headers.token && config.url.indexOf('googleapis') === -1) {
        if ($window.localStorage.getItem('token')) {
          config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token');
        }
      }
      if (config.headers.token && config.url.indexOf('googleapis') > -1) {
        delete config['headers']['Authorization'];
      }
      return config || $q.when(config);
    },
    'requestError': function requestError(rejection) {
      $rootScope.loading = false;
      return $q.reject(rejection);
    },
    'response': function response(_response) {
      $rootScope.loading = false;
      return $q.resolve(_response);
    },
    'responseError': function responseError(response) {
      $rootScope.loading = false;
      if (response.status === 401) {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
        $rootScope.$broadcast('auth.logout');
        $injector.get('$state').transitionTo('auth.login');
      }
      return $q.reject(response);
    }
  };
}
exports.default = config;

},{}],5:[function(require,module,exports){
'use strict';

var _angularUiRouter = require('angular-ui-router');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularUiBootstrap = require('angular-ui-bootstrap');

var _angularUiBootstrap2 = _interopRequireDefault(_angularUiBootstrap);

var _angularEnvironment = require('angular-environment');

var _angularEnvironment2 = _interopRequireDefault(_angularEnvironment);

var _ngMask = require('ng-mask');

var _ngMask2 = _interopRequireDefault(_ngMask);

var _angularMessages = require('angular-messages');

var _angularMessages2 = _interopRequireDefault(_angularMessages);

var _angularSanitize = require('angular-sanitize');

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _interceptor = require('./interceptor.js');

var _interceptor2 = _interopRequireDefault(_interceptor);

var _youtube = require('./../common/filter/youtube.js');

var _youtube2 = _interopRequireDefault(_youtube);

var _run = require('./run.js');

var _run2 = _interopRequireDefault(_run);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

var _module = require('./../common/module.js');

var _module2 = _interopRequireDefault(_module);

var _loading = require('./../common/component/loading/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _alert = require('./../common/component/alert/alert.js');

var _alert2 = _interopRequireDefault(_alert);

var _countdown = require('./../common/component/countdown/countdown.js');

var _countdown2 = _interopRequireDefault(_countdown);

var _facebook = require('./../common/component/facebook/facebook.js');

var _facebook2 = _interopRequireDefault(_facebook);

var _module3 = require('./../home/module.js');

var _module4 = _interopRequireDefault(_module3);

var _module5 = require('./../pages/module.js');

var _module6 = _interopRequireDefault(_module5);

var _module7 = require('./../faq/module.js');

var _module8 = _interopRequireDefault(_module7);

var _module9 = require('./../event/module.js');

var _module10 = _interopRequireDefault(_module9);

var _module11 = require('./../donate/module.js');

var _module12 = _interopRequireDefault(_module11);

var _module13 = require('./../auth/module.js');

var _module14 = _interopRequireDefault(_module13);

var _module15 = require('./../profile/module.js');

var _module16 = _interopRequireDefault(_module15);

var _module17 = require('./../institution/module.js');

var _module18 = _interopRequireDefault(_module17);

var _module19 = require('./../confirmation/module.js');

var _module20 = _interopRequireDefault(_module19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['environment', 'ui.bootstrap', _angularUiRouter2.default, 'ngMask', 'ngMessages', 'ngSanitize', 'common', 'loading', 'alert', 'countdown', 'facebook', 'home', 'pages', 'faq', 'event', 'donate', 'auth', 'profile', 'institution', 'confirmation']).config(_config2.default).factory('HttpInterceptor', _interceptor2.default).filter('youtube', _youtube2.default).controller('AppController', _controller2.default).run(_run2.default);

},{"./../auth/module.js":12,"./../common/component/alert/alert.js":14,"./../common/component/countdown/countdown.js":17,"./../common/component/facebook/facebook.js":19,"./../common/component/loading/loading.js":23,"./../common/filter/youtube.js":34,"./../common/module.js":35,"./../confirmation/module.js":49,"./../donate/module.js":54,"./../event/module.js":63,"./../faq/module.js":67,"./../home/module.js":71,"./../institution/module.js":74,"./../pages/module.js":82,"./../profile/module.js":99,"./config.js":2,"./controller.js":3,"./interceptor.js":4,"./run.js":6,"angular-environment":"angular-environment","angular-messages":"angular-messages","angular-sanitize":"angular-sanitize","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router","ng-mask":"ng-mask"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;
function run($rootScope, $window, $location, $state, $anchorScroll, LastStateUnloggedService) {
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !$window.localStorage.getItem('token')) {
      LastStateUnloggedService.setName(toState.name);
      LastStateUnloggedService.setParams(toParams);
      $state.go('auth.login');
      event.preventDefault();
    }
  });
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    $rootScope.$broadcast('alert-clear');
    switch (toState.name) {
      case 'profile.register':
        $rootScope.background = 'auth-login';break;
      case 'auth.login':
        $rootScope.background = 'auth-login';break;
      case 'auth.forgot':
        $rootScope.background = 'auth-login';break;
      case 'auth.recovery':
        $rootScope.background = 'auth-login';break;
      default:
        $rootScope.background = null;
    }
    // $location.hash('body')
    $anchorScroll('body');
  });
}

run.$inject = ['$rootScope', '$window', '$location', '$state', '$anchorScroll', 'LastStateUnloggedService'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AuthConfig;
function AuthConfig($stateProvider) {
  $stateProvider.state('auth', {
    url: '/autenticacao',
    templateUrl: './src/auth/view/auth.html'
  }).state('auth.login', {
    url: '/login',
    authenticate: false,
    templateUrl: './src/auth/view/login.html',
    controller: 'AuthLogin',
    controllerAs: 'ctrl'
  }).state('auth.logout', {
    url: '/logout',
    authenticate: true,
    templateUrl: './src/auth/view/logout.html',
    controller: 'AuthLogout',
    controllerAs: 'ctrl'
  }).state('auth.forgot', {
    url: '/esqueci',
    authenticate: false,
    templateUrl: './src/auth/view/forgot.html',
    controller: 'AuthForgot',
    controllerAs: 'ctrl'
  }).state('auth.recovery', {
    url: '/recuperar/:token/:email',
    authenticate: false,
    templateUrl: './src/auth/view/recovery.html',
    controller: 'AuthRecovery',
    controllerAs: 'ctrl'
  });
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthForgot = function () {
  function AuthForgot(AuthService) {
    _classCallCheck(this, AuthForgot);

    this.service = AuthService;
  }

  _createClass(AuthForgot, [{
    key: 'recovery',
    value: function recovery(forgot) {
      var _this = this;

      this.sended = false;
      this.error = false;
      this.service.recovery(forgot).then(function (response) {
        _this.sended = true;
        forgot = {};
      }, function (error) {
        _this.error = error.data;
        forgot = {};
      });
    }
  }]);

  return AuthForgot;
}();

exports.default = AuthForgot;


AuthForgot.$inject = ['AuthService'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthLogin = function () {
  function AuthLogin($rootScope, $state, AuthService, StorageService, LastStateUnloggedService) {
    _classCallCheck(this, AuthLogin);

    this.service = AuthService;
    this.storage = StorageService;
    this.lastStateUnloggedService = LastStateUnloggedService;
    this.$rootScope = $rootScope;
    this.state = $state;
    this.profile = {
      rememberme: true
    };
    this.showPassword = false;
    this.typeInputPassword = 'password';
    this.method = 'loginUser';
  }

  _createClass(AuthLogin, [{
    key: 'toggleShowPassword',
    value: function toggleShowPassword() {
      this.typeInputPassword = this.showPassword ? 'text' : 'password';
    }
  }, {
    key: 'loginFacebook',
    value: function loginFacebook() {
      var _this = this;

      this.service.loginFacebook(function (response) {
        _this.login(response);
      });
    }
  }, {
    key: 'changeMethod',
    value: function changeMethod(method) {
      this.method = method;
    }
  }, {
    key: 'login',
    value: function login(profile) {
      var _this2 = this;

      profile = profile ? angular.copy(profile) : angular.copy(this.profile);
      this.service[this.method](profile).then(function (response) {
        return _this2.loginSuccess(response);
      }, function (response) {
        _this2.loginError(response);
      });
    }
  }, {
    key: 'loginSuccess',
    value: function loginSuccess(response) {
      this.storage.setItem('token', response.data.token);
      var _response$data = response.data,
          name = _response$data.name,
          email = _response$data.email,
          type = _response$data.type,
          avatar = _response$data.avatar,
          permissions = _response$data.permissions;

      this.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar, permissions: permissions });
      this.$rootScope.$broadcast('profile.change');
      if (this.lastStateUnloggedService.getName()) {
        var _name = this.lastStateUnloggedService.getName();
        var params = this.lastStateUnloggedService.getParams();
        this.lastStateUnloggedService.clear();
        this.state.go(_name, params);
      } else {
        switch (type) {
          case 'user':
            this.state.go('profile.user.events');break;
          case 'ong':
            this.state.go('profile.ong.events');break;
        }
      }
    }
  }, {
    key: 'loginError',
    value: function loginError(response) {
      this.error = {};
      if (response.data.errors) {
        this.error = response.data;
      } else {
        this.error = {
          errors: {
            invalid: [response.data.message]
          }
        };
      }
    }
  }]);

  return AuthLogin;
}();

exports.default = AuthLogin;


AuthLogin.$inject = ['$rootScope', '$state', 'AuthService', 'StorageService', 'LastStateUnloggedService'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthLogout = function () {
  function AuthLogout($rootScope, $stateParams, $state, $window, AuthService, StorageService) {
    _classCallCheck(this, AuthLogout);

    this.authService = AuthService;
    this.storageService = StorageService;
    this.$rootScope = $rootScope;
    this.state = $state;
    this.$window = $window;
    this.logout();
  }

  _createClass(AuthLogout, [{
    key: 'logout',
    value: function logout() {
      var _this = this;

      // let storage = this.storageService.identifyStorage()
      // console.log(storage)
      // this.storageService.clearStorage()
      this.authService.logout().then(function (response) {
        _this.$rootScope.$broadcast('auth.logout');
        _this.state.go('home');
      }, function (error) {
        console.error('error', error);
        _this.$window.localStorage.removeItem('rememberme');
        _this.$window.localStorage.removeItem('token');
        _this.$window.localStorage.removeItem('profile');
        _this.$rootScope.$broadcast('auth.logout');
      });
    }
  }]);

  return AuthLogout;
}();

exports.default = AuthLogout;


AuthLogout.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService', 'StorageService'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthRecovery = function () {
  function AuthRecovery(AuthService, $state, $stateParams, StorageService, $rootScope, $window) {
    _classCallCheck(this, AuthRecovery);

    this.service = AuthService;
    this.state = $state;
    this.storage = StorageService;
    this.rootScope = $rootScope;
    this.window = $window;
    // this.profile = {}
    if ($stateParams.token && $stateParams.email) {
      this.recovery = {
        'password-token': $stateParams.token,
        'email': $stateParams.email
      };
    }
  }

  _createClass(AuthRecovery, [{
    key: 'reset',
    value: function reset(recovery) {
      var _this = this;

      this.error = false;
      this.service.reset(recovery).then(function (response) {
        var _response$data = response.data,
            name = _response$data.name,
            email = _response$data.email,
            type = _response$data.type,
            avatar = _response$data.avatar,
            token = _response$data.token;

        _this.storage.setItem('token', token);
        _this.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar });
        _this.rootScope.$broadcast('profile.change');
        switch (type) {
          case 'user':
            _this.state.go('profile.user.events');break;
          case 'ong':
            _this.state.go('profile.ong.events');break;
        }
      }, function (error) {
        console.error(error);
        _this.error = error.data;
        recovery = {};
      });
    }
  }]);

  return AuthRecovery;
}();

exports.default = AuthRecovery;


AuthRecovery.$inject = ['AuthService', '$state', '$stateParams', 'StorageService', '$rootScope', '$window'];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _login = require('./controller/login.js');

var _login2 = _interopRequireDefault(_login);

var _logout = require('./controller/logout.js');

var _logout2 = _interopRequireDefault(_logout);

var _forgot = require('./controller/forgot.js');

var _forgot2 = _interopRequireDefault(_forgot);

var _recovery = require('./controller/recovery.js');

var _recovery2 = _interopRequireDefault(_recovery);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('auth', []).config(_config2.default).controller('AuthLogin', _login2.default).controller('AuthLogout', _logout2.default).controller('AuthForgot', _forgot2.default).controller('AuthRecovery', _recovery2.default).service('AuthService', _service2.default);

},{"./config.js":7,"./controller/forgot.js":8,"./controller/login.js":9,"./controller/logout.js":10,"./controller/recovery.js":11,"./service.js":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthService = function (_CommonService) {
  _inherits(AuthService, _CommonService);

  function AuthService($http, FacebookService, envService) {
    _classCallCheck(this, AuthService);

    var _this = _possibleConstructorReturn(this, (AuthService.__proto__ || Object.getPrototypeOf(AuthService)).call(this, $http, envService));

    _this.facebookService = FacebookService;
    return _this;
  }

  _createClass(AuthService, [{
    key: 'loginUser',
    value: function loginUser(data) {
      data = this.setDataToken(data);
      this.setRoute('auth/login');
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'loginOng',
    value: function loginOng(data) {
      data = this.setDataToken(data);
      this.setRoute('institutions/auth/login');
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'loginFacebook',
    value: function loginFacebook(callback) {
      return this.facebookService.auth(callback);
    }
  }, {
    key: 'disconnectFacebook',
    value: function disconnectFacebook(callback) {
      return this.facebookService.disconnect(function (response) {
        return callback(response);
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.setRoute('auth/logout');
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'confirmation',
    value: function confirmation(data) {
      this.setRoute('auth/confirmation');
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'recovery',
    value: function recovery(data) {
      data = this.setDataToken(data);
      this.setRoute('auth/recovery');
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'reset',
    value: function reset(data) {
      data = this.setDataToken(data);
      this.setRoute('auth/recovery/reset');
      return this.$http.post(this.url + this.route, data);
    }
  }]);

  return AuthService;
}(_common2.default);

exports.default = AuthService;


AuthService.$inject = ['$http', 'FacebookService', 'envService'];

},{"./../common/service/common.js":39}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('alert', []).component('alert', _component2.default);

},{"./component.js":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  bindings: {},
  template: '\n    <p data-ng-repeat="alert in $ctrl.alerts" class="alert alert-dismissible" data-ng-class="[alert.type]" data-ng-show="alert.show" role="alert">\n      <button type="button" class="close" data-ng-click="alert.show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n      <i class="fa" data-ng-class="[alert.icon]"></i>\n      <span data-ng-repeat="error in alert.message">\n        <span data-ng-bind-html="error"></span>\n        <br>\n      </span>\n    </p>\n  ',
  controller: function controller($scope) {
    var ctrl = this;
    $scope.$on('alert', function (event, args) {
      ctrl.alerts = [];
      args.show = true;
      var data = angular.copy(args);
      args.message = [];
      if (data.message.errors) {
        for (var i in data.message.errors) {
          args.message.push(data.message.errors[i]);
        }
      } else {
        args.message.push(data.message.message);
      }
      ctrl.alerts.push(args);
    });
    $scope.$on('alert-clear', function (event) {
      ctrl.alerts = [];
    });
    ctrl.$onChanges = function () {
      // ctrl.alerts = []
    };
    ctrl.$onInit = function () {
      ctrl.alerts = [];
    };
  }
};

exports.default = Component;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  transclude: true,
  bindings: {
    model: '=',
    max: '@'
  },
  template: '\n    <div class="input-countdown">\n      <div ng-transclude></div>\n      <span class="input-countdown-chars">{{$ctrl.model.length || 0}}/{{$ctrl.max || 0}}</span>\n    </div>\n  '
};

exports.default = Component;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('countdown', []).component('countDownElement', _component2.default);

},{"./component.js":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  bindings: {
    href: '@'
  },
  controller: function controller($window, $timeout, $element) {
    var ctrl = this;
    $element.html('<div class="fb-page" data-href="' + ctrl.href + '" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="' + ctrl.href + '" class="fb-xfbml-parse-ignore"><a href="' + ctrl.href + '">Eventos do Bem</a></blockquote></div>');
    $timeout(function () {
      if (typeof FB != 'undefined') {
        FB.XFBML.parse($element[0]);
      }
    });
  }
};

exports.default = Component;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('facebook', []).component('fbPage', _component2.default);

},{"./component.js":18}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  transclude: true,
  require: ['ngModel'],
  bindings: {
    ngModel: '=',
    progress: '<?',
    disabled: '<?'
  },
  template: '\n    <input type="file" ng-model="file" data-ng-hide="true">\n    <button type="button" class="btn btn-default" data-ng-class="$ctrl.style" data-ng-click="click()" data-ng-disabled="$ctrl.disabled">\n      <i class="fa fa-upload"></i>\n      <span ng-transclude></span>\n      <span data-ng-show="$ctrl.percent">\n        <span data-ng-bind="$ctrl.percent"></span>%\n      </span>\n    </button>\n  ',
  controller: function controller($scope, $element, $attrs, $timeout, $parse) {
    var ctrl = this,
        file = void 0,
        model = $parse($attrs.ngModel),
        modelSetter = model.assign;

    ctrl.style = $attrs.class;

    $scope.click = function () {
      file[0].click();
    };
    $timeout(function () {
      file = $element.find('input');
      $element.bind('change', function () {
        $scope.$apply(function () {
          modelSetter($scope, file[0].files[0]);
          ctrl.ngModel = file[0].files[0];
        });
      });
    });
    ctrl.$onChanges = function (obj) {
      if (obj.progress && obj.progress.currentValue) ctrl.percent = Math.round(obj.progress.currentValue.loaded / obj.progress.currentValue.total * 100);
    };
  }
};

exports.default = Component;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('file', []).component('file', _component2.default);

},{"./component.js":20}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  bindings: {
    show: '='
  },
  template: '\n  <div class="loading" data-ng-show="$ctrl.show">\n    <img src="assets/gifs/loading-evb.gif" />\n    <p>Carregando...</p>\n  </div>\n  '
};

exports.default = Component;

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('loading', []).component('loading', _component2.default);

},{"./component.js":22}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  bindings: {
    highlighted: '<'
  },
  controller: function controller($element) {
    var ctrl = this;
    ctrl.$onChanges = function () {
      if (ctrl.highlighted) {
        var state = $element[0].querySelector('.' + ctrl.highlighted);
        if (state) {
          state.style.fill = '#0074DB';
        }
      }
    };
  },
  templateUrl: './map.svg'
};

exports.default = Component;

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('map', []).component('map', _component2.default).run(function ($http, $templateCache) {
  $http.get('src/common/component/map/map.svg').then(function (response) {
    $templateCache.put('./map.svg', response.data);
  });
});

},{"./component.js":24}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Footer = function Footer($filter) {
  _classCallCheck(this, Footer);

  this.year = $filter('date')(new Date(), 'yyyy');
};

exports.default = Footer;


Footer.$inject = ['$filter'];

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
  function Header($scope, $state, $window, StorageService) {
    var _this = this;

    _classCallCheck(this, Header);

    this.brand = 'Eventos do Bem';
    this.profile = StorageService.getItem('profile');
    this.navbarCollapsed = true;
    $scope.$on('profile.change', function () {
      _this.profile = StorageService.getItem('profile');
      _this.addMenuLogged();
    });
    $scope.$on('auth.logout', function () {
      StorageService.removeItem('rememberme');
      StorageService.removeItem('token');
      StorageService.removeItem('profile');
      _this.profile = null;
    });

    this.dropDownMenu = {
      logged: [{
        label: 'Logout',
        url: 'auth.logout'
      }],
      nologged: [{
        label: 'Entrar',
        url: 'auth.login'
      }, {
        label: 'Cadastrar',
        url: 'profile.register'
      }]
    };
    this.addMenuLogged();
    this.toggleDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.status.isopen = !this.status.isopen;
    };
  }

  _createClass(Header, [{
    key: 'addMenuLogged',
    value: function addMenuLogged() {
      var item = {
        label: 'Perfil'
      };
      if (this.profile) {
        switch (this.profile.type) {
          case 'user':
            item.url = 'profile.user.events';break;
          case 'ong':
            item.url = 'profile.ong.events';break;
        }
        if (this.dropDownMenu.logged[0].label == 'Perfil') {
          this.dropDownMenu.logged[0] = item;
        } else {
          this.dropDownMenu.logged.unshift(item);
        }
      }
    }
  }]);

  return Header;
}();

exports.default = Header;


Header.$inject = ['$scope', '$state', '$window', 'StorageService'];

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedOnScroll = function () {
  function FixedOnScroll($window) {
    _classCallCheck(this, FixedOnScroll);

    this.restrict = 'A';
    this.window = $window;
  }

  _createClass(FixedOnScroll, [{
    key: 'link',
    value: function link(scope, elem, attrs) {
      var e = elem[0],
          offset = attrs.offset || 0,
          top = attrs.top || 0;

      e.style.position = 'static';
      e.style.top = 'auto';
      e.style.right = 'auto';
      e.style.bottom = 'auto';
      e.style.left = 'auto';

      angular.element(this.window).on('scroll', function (ev) {
        if (ev.pageY > offset) {
          e.style.position = 'sticky';
          e.style.top = top + 'px';
        } else if (ev.pageY < offset) {
          e.style.position = 'static';
          e.style.top = 'auto';
        }
      });
    }
  }], [{
    key: 'directiveFactory',
    value: function directiveFactory($window) {
      FixedOnScroll.instance = new FixedOnScroll($window);
      return FixedOnScroll.instance;
    }
  }]);

  return FixedOnScroll;
}();

exports.default = FixedOnScroll;


FixedOnScroll.directiveFactory.$inject = ['$window'];

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormatCurrency = function () {
	function FormatCurrency() {
		_classCallCheck(this, FormatCurrency);

		this.require = '?ngModel';
		this.restrict = 'A';
		this.scope = {
			formatCurrency: '=',
			variableOptions: '='
		};
		this.compile = this.compile;
	}

	_createClass(FormatCurrency, [{
		key: 'compile',
		value: function compile(tElem, tAttrs) {
			var isInputText = tElem.is('input:text');
			return function (scope, elem, attrs, controller) {
				var updateElement = function updateElement(newVal) {
					elem.autoNumeric('set', newVal);
				};

				elem.autoNumeric('init', scope.formatCurrency);
				if (scope.variableOptions === true) {
					scope.$watch('formatCurrency', function (newValue) {
						elem.autoNumeric('update', newValue);
					});
				}

				if (controller && isInputText) {
					scope.$watch(tAttrs.ngModel, function () {
						controller.$render();
					});

					controller.$render = function () {
						updateElement(controller.$viewValue);
					};

					elem.on('keyup', function () {
						scope.$applyAsync(function () {
							controller.$setViewValue(elem.autoNumeric('get'));
						});
					});
					elem.on('change', function () {
						scope.$applyAsync(function () {
							controller.$setViewValue(elem.autoNumeric('get'));
						});
					});
				} else {
					if (isInputText) {
						attrs.$observe('value', function (val) {
							updateElement(val);
						});
					}
				}
			};
		}
	}], [{
		key: 'directiveFactory',
		value: function directiveFactory($window) {
			FormatCurrency.instance = new FormatCurrency();
			return FormatCurrency.instance;
		}
	}]);

	return FormatCurrency;
}();

exports.default = FormatCurrency;


FormatCurrency.directiveFactory.$inject = [];

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreditCardFactory = function () {
  function CreditCardFactory() {
    _classCallCheck(this, CreditCardFactory);

    this.options = {
      amex: [34, 37],
      visa: [4],
      mastercard: [51, 52, 53, 54, 55],
      diners: [300, 301, 302, 303, 304, 305, 2014, 2149, 36],
      hipercard: [38],
      aura: [50],
      elo: [63]
    };
  }

  _createClass(CreditCardFactory, [{
    key: 'getFlag',
    value: function getFlag(number) {
      var matched = false;
      if (number) {
        for (var flag in this.options) {
          if (!matched) {
            for (var max in this.options[flag]) {
              var regex = new RegExp('^' + this.options[flag][max]);
              if (number.match(regex)) {
                matched = true;
                return flag;
              }
            }
          }
        }
      }
    }
  }], [{
    key: 'creditCardFactory',
    value: function creditCardFactory() {
      return new CreditCardFactory();
    }
  }]);

  return CreditCardFactory;
}();

exports.default = CreditCardFactory;


CreditCardFactory.creditCardFactory.$inject = [];

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookFactory = function () {
  function FacebookFactory($window, $timeout, $q) {
    var _this = this;

    _classCallCheck(this, FacebookFactory);

    this.options = {
      appId: null,
      status: true,
      cookie: false,
      xfbml: false,
      version: 'v2.4',
      scope: ''
    };
    var options = ['appId', 'status', 'cookie', 'xfbml', 'version', 'scope'];
    options.map(function (name) {
      _this[name] = angular.bind(_this, _this.getSetOption, name);
    });
    this.FB = null;
    this.FBPromise = null;
    this.initPromise = null;
    this.$window = $window;
    this.$timeout = $timeout;
    this.$q = $q;
    this.loading = false;
    this.loaded = false;
    this.initialized = false;
  }

  _createClass(FacebookFactory, [{
    key: 'getSetOption',
    value: function getSetOption(name, val) {
      if (val === void 0) {
        return this.options[name];
      }
      this.options[name] = val;
      return this;
    }
  }, {
    key: 'handleResponse',
    value: function handleResponse(response) {
      if (!response || response.error) {
        this.reject(response && response.error || false);
      } else {
        this.resolve(response);
      }
    }
  }, {
    key: 'addCallbackToPromise',
    value: function addCallbackToPromise(deferred, callback) {
      var promise = deferred.promise;
      if (typeof callback === 'function') {
        promise.then(callback);
      }
      return promise;
    }
  }, {
    key: 'load',
    value: function load() {
      var _this2 = this;

      if (!this.FBPromise) {
        (function () {
          var deferred = _this2.$q.defer();
          _this2.$window.fbAsyncInit = function () {
            _this2.FB = _this2.$window.FB;
            _this2.loading = false;
            _this2.loaded = true;
            _this2.$timeout(function () {
              return deferred.resolve(FB);
            });
          };
          (function (d, s, id) {
            var js = void 0,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
              return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/pt_BR/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
          })(_this2.$window.document, 'script', 'facebook-jssdk');

          _this2.loading = true;

          _this2.FBPromise = deferred.promise;
        })();
      }
      return this.FBPromise;
    }
  }, {
    key: 'init',
    value: function init(params) {
      var _this3 = this;

      if (!this.initPromise) {
        this.initPromise = this.load().then(function (FB) {
          params = angular.extend({
            appId: _this3.options.appId,
            status: _this3.options.status,
            cookie: _this3.options.cookie,
            xfbml: _this3.options.xfbml,
            version: _this3.options.version
          }, params);

          if (!params.appId) {
            throw new Error('FacebookService: appId is not set');
          }

          FB.init(params);

          _this3.initialized = true;

          return FB;
        });
      }
      return this.initPromise;
    }
  }, {
    key: 'getLoginStatus',
    value: function getLoginStatus(callback) {
      var _this4 = this;

      return this.init().then(function (FB) {
        var deferred = _this4.$q.defer();

        FB.getLoginStatus(angular.bind(deferred, _this4.handleResponse));

        return _this4.addCallbackToPromise(deferred, callback);
      });
    }
  }, {
    key: 'api',
    value: function api() {
      var _this5 = this;

      var apiArgs = arguments;

      return this.init().then(function (FB) {
        var deferred = _this5.$q.defer(),
            args = Array.prototype.slice.call(apiArgs),
            callback = void 0;

        if (typeof args[args.length - 1] === 'function') {
          callback = args.pop();
        }
        args.push(angular.bind(deferred, _this5.handleResponse));

        FB.api.apply(FB, args);

        return _this5.addCallbackToPromise(deferred, callback);
      });
    }
  }, {
    key: 'login',
    value: function login(callback, opts) {
      var _this6 = this;

      return this.init().then(function (FB) {
        var deferred = _this6.$q.defer();

        if (typeof callback !== 'function') {
          callback = null;
          opts = callback;
        }

        var getOpt = function getOpt(name) {
          var val = opts && opts[name];
          return val === void 0 ? _this6.options[name] : val;
        };

        FB.login(angular.bind(deferred, _this6.handleResponse), {
          scope: getOpt('scope')
        });

        return _this6.addCallbackToPromise(deferred, callback);
      });
    }
  }, {
    key: 'logout',
    value: function logout(callback) {
      var _this7 = this;

      return this.getLoginStatus().then(function (response) {
        var deferred = _this7.$q.defer();

        if (response.authResponse) {
          _this7.FB.logout(angular.bind(deferred, callback));
        } else {
          deferred.reject(response);
        }

        return _this7.addCallbackToPromise(deferred, callback);
      });
    }
  }, {
    key: 'disconnect',
    value: function disconnect(callback) {
      var _this8 = this;

      return this.init().then(function (FB) {
        var deferred = _this8.$q.defer();

        FB.api('/me/permissions', 'DELETE', angular.bind(deferred, _this8.handleResponse));

        return _this8.addCallbackToPromise(deferred, callback);
      });
    }
  }], [{
    key: 'facebookFactory',
    value: function facebookFactory($window, $timeout, $q) {
      return new FacebookFactory($window, $timeout, $q);
    }
  }]);

  return FacebookFactory;
}();

exports.default = FacebookFactory;


FacebookFactory.facebookFactory.$inject = ['$window', '$timeout', '$q'];

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeoLocationFactory = function () {
  function GeoLocationFactory($window, $http) {
    _classCallCheck(this, GeoLocationFactory);

    this.window = $window;
    this.$http = $http;
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }

  _createClass(GeoLocationFactory, [{
    key: 'setOptions',
    value: function setOptions(options) {
      this.options = angular.extend({
        enableHighAccuracy: this.options.enableHighAccuracy,
        timeout: this.options.timeout,
        maximumAge: this.options.maximumAge
      }, options);
    }
  }, {
    key: 'getPosition',
    value: function getPosition(handleSuccess, handleError) {
      return this.window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, this.options);
    }
  }, {
    key: 'getAddress',
    value: function getAddress(coords) {
      var gmap = 'http://maps.googleapis.com/maps/api/geocode/json';
      var config = {
        params: {
          latlng: coords.latitude + ',' + coords.longitude,
          sensor: false
        }
      };
      return this.$http.get(gmap, config);
    }
  }], [{
    key: 'geoLocationFactory',
    value: function geoLocationFactory($window, $http) {
      return new GeoLocationFactory($window, $http);
    }
  }]);

  return GeoLocationFactory;
}();

exports.default = GeoLocationFactory;


GeoLocationFactory.geoLocationFactory.$inject = ['$window', '$http'];

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationFactory = function () {
  function ValidationFactory() {
    _classCallCheck(this, ValidationFactory);
  }

  _createClass(ValidationFactory, [{
    key: "dateYearsDiff",
    value: function dateYearsDiff(start, end) {
      var diff = start - end,
          yearsDiff = diff / (1000 * 3600 * 24 * 365);
      return yearsDiff;
    }
  }, {
    key: "dateMaxByYears",
    value: function dateMaxByYears(date, years) {
      var yearsDiff = this.dateYearsDiff(new Date(), date);
      return yearsDiff >= years ? false : true;
    }
  }, {
    key: "dateMinByYears",
    value: function dateMinByYears(date, years) {
      var yearsDiff = this.dateYearsDiff(new Date(), date);
      return yearsDiff <= years ? false : true;
    }
  }], [{
    key: "validationFactory",
    value: function validationFactory() {
      return new ValidationFactory();
    }
  }]);

  return ValidationFactory;
}();

exports.default = ValidationFactory;


ValidationFactory.validationFactory.$inject = [];

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = youtubeFilter;
function youtubeFilter($sce) {
  return function (val) {
    if (val) {
      var videoLink = val,
          watch = val.indexOf('?v=') + 3;
      return $sce.getTrustedResourceUrl('https://www.youtube.com/embed/' + val.substring(watch, videoLink.length));
    }
  };
}

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./service/common.js');

var _common2 = _interopRequireDefault(_common);

var _location = require('./service/location.js');

var _location2 = _interopRequireDefault(_location);

var _city = require('./service/city.js');

var _city2 = _interopRequireDefault(_city);

var _category = require('./service/category.js');

var _category2 = _interopRequireDefault(_category);

var _activityArea = require('./service/activityArea.js');

var _activityArea2 = _interopRequireDefault(_activityArea);

var _lastStateUnlogged = require('./service/last-state-unlogged.js');

var _lastStateUnlogged2 = _interopRequireDefault(_lastStateUnlogged);

var _facebook = require('./factory/facebook.js');

var _facebook2 = _interopRequireDefault(_facebook);

var _facebook3 = require('./service/facebook.js');

var _facebook4 = _interopRequireDefault(_facebook3);

var _creditcard = require('./factory/creditcard.js');

var _creditcard2 = _interopRequireDefault(_creditcard);

var _geolocation = require('./factory/geolocation.js');

var _geolocation2 = _interopRequireDefault(_geolocation);

var _validation = require('./factory/validation.js');

var _validation2 = _interopRequireDefault(_validation);

var _fixedOnScroll = require('./directive/fixedOnScroll.js');

var _fixedOnScroll2 = _interopRequireDefault(_fixedOnScroll);

var _formatCurrency = require('./directive/formatCurrency.js');

var _formatCurrency2 = _interopRequireDefault(_formatCurrency);

var _file = require('./component/file/file.js');

var _file2 = _interopRequireDefault(_file);

var _map = require('./component/map/map.js');

var _map2 = _interopRequireDefault(_map);

var _header = require('./controller/header.js');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./controller/footer.js');

var _footer2 = _interopRequireDefault(_footer);

var _storage = require('./service/storage.js');

var _storage2 = _interopRequireDefault(_storage);

var _hydrator = require('./service/hydrator.js');

var _hydrator2 = _interopRequireDefault(_hydrator);

var _notification = require('./service/notification.js');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('common', ['file', 'map']).service('CommonService', _common2.default).controller('Header', _header2.default).controller('Footer', _footer2.default).service('LocationService', _location2.default).service('CityService', _city2.default).service('CategoryService', _category2.default).service('ActivityAreaService', _activityArea2.default).service('LastStateUnloggedService', _lastStateUnlogged2.default).factory('FacebookFactory', _facebook2.default.facebookFactory).factory('CreditCardFactory', _creditcard2.default.creditCardFactory).factory('GeoLocationFactory', _geolocation2.default.geoLocationFactory).factory('ValidationFactory', _validation2.default.validationFactory).service('FacebookService', _facebook4.default).service('StorageService', _storage2.default).service('Hydrator', _hydrator2.default).service('NotificationService', _notification2.default).directive('fixedOnScroll', _fixedOnScroll2.default.directiveFactory).directive('formatCurrency', _formatCurrency2.default.directiveFactory);

},{"./component/file/file.js":21,"./component/map/map.js":25,"./controller/footer.js":26,"./controller/header.js":27,"./directive/fixedOnScroll.js":28,"./directive/formatCurrency.js":29,"./factory/creditcard.js":30,"./factory/facebook.js":31,"./factory/geolocation.js":32,"./factory/validation.js":33,"./service/activityArea.js":36,"./service/category.js":37,"./service/city.js":38,"./service/common.js":39,"./service/facebook.js":40,"./service/hydrator.js":41,"./service/last-state-unlogged.js":42,"./service/location.js":43,"./service/notification.js":44,"./service/storage.js":45}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivityAreaService = function (_CommonService) {
  _inherits(ActivityAreaService, _CommonService);

  function ActivityAreaService($http, envService) {
    _classCallCheck(this, ActivityAreaService);

    var _this = _possibleConstructorReturn(this, (ActivityAreaService.__proto__ || Object.getPrototypeOf(ActivityAreaService)).call(this, $http, envService));

    _this.setRoute('activityAreas');
    return _this;
  }

  _createClass(ActivityAreaService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(ActivityAreaService.prototype.__proto__ || Object.getPrototypeOf(ActivityAreaService.prototype), 'findAll', this).call(this);
    }
  }]);

  return ActivityAreaService;
}(_common2.default);

exports.default = ActivityAreaService;


ActivityAreaService.$inject = ['$http', 'envService'];

},{"./common.js":39}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoryService = function (_CommonService) {
  _inherits(CategoryService, _CommonService);

  function CategoryService($http, envService) {
    _classCallCheck(this, CategoryService);

    var _this = _possibleConstructorReturn(this, (CategoryService.__proto__ || Object.getPrototypeOf(CategoryService)).call(this, $http, envService));

    _this.setRoute('categories');
    return _this;
  }

  _createClass(CategoryService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(CategoryService.prototype.__proto__ || Object.getPrototypeOf(CategoryService.prototype), 'findAll', this).call(this);
    }
  }]);

  return CategoryService;
}(_common2.default);

exports.default = CategoryService;


CategoryService.$inject = ['$http', 'envService'];

},{"./common.js":39}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CityService = function (_CommonService) {
  _inherits(CityService, _CommonService);

  function CityService($http, envService) {
    _classCallCheck(this, CityService);

    var _this = _possibleConstructorReturn(this, (CityService.__proto__ || Object.getPrototypeOf(CityService)).call(this, $http, envService));

    _this.setRoute('cities');
    return _this;
  }

  _createClass(CityService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(CityService.prototype.__proto__ || Object.getPrototypeOf(CityService.prototype), 'findAll', this).call(this);
    }
  }]);

  return CityService;
}(_common2.default);

exports.default = CityService;


CityService.$inject = ['$http', 'envService'];

},{"./common.js":39}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonService = function () {
  function CommonService($http, envService) {
    _classCallCheck(this, CommonService);

    if (envService) {
      this.url = envService.read('apiUrl');
      this.token = envService.read('token');
    }
    this.config = {};
    this.$http = $http;
  }

  _createClass(CommonService, [{
    key: 'setRoute',
    value: function setRoute(route) {
      this.config = {};
      this.route = route;
    }
  }, {
    key: 'setDataToken',
    value: function setDataToken(data) {
      data['token'] = this.token;
      return data;
    }
  }, {
    key: 'setPublicToken',
    value: function setPublicToken() {
      this.config['headers'] = {};
      this.config.headers['token'] = this.token;
    }
  }, {
    key: 'setParams',
    value: function setParams(data) {
      this.config['params'] = {};
      for (var key in data) {
        this.config.params[key] = data[key];
      }
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      return this.$http.get(this.url + this.route + '/' + id, this.config);
    }
  }, {
    key: 'postWithFile',
    value: function postWithFile(data, _progress) {
      var fd = new FormData();
      angular.forEach(data, function (value, key) {
        fd.append(key, value);
      });
      return this.$http({
        method: 'POST',
        url: this.url + this.route,
        data: fd,
        headers: { 'Content-Type': undefined },
        uploadEventHandlers: {
          progress: function progress(e) {
            return _progress(e);
          }
        }
      });
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this.$http.put(this.url + this.route + '/' + data.uuid, data);
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      return this.$http.delete(this.url + this.route + '/' + id);
    }
  }, {
    key: 'search',
    value: function search() {
      return this.$http.get(this.url + this.route + '/search', this.config);
    }
  }]);

  return CommonService;
}();

exports.default = CommonService;


CommonService.$inject = ['$http', 'envService'];

},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookService = function () {
  function FacebookService(FacebookFactory) {
    _classCallCheck(this, FacebookService);

    this.facebookFactory = FacebookFactory;
  }

  _createClass(FacebookService, [{
    key: 'me',
    value: function me(callback) {
      this.facebookFactory.api('/me', {
        fields: 'name,email,gender,birthday'
      }, function (response) {
        return callback(response);
      });
    }
  }, {
    key: 'meCallback',
    value: function meCallback(token, callback) {
      return this.me(function (response) {
        response['facebook_token'] = token;
        return callback(response);
      });
    }
  }, {
    key: 'auth',
    value: function auth(callback) {
      var _this = this;

      this.facebookFactory.getLoginStatus(function (response) {
        var token = '';
        if (response.status === 'connected') {
          token = response.authResponse.accessToken;
          return _this.meCallback(token, callback);
        } else {
          return _this.facebookFactory.login(function (response) {
            if (response.status === 'connected') {
              token = response.authResponse.accessToken;
              return _this.meCallback(token, callback);
            }
          }, {
            scope: 'public_profile,email,user_birthday'
          });
        }
      });
    }
  }, {
    key: 'logout',
    value: function logout(callback) {
      return this.facebookFactory.logout(callback);
    }
  }]);

  return FacebookService;
}();

exports.default = FacebookService;


FacebookService.$inject = ['FacebookFactory'];

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HydratorService = function () {
  function HydratorService() {
    _classCallCheck(this, HydratorService);
  }

  _createClass(HydratorService, [{
    key: "extract",
    value: function extract(data, fields) {
      var result = {};
      var keys = Object.keys(data);
      fields = fields ? fields : keys;
      fields.map(function (field) {
        if (keys.indexOf(field)) {
          result[field] = data[field];
        }
      });
      return result;
    }
  }]);

  return HydratorService;
}();

exports.default = HydratorService;

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LastStateUnlogged = function () {
  function LastStateUnlogged() {
    _classCallCheck(this, LastStateUnlogged);

    this.name;
    this.params;
  }

  _createClass(LastStateUnlogged, [{
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "setParams",
    value: function setParams(params) {
      this.params = params;
    }
  }, {
    key: "getParams",
    value: function getParams() {
      return this.params;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.name = null;
      this.params = null;
    }
  }]);

  return LastStateUnlogged;
}();

exports.default = LastStateUnlogged;


LastStateUnlogged.$inject = [];

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationService = function (_CommonService) {
  _inherits(LocationService, _CommonService);

  function LocationService($http, envService) {
    _classCallCheck(this, LocationService);

    var _this = _possibleConstructorReturn(this, (LocationService.__proto__ || Object.getPrototypeOf(LocationService)).call(this, $http, envService));

    _this.http = $http;
    _this.config = {
      headers: {
        token: _this.token
      }
    };
    return _this;
  }

  _createClass(LocationService, [{
    key: 'getStates',
    value: function getStates(state) {
      var route = state ? 'states/' + state : 'states';
      return this.http.get(this.url + route, this.config);
    }
  }, {
    key: 'getCities',
    value: function getCities(state, city) {
      var route = city ? 'cities/' + state + '/' + city : 'cities/' + state;
      return this.http.get(this.url + route, this.config);
    }
  }]);

  return LocationService;
}(_common2.default);

exports.default = LocationService;


LocationService.$inject = ['$http', 'envService'];

},{"./common.js":39}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationService = function (_CommonService) {
  _inherits(NotificationService, _CommonService);

  function NotificationService($http, envService) {
    _classCallCheck(this, NotificationService);

    var _this = _possibleConstructorReturn(this, (NotificationService.__proto__ || Object.getPrototypeOf(NotificationService)).call(this, $http, envService));

    _this.http = $http;
    _this.config = {};
    _this.route = 'notifications';
    return _this;
  }

  _createClass(NotificationService, [{
    key: 'subscribe',
    value: function subscribe(data) {
      if (!data.type) {
        this.config['headers'] = {};
        this.config.headers['token'] = this.token;
      }
      return this.http.post(this.url + this.route + '/subscribe', data, this.config);
    }
  }, {
    key: 'subscribeConfirm',
    value: function subscribeConfirm(uuid) {
      this.config['headers'] = {};
      this.config.headers['token'] = this.token;
      return this.http.get(this.url + this.route + '/subscribe/confirm/' + uuid, this.config);
    }
  }, {
    key: 'setRoute',
    value: function setRoute(route) {
      this.source = new EventSource(route);
      this.source.addEventListener('message', this.handleCallback, false);
    }
  }, {
    key: 'handleCallback',
    value: function handleCallback(response) {
      return JSON.parse(response.data);
    }
  }, {
    key: 'handleError',
    value: function handleError(response) {
      console.error(response);
    }
  }]);

  return NotificationService;
}(_common2.default);

exports.default = NotificationService;


NotificationService.$inject = ['$http', 'envService'];

},{"./common.js":39}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageService = function () {
  function StorageService($window) {
    _classCallCheck(this, StorageService);

    this.$window = $window;
  }

  _createClass(StorageService, [{
    key: 'setItem',
    value: function setItem(key, data) {
      this.$window.localStorage.setItem(key, JSON.stringify(data));
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      return JSON.parse(this.$window.localStorage.getItem(key));
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      this.$window.localStorage.removeItem(key);
    }
  }, {
    key: 'setByRememberMe',
    value: function setByRememberMe(rememberme) {
      if (rememberme) {
        this.setStorage('localStorage');
      } else {
        this.setStorage('sessionStorage');
      }
    }
  }, {
    key: 'identifyStorage',
    value: function identifyStorage() {
      if (this.$window.localStorage.getItem('token')) {
        return 'localStorage';
      } else if (this.$window.sessionStorage.getItem('token')) {
        return 'sessionStorage';
      }
    }
  }, {
    key: 'clearStorage',
    value: function clearStorage() {
      this.$window[this.storage].clear();
    }
  }]);

  return StorageService;
}();

exports.default = StorageService;


StorageService.$inject = ['$window'];

},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConfirmationConfig;
function ConfirmationConfig($stateProvider) {
  $stateProvider.state('confirmation', {
    url: '/confirmacao',
    templateUrl: './src/confirmation/view/index.html'
  }).state('confirmation.profile', {
    url: '/perfil/:uuid/:confirmation_code',
    templateUrl: './src/confirmation/view/confirmation.profile.html',
    controller: 'ConfirmationProfile',
    controllerAs: 'ctrl'
  }).state('confirmation.subscribe', {
    url: '/assinatura/:uuid',
    templateUrl: './src/confirmation/view/confirmation.subscribe.html',
    controller: 'ConfirmationSubscribe',
    controllerAs: 'ctrl'
  });
}

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfirmationProfile = function () {
  function ConfirmationProfile($rootScope, $stateParams, $state, $timeout, ProfileService, StorageService) {
    var _this = this;

    _classCallCheck(this, ConfirmationProfile);

    this.storage = StorageService;
    this.rootScope = $rootScope;
    this.state = $state;
    this.timeout = $timeout;
    this.confirmation = false;
    if ($stateParams.uuid && $stateParams.confirmation_code) {
      var profile = {
        uuid: $stateParams.uuid,
        confirmation_code: $stateParams.confirmation_code
      };
      ProfileService.confirmation(profile).then(function (response) {
        _this.confirmation = true;
        // console.log(response)
        _this.profile = response.data;
        _this.timeout(function () {
          return _this.login();
        }, 2000);
      }, function (error) {
        _this.error = error.data;
        // console.log('error', error)
      });
    }
  }

  _createClass(ConfirmationProfile, [{
    key: 'login',
    value: function login() {
      this.storage.setItem('token', this.profile.token);
      var _profile = this.profile,
          name = _profile.name,
          email = _profile.email,
          type = _profile.type;

      this.storage.setItem('profile', { name: name, email: email, type: type });
      this.rootScope.$broadcast('profile.change');
      switch (type) {
        case 'user':
          this.state.go('profile.user.configurations');break;
        case 'ong':
          this.state.go('profile.ong.configurations');break;
      }
    }
  }]);

  return ConfirmationProfile;
}();

exports.default = ConfirmationProfile;


ConfirmationProfile.$inject = ['$rootScope', '$stateParams', '$state', '$timeout', 'ProfileService', 'StorageService'];

},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfirmationSubscribe = function () {
  function ConfirmationSubscribe($rootScope, $stateParams, $state, $window, NotificationService) {
    _classCallCheck(this, ConfirmationSubscribe);

    this.confirmation = false;
    this.notificationService = NotificationService;
    if ($stateParams.uuid) {
      this.subscribeConfirm($stateParams.uuid);
    }
  }

  _createClass(ConfirmationSubscribe, [{
    key: 'subscribeConfirm',
    value: function subscribeConfirm(uuid) {
      var _this = this;

      this.notificationService.subscribeConfirm(uuid).then(function (response) {
        console.log(response);
        _this.confirmation = true;
      });
    }
  }]);

  return ConfirmationSubscribe;
}();

exports.default = ConfirmationSubscribe;


ConfirmationSubscribe.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'NotificationService'];

},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _confirmationProfile = require('./controller/confirmation.profile.js');

var _confirmationProfile2 = _interopRequireDefault(_confirmationProfile);

var _confirmationSubscribe = require('./controller/confirmation.subscribe.js');

var _confirmationSubscribe2 = _interopRequireDefault(_confirmationSubscribe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('confirmation', []).config(_config2.default).controller('ConfirmationProfile', _confirmationProfile2.default).controller('ConfirmationSubscribe', _confirmationSubscribe2.default);

},{"./config.js":46,"./controller/confirmation.profile.js":47,"./controller/confirmation.subscribe.js":48}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DonateConfig;
function DonateConfig($stateProvider) {
  $stateProvider.state('donate', {
    url: '/doacao',
    templateUrl: './src/donate/view/index.html'
  }).state('donate.event', {
    url: '/evento/:slug/',
    templateUrl: './src/donate/view/event.html',
    controller: 'DonateEvent',
    controllerAs: 'ctrl'
  });
}

},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DonateBillet = function () {
  function DonateBillet($uibModalInstance, data, DonateService, StorageService) {
    _classCallCheck(this, DonateBillet);

    this.instance = $uibModalInstance;
    this.donateService = DonateService;
    this.uuid = data.uuid;
    this.donate = data.donate;
    this.user = data.user;
    this.donate.is_anonymous = false;
    this.logged = StorageService.getItem('token');
    this.options = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ','
    };
  }

  _createClass(DonateBillet, [{
    key: 'buildBillet',
    value: function buildBillet() {
      var _this = this;

      var method = this.logged ? 'printLoggedBillet' : 'printPublicBillet';
      this.donate.amount = parseInt(this.donate.amount);
      this.donateService[method](this.uuid, this.donate).then(function (response) {
        return _this.instance.close({ uuid: _this.uuid, data: response.data });
      }, function (error) {
        return _this.instance.close(error.data);
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.instance.dismiss('cancel');
    }
  }]);

  return DonateBillet;
}();

exports.default = DonateBillet;


DonateBillet.$inject = ['$uibModalInstance', 'data', 'DonateService', 'StorageService'];

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DonateCard = function () {
  function DonateCard($uibModalInstance, data, DonateService, StorageService) {
    _classCallCheck(this, DonateCard);

    this.instance = $uibModalInstance;
    this.donateService = DonateService;
    this.uuid = data.uuid;
    this.donate = data.donate;
    this.user = data.user;
    this.donate.is_anonymous = false;
    this.logged = StorageService.getItem('token');
  }

  _createClass(DonateCard, [{
    key: 'buildCard',
    value: function buildCard() {
      var _this = this;

      var method = this.logged ? 'payLogged' : 'payPublic';
      this.donateService[method](this.uuid, this.donate).then(function (response) {
        return _this.instance.close({ uuid: _this.uuid, data: response.data });
      }, function (error) {
        return _this.instance.close(error.data);
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.instance.dismiss('cancel');
    }
  }]);

  return DonateCard;
}();

exports.default = DonateCard;


DonateCard.$inject = ['$uibModalInstance', 'data', 'DonateService', 'StorageService'];

},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DonateEvent = function () {
  function DonateEvent($rootScope, $state, $stateParams, $window, $timeout, $anchorScroll, ProfileService, EventService, NotificationService, $uibModal, CreditCardFactory) {
    var _this = this;

    _classCallCheck(this, DonateEvent);

    this.rootScope = $rootScope;
    this.state = $state;
    this.stateParams = $stateParams;
    this.window = $window;
    this.timeout = $timeout;
    this.anchorScroll = $anchorScroll;
    this.profileService = ProfileService;
    this.eventService = EventService;
    this.notificationService = NotificationService;
    this.modal = $uibModal;
    this.creditCard = CreditCardFactory;
    this.logged = this.window.localStorage.getItem('token');
    this.options = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ','
    };

    if (!this.stateParams.slug) {
      this.state.go('pages.explore');
    }

    this.eventService.findById(this.stateParams.slug).then(function (response) {
      _this.uuid = response.data.uuid;
      _this.event = response.data;
    });

    if (this.logged) {
      this.profileService.me().then(function (response) {
        var _response$data = response.data,
            name = _response$data.name,
            birthdate = _response$data.birthdate,
            email = _response$data.email,
            document = _response$data.document;

        birthdate = birthdate.split('-');
        birthdate = birthdate[2] + '/' + birthdate[1] + '/' + birthdate[0];
        _this.donate = {
          name: name,
          birthdate: birthdate,
          email: email,
          document: document
        };
        _this.missingDoc = _this.donate.document ? false : true;
      });
    }

    this.donateOff = {
      number: '0000-0000-0000-0000',
      name: 'nome completo',
      expiry: {
        month: '00',
        year: '0000'
      },
      cvc: '•••'
    };
    this.card = document.querySelector('.card');
    this.frontInputs = ['amount', 'card_number', 'card_name', 'card_month', 'card_year'];
    this.months = [];
    for (var m = 1; m <= 12; m++) {
      if (m <= 9) {
        this.months.push('0' + m);
      } else {
        this.months.push(m);
      }
    }
    this.years = [];
    var today = new Date();
    var curYear = today.getFullYear();
    for (var y = curYear; y <= curYear + 10; y++) {
      this.years.push(y);
    }this.questions = [{ question: 'Como eu apoio este projeto?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.' }, { question: 'Quando o pagamento é efetivado?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.' }, { question: 'Como eu apoio este projeto?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.' }, { question: 'Quando o pagamento é efetivado?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.' }, { question: 'Quando o pagamento é efetivado?', answer: 'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss.' }];
  }

  _createClass(DonateEvent, [{
    key: 'openCard',
    value: function openCard() {
      var _this2 = this;

      var donate = angular.copy(this.donate);
      if (this.logged) {
        delete donate.name;
        delete donate.email;
        delete donate.birthdate;
        if (!this.missingDoc) {
          delete donate.document;
        }
      }
      donate.card_validate = donate.card_month + '/' + donate.card_year;
      donate.card_number = donate.card_number.replace(/\-/g, '');
      donate.amount = parseInt(donate.amount);
      var modalInstance = this.modal.open({
        templateUrl: './../src/donate/view/donate.card.html',
        controller: 'DonateCard',
        controllerAs: 'ctrl',
        resolve: {
          data: function data() {
            return {
              uuid: _this2.uuid,
              donate: donate,
              user: _this2.event.institution.user
            };
          }
        }
      });
      modalInstance.result.then(function (response) {
        _this2.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: response.data.status });
        _this2.anchorScroll('scrollArea');
        _this2.timeout(function () {
          _this2.state.go('event.slug', { slug: response.uuid });
        }, 3000);
      }, function (error) {
        _this2.rootScope.$broadcast('alert', { type: 'alert-danger', icon: 'fa-exclamation', message: error });
      });
    }
  }, {
    key: 'openBillet',
    value: function openBillet() {
      var _this3 = this;

      var donate = angular.copy(this.donate);
      if (this.logged) {
        delete donate.name;
        delete donate.email;
        delete donate.birthdate;
        if (!this.missingDoc) {
          delete donate.document;
        }
      }
      var modalInstance = this.modal.open({
        templateUrl: './../src/donate/view/donate.billet.html',
        controller: 'DonateBillet',
        controllerAs: 'ctrl',
        resolve: {
          data: function data() {
            return {
              uuid: _this3.uuid,
              donate: donate,
              user: _this3.event.institution.user
            };
          }
        }
      });
      modalInstance.result.then(function (response) {
        _this3.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: response.data.status });
        _this3.anchorScroll('scrollArea');
        _this3.timeout(function () {
          _this3.state.go('event.slug', { slug: response.uuid });
        }, 3000);
        var billet = response.data.iugu_url.replace('?bs=true', '.pdf');
        // let printBillet = this.window.open(billet, 'Imprimir boleto','left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0')
        var printBillet = _this3.window.open(billet, '_blank');
        printBillet.focus();
        // printBillet.print()
      }, function (error) {
        _this3.rootScope.$broadcast('alert', { type: 'alert-danger', icon: 'fa-exclamation', message: error });
      });
    }
  }, {
    key: 'open',
    value: function open(item) {
      if (item.active) return item.active = false;
      this.questions.map(function (q) {
        return q.active = false;
      });
      item.active = true;
    }
  }, {
    key: 'onFocus',
    value: function onFocus(input) {
      var card = document.querySelector('.card');
      if (this.frontInputs.indexOf(input) !== -1) {
        card.classList.remove('validated');
      }
    }
  }, {
    key: 'onValidate',
    value: function onValidate(form) {
      var card = document.querySelector('.card');
      this.frontInputs.map(function (name) {
        if (!form[name].$valid) {
          card.classList.remove('validated');
          return;
        }
      });
      card.classList.add('validated');
      //4111111111111111 SUCESSO
      //4242424242424242 SUCESSO
      //4012888888881881 FALHA
    }
  }, {
    key: 'getFlag',
    value: function getFlag(number) {
      this.flag = this.creditCard.getFlag(number);
    }
  }]);

  return DonateEvent;
}();

exports.default = DonateEvent;


DonateEvent.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$timeout', '$anchorScroll', 'ProfileService', 'EventService', 'NotificationService', '$uibModal', 'CreditCardFactory'];

},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

var _donateEvent = require('./controller/donate.event.js');

var _donateEvent2 = _interopRequireDefault(_donateEvent);

var _donateCard = require('./controller/donate.card.js');

var _donateCard2 = _interopRequireDefault(_donateCard);

var _donateBillet = require('./controller/donate.billet.js');

var _donateBillet2 = _interopRequireDefault(_donateBillet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('donate', []).config(_config2.default).controller('DonateEvent', _donateEvent2.default).controller('DonateCard', _donateCard2.default).controller('DonateBillet', _donateBillet2.default).service('DonateService', _service2.default);

},{"./config.js":50,"./controller/donate.billet.js":51,"./controller/donate.card.js":52,"./controller/donate.event.js":53,"./service.js":55}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonateService = function (_CommonService) {
  _inherits(DonateService, _CommonService);

  function DonateService($http, envService) {
    _classCallCheck(this, DonateService);

    return _possibleConstructorReturn(this, (DonateService.__proto__ || Object.getPrototypeOf(DonateService)).call(this, $http, envService));
  }

  _createClass(DonateService, [{
    key: 'pay',
    value: function pay(uuid, data) {
      return this.$http.post(this.url + this.route, data, this.config);
    }
  }, {
    key: 'payLogged',
    value: function payLogged(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/credit_card');
      return this.pay(uuid, data);
    }
  }, {
    key: 'payPublic',
    value: function payPublic(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/credit_card');
      this.setPublicToken();
      return this.pay(uuid, data);
    }
  }, {
    key: 'printBillet',
    value: function printBillet(uuid, data) {
      return this.$http.post(this.url + this.route, data, this.config);
    }
  }, {
    key: 'printLoggedBillet',
    value: function printLoggedBillet(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/boleto');
      return this.printBillet(uuid, data);
    }
  }, {
    key: 'printPublicBillet',
    value: function printPublicBillet(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/boleto');
      this.setPublicToken();
      return this.printBillet(uuid, data);
    }
  }]);

  return DonateService;
}(_common2.default);

exports.default = DonateService;


DonateService.$inject = ['$http', 'envService'];

},{"./../common/service/common.js":39}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EventConfig;
function EventConfig($stateProvider) {
  $stateProvider.state('event', {
    url: '/evento',
    templateUrl: './src/event/view/index.html'
  }).state('event.start', {
    url: '/comecar?categoria?meta?termino?causa',
    authenticate: true,
    templateUrl: './src/event/view/start.html',
    controller: 'EventStart',
    controllerAs: 'ctrl'
  }).state('event.explore', {
    url: '/explore',
    authenticate: false,
    templateUrl: './src/event/view/event.explore.html',
    controller: 'EventExplore',
    controllerAs: 'ctrl'
  }).state('event.report', {
    url: '/:uuid/relatorio',
    authenticate: false,
    templateUrl: './src/event/view/event.report.html',
    controller: 'EventReport',
    controllerAs: 'ctrl'
  }).state('event.slug', {
    url: '/:slug',
    authenticate: false,
    templateUrl: './src/event/view/event.html',
    controller: 'Event',
    controllerAs: 'ctrl'
  });
}

},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventExplore = function () {
  function EventExplore(ActivityAreaService, EventService, StorageService) {
    var _this = this;

    _classCallCheck(this, EventExplore);

    this.activityAreaService = ActivityAreaService;
    this.eventService = EventService;
    this.user = StorageService.getItem('user');
    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        'default': 600,
        'blur': 0
      }
    };
    this.isOpen = false;
    this.pendings = 0;
    this.pagination = { current_page: 1 };
    this.getEvents();
    this.getActivityAreas();
    this.search = function () {
      return _this.getSearch(_this.query);
    };
  }

  _createClass(EventExplore, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this2 = this;

      this.eventService.findAll({
        page: this.pagination.current_page
      }).then(function (response) {
        _this2.pagination = response.data.meta.pagination;
        _this2.events = response.data.values;
      });
    }
  }, {
    key: 'changePage',
    value: function changePage() {
      this.getEvents();
    }
  }, {
    key: 'getSearch',
    value: function getSearch(data) {
      var _this3 = this;

      data = angular.copy(data);
      if (data.area_activity_uuid) {
        data.area_activity_uuid = data.area_activity_uuid.uuid;
      }
      this.eventService.search(data).then(function (response) {
        _this3.pagination = response.data.meta.pagination;
        _this3.events = response.data.values;
      });
    }
  }, {
    key: 'getActivityAreas',
    value: function getActivityAreas() {
      var _this4 = this;

      this.activityAreaService.findAll().then(function (response) {
        _this4.area_activities = response.data.values;
      });
    }
  }]);

  return EventExplore;
}();

EventExplore.$inject = ['ActivityAreaService', 'EventService', 'StorageService'];

exports.default = EventExplore;

},{}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventHappens = function () {
  function EventHappens($uibModalInstance, data) {
    _classCallCheck(this, EventHappens);

    this.instance = $uibModalInstance;
    this.institution = data.institution;
  }

  _createClass(EventHappens, [{
    key: 'cancel',
    value: function cancel() {
      this.instance.dismiss('cancel');
    }
  }]);

  return EventHappens;
}();

exports.default = EventHappens;


EventHappens.$inject = ['$uibModalInstance', 'data'];

},{}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event($rootScope, $state, $stateParams, $uibModal, EventService, StorageService) {
    _classCallCheck(this, Event);

    this.rootScope = $rootScope;
    this.state = $state;
    this.modal = $uibModal;
    this.service = EventService;
    this.profile = StorageService.getItem('profile');
    this.event = {};
    if ($stateParams.slug) {
      this.slug = $stateParams.slug;
      this.getEvent($stateParams.slug);
    }
    this.pagination = { current_page: 1 };
  }

  _createClass(Event, [{
    key: 'getMessages',
    value: function getMessages(id) {
      var _this = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var method = this.profile ? 'getMessages' : 'getMessagesPublic';
      params.page = this.pagination.current_page;
      this.service[method](id, params).then(function (response) {
        _this.pagination = response.data.meta.pagination;
        _this.event.messages = response.data;
        console.log(_this.event);
      });
    }
  }, {
    key: 'getEvent',
    value: function getEvent(id) {
      var _this2 = this;

      this.service.findById(id).then(function (response) {
        var event = void 0;
        event = response.data;
        event.ends = new Date(event.ends);
        event.progress = Math.floor(event.total_receive / event.goal * 100);
        _this2.event = event;
        // console.log(this.event)
        if (_this2.event.messages.contains) {
          _this2.getMessages(_this2.slug, {});
        }
      });
    }
  }, {
    key: 'seeWhatHappens',
    value: function seeWhatHappens(event) {
      if (event.report) {
        this.state.go('event.report', { uuid: event.institution.uuid });
      } else {
        var modalInstance = this.modal.open({
          templateUrl: './../src/event/view/event.happens.html',
          controller: 'EventHappens',
          controllerAs: 'ctrl',
          size: 'md',
          resolve: {
            data: function data() {
              return {
                institution: event.institution
              };
            }
          }
        });
      }
      // modalInstance.result.then(response => {
      //   this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: response.data.status})
      //   this.anchorScroll('scrollArea')
      //   this.timeout(() => {
      //     this.state.go('event.slug', {slug: response.uuid})
      //   }, 3000)
      // }, error => {
      //   this.rootScope.$broadcast('alert', {type: 'alert-danger', icon: 'fa-exclamation', message: error})
      // }
      // )
    }
  }]);

  return Event;
}();

exports.default = Event;


Event.$inject = ['$rootScope', '$state', '$stateParams', '$uibModal', 'EventService', 'StorageService'];

},{}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventReport = function () {
  function EventReport($state, $stateParams, EventService, StorageService, $uibModal, $rootScope) {
    _classCallCheck(this, EventReport);

    this.state = $state;
    this.service = EventService;
    this.profile = StorageService.getItem('profile');
    if ($stateParams.uuid) {
      this.uuid = $stateParams.uuid;
      this.getReport($stateParams.uuid);
    }
    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.active = 0;
    this.pagination = { current_page: 1 };
    this.modal = $uibModal;
    this.rootScope = $rootScope;
  }

  _createClass(EventReport, [{
    key: 'getRepeat',
    value: function getRepeat(num) {
      return new Array(num);
    }
  }, {
    key: 'getMessages',
    value: function getMessages(id, params) {
      var _this = this;

      var method = this.profile ? 'getMessages' : 'getMessagesPublic';
      params.page = this.pagination.current_page;
      this.service[method](id, params).then(function (response) {
        _this.pagination = response.data.meta.pagination;
        _this.report.messages = response.data;
      });
    }
  }, {
    key: 'getReport',
    value: function getReport(id) {
      var _this2 = this;

      var method = this.profile ? 'getReport' : 'getReportPublic';
      this.service[method](id).then(function (response) {
        // console.log(response.data)
        if (response.data) {
          _this2.report = response.data;
          // console.log(this.report.occurrence)
          if (_this2.report.messages.contains) {
            _this2.getMessages(_this2.uuid, {});
          }
          _this2.slides = [];
          var x = void 0,
              picture = void 0;
          for (x = 0; x < 3; x++) {
            picture = 'picture' + (x + 1);
            _this2.slides.push({
              id: x,
              image: _this2.report[picture].original
            });
          }
          if (!_this2.report.authorized_on && (_this2.profile.permissions['administration.global'] || _this2.profile.permissions.authorize_report)) {
            _this2.authorize_report = true;
          }
        } else {
          _this2.state.go('home');
        }
      }, function (error) {
        return console.error(error);
      });
    }
  }, {
    key: 'authorizeReport',
    value: function authorizeReport() {
      var _this3 = this;

      var modalInstance = this.modal.open({
        templateUrl: './../src/event/view/report.authorize.html',
        controller: 'ReportAuthorize',
        controllerAs: 'ctrl',
        resolve: {
          uuid: function uuid() {
            return _this3.report.uuid;
          }
        }
      });
      modalInstance.result.then(function (response) {
        console.log('ok', response);
        _this3.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: response.status });
      }, function (error) {
        console.error('no', error);
        _this3.rootScope.$broadcast('alert', { type: 'alert-danger', icon: 'fa-exclamation', message: error });
      });
    }
  }]);

  return EventReport;
}();

EventReport.$inject = ['$state', '$stateParams', 'EventService', 'StorageService', '$uibModal', '$rootScope'];

exports.default = EventReport;

},{}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventStart = function () {
  function EventStart($rootScope, $state, $window, $stateParams, $timeout, $filter, $location, $anchorScroll, LocationService, CityService, EventService, CategoryService, InstitutionService) {
    var _this = this;

    _classCallCheck(this, EventStart);

    this.rootScope = $rootScope;
    this.state = $state;
    this.window = $window;
    this.filter = $filter;
    this.location = $location;
    this.anchorScroll = $anchorScroll;
    this.service = EventService;
    this.locationService = LocationService;
    this.event = {
      categorie_uuid: null
    };
    this.options = {
      aSign: 'R$ ',
      aSep: '.',
      aDec: ','
    };

    if ($stateParams.meta) {
      this.event.goal_amount = $stateParams.meta;
    }
    if ($stateParams.termino) {
      this.event.end_date = $stateParams.termino;
    }
    this.inputCity = document.querySelector('input[name="citie"]');
    if (this.hasDraft()) {
      this.draft = this.getDraft();
    }
    this.locationService.getStates().then(function (response) {
      return _this.states = response.data.values;
    });

    InstitutionService.findAll().then(function (response) {
      _this.institutions = response.data.values;
      if ($stateParams.causa) {
        _this.event.institution_uuid = $stateParams.causa;
      }
      _this.formatLabel = function (model) {
        var len = this.institutions.length;
        for (var i = 0; i < len; i++) {
          if (model === this.institutions[i].uuid) {
            return this.institutions[i].name;
          }
        }
      };
    });
    CategoryService.findAll().then(function (response) {
      _this.categories = response.data.values;
      if ($stateParams.categoria) {
        _this.event.categorie_uuid = { slug: $stateParams.categoria };
      }
    });

    this.popovers = {
      name: {
        title: 'O nome da sua campanha',
        text: 'Você deve começar sua campanha pela escolha de um título. Por exemplo: "ajudando a causa X", "correndo pela causa Y" ou “fazendo um aniversário para a causa W". Uma dica: coloque nomes que chamem a atenção de seus parentes e amigos para quando o evento do bem  for compartihado em  suas mídias sociais.'
      },
      institution: {
        title: 'A instituição que quer ajudar',
        text: 'Para garantir a legitimidade das causas financiadas, o projeto beneficiado deve ser cadastrado na nossa plataforma. Você também pode procurar projetos e instituições já cadastrados em nosso portfolio de inspiração. Caso queira sugerir uma causa de interesse, entre em contato por aqui.'
      },
      state: {
        title: 'Seu estado',
        text: 'Selecione seu estado para que as cidades sejam carregadas.'
      },
      category: {
        title: 'Categoria da campanha',
        text: 'Qual categoria seu evento se adequa? Caso tenha um evento que se adeque a uma categoria não sugerida, não tem problema, classifique-a como "criativos".'
      },
      city: {
        title: 'Cidade da campanha',
        text: 'É a cidade na qual você está localizado. Uma campanha pode acontecer de duas maneiras: ou somente aqui pela internet, ou tanto pela internet quanto em uma festa, presencialmente.'
      },
      goal: {
        title: 'Meta',
        text: 'A meta motiva seus amigos a se unirem a você e assim ampliar o impacto social! Para pensar em uma meta factível faça uma lista de apoiadores mais prováveis de sua campanha: fale com amigos e familiares próximos, avalie um valor médio provável por doação, calcule o valor total e dobre o resultado, esta será sua meta. Será factível e ao mesmo tempo motivadora.'
      },
      end: {
        title: 'Data limite',
        text: 'Todas as nossas campanhas tem no mínimo 22 dias, pois é o prazo necessário para você mobilizar seus amigos. Mesmo que uma data específica de um evento esteja há poucos dias da data de criação de seu evento do bem, fique tranquilo que a maioria das campanhas batem a meta depois de sua data chave.'
      },
      description: {
        title: 'Descrição da campanha',
        text: 'Este é o texto em que você explica a seus amigos e familiares o porquê de ter criado sua campanha, apresentando-lhes o destino das doações e destacando-lhes a importância do impacto socioambiental que poderão causar. Por ser uma mensagem pessoal, é importante que você seja natural para que ela tenha a sua cara :D Deixe bem clara sua proposta. Por exemplo, no caso de um aniversário, você pode justificar sua campanha pedindo, ao invés de presentes, doações para o projeto/instituição em que acredita. Quanto mais pessoal, do coração e verdadeiro seu texto for...melhor! Finalize-o com uma frase de efeito para dar início à sua campanha!'
      },
      video: {
        title: 'Vídeo da campanha',
        text: 'Você pode gravar um vídeo explicando sua campanha. Caso prefira, pode ser um vídeo institucional da causa beneficiada. Se você deixar em branco o endereço do vídeo, sua página automaticamente utilizará o vídeo-padrão ou uma imagem do projeto salvo em nosso banco de dados.'
      }
    };
  }

  _createClass(EventStart, [{
    key: 'getCities',
    value: function getCities(state, city) {
      return this.locationService.getCities(state, city).then(function (response) {
        return response.data.values;
      });
    }
  }, {
    key: 'changeState',
    value: function changeState() {
      var _this2 = this;

      setTimeout(function () {
        _this2.inputCity.focus();
        delete _this2.event.citie;
      }, 100);
    }
  }, {
    key: 'setPopoverContent',
    value: function setPopoverContent(field) {
      this.popoverContent = this.popovers[field];
    }
  }, {
    key: 'checkEndDate',
    value: function checkEndDate(end) {
      var end_date = end.split('/');
      end_date = end_date[2] + '-' + end_date[1] + '-' + end_date[0];
      var dateEnd = new Date(end_date),
          dateCurrent = new Date(),
          timeDiff = dateEnd - dateCurrent,
          diffDays = parseInt(timeDiff / (1000 * 3600 * 24));
      return diffDays >= 22 && diffDays <= 90 ? false : true;
    }
  }, {
    key: 'save',
    value: function save(start, event) {
      var _this3 = this;

      if (start.$invalid) {
        angular.forEach(start.$error, function (field) {
          angular.forEach(field, function (errorField) {
            errorField.$setDirty();
          });
        });
      } else {
        // event.goal_amount = parseInt(event.goal_amount)
        this.service.save(event, function (progress) {
          return _this3.progress = progress;
        }).then(function (response) {
          _this3.state.go('event.slug', { slug: response.data.slug });
        }, function (error) {
          _this3.rootScope.$broadcast('alert', { type: 'alert-warning', icon: 'fa-exclamation', message: error.data });
          _this3.location.hash('body');
          _this3.anchorScroll();
        });
      }
    }
  }, {
    key: 'getAttr',
    value: function getAttr(name, attr) {
      var e = document.querySelector('[name=\'' + name + '\']');
      return e.getAttribute(attr);
    }
  }, {
    key: 'saveDraft',
    value: function saveDraft(event) {
      var draft = angular.copy(event);
      this.window.localStorage.setItem('draftEvent', JSON.stringify(draft));
    }
  }, {
    key: 'getDraft',
    value: function getDraft() {
      var draft = this.window.localStorage.getItem('draftEvent');
      return JSON.parse(draft);
    }
  }, {
    key: 'loadDraft',
    value: function loadDraft() {
      this.event = this.getDraft();
    }
  }, {
    key: 'removeDraft',
    value: function removeDraft() {
      this.window.localStorage.removeItem('draftEvent');
    }
  }, {
    key: 'hasDraft',
    value: function hasDraft() {
      return !!this.window.localStorage.getItem('draftEvent');
    }
  }]);

  return EventStart;
}();

exports.default = EventStart;


EventStart.$inject = ['$rootScope', '$state', '$window', '$stateParams', '$timeout', '$filter', '$location', '$anchorScroll', 'LocationService', 'CityService', 'EventService', 'CategoryService', 'InstitutionService'];

},{}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReportAuthorize = function () {
  function ReportAuthorize($uibModalInstance, uuid, EventService) {
    _classCallCheck(this, ReportAuthorize);

    this.instance = $uibModalInstance;
    this.service = EventService;
    this.uuid = uuid;
  }

  _createClass(ReportAuthorize, [{
    key: 'ok',
    value: function ok() {
      var _this = this;

      this.service.authorizeReport(this.uuid, { authorize: 1 }).then(function (response) {
        return _this.instance.close({ uuid: _this.uuid, data: response.data });
      }, function (error) {
        return _this.instance.close(error.data);
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      var _this2 = this;

      this.data.authorize = 0;
      this.service.authorizeReport(this.uuid, this.data).then(function (response) {
        return _this2.instance.dismiss({ uuid: _this2.uuid, data: response.data });
      }, function (error) {
        return _this2.instance.dismiss(error.data);
      });
    }
  }]);

  return ReportAuthorize;
}();

exports.default = ReportAuthorize;


ReportAuthorize.$inject = ['$uibModalInstance', 'uuid', 'EventService'];

},{}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

var _event = require('./controller/event.js');

var _event2 = _interopRequireDefault(_event);

var _eventStart = require('./controller/event.start.js');

var _eventStart2 = _interopRequireDefault(_eventStart);

var _eventExplore = require('./controller/event.explore.js');

var _eventExplore2 = _interopRequireDefault(_eventExplore);

var _eventReport = require('./controller/event.report.js');

var _eventReport2 = _interopRequireDefault(_eventReport);

var _eventHappens = require('./controller/event.happens.js');

var _eventHappens2 = _interopRequireDefault(_eventHappens);

var _reportAuthorize = require('./controller/report.authorize.js');

var _reportAuthorize2 = _interopRequireDefault(_reportAuthorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('event', []).config(_config2.default).controller('Event', _event2.default).controller('EventStart', _eventStart2.default).controller('EventExplore', _eventExplore2.default).controller('EventReport', _eventReport2.default).controller('EventHappens', _eventHappens2.default).controller('ReportAuthorize', _reportAuthorize2.default).service('EventService', _service2.default);

},{"./config.js":56,"./controller/event.explore.js":57,"./controller/event.happens.js":58,"./controller/event.js":59,"./controller/event.report.js":60,"./controller/event.start.js":61,"./controller/report.authorize.js":62,"./service.js":64}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventService = function (_CommonService) {
  _inherits(EventService, _CommonService);

  function EventService($http, envService) {
    _classCallCheck(this, EventService);

    var _this = _possibleConstructorReturn(this, (EventService.__proto__ || Object.getPrototypeOf(EventService)).call(this, $http, envService));

    _this.$http = $http;
    return _this;
  }

  _createClass(EventService, [{
    key: 'findAll',
    value: function findAll(params) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events');
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      if (params != undefined) {
        _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setParams', this).call(this, params);
      }
      return _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events');
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      return _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'findById', this).call(this, id);
    }
  }, {
    key: 'search',
    value: function search(data) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events');
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setParams', this).call(this, data);
      return _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'search', this).call(this);
    }
  }, {
    key: 'getSlugByName',
    value: function getSlugByName(name) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/create/previewSlug/' + name);
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'save',
    value: function save(data, progress) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/create');
      console.log(data);
      return _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'postWithFile', this).call(this, data, progress);
    }
  }, {
    key: 'getReport',
    value: function getReport(id) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/report');
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'getReportPublic',
    value: function getReportPublic(id) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/report');
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'getMessages',
    value: function getMessages(id) {
      var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/messages');
      if (user) {
        _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setParams', this).call(this, user);
      }
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'getMessagesPublic',
    value: function getMessagesPublic(id) {
      var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/messages');
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      if (user) {
        _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setParams', this).call(this, user);
      }
      console.log(this.config);
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'saveReport',
    value: function saveReport(id, data, progress) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/report/submit');
      return _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'postWithFile', this).call(this, data, progress);
    }
  }, {
    key: 'authorizeReport',
    value: function authorizeReport(id, data) {
      _get(EventService.prototype.__proto__ || Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'reports/' + id);
      return this.$http.put(this.url + this.route, data);
    }
  }]);

  return EventService;
}(_common2.default);

exports.default = EventService;


EventService.$inject = ['$http', 'envService'];

},{"./../common/service/common.js":39}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FaqConfig;
function FaqConfig($stateProvider) {
  $stateProvider.state('faq', {
    // abstract: true,
    // redirectTo: 'faq.category',
    url: '/perguntas-frequentes',
    authenticate: false,
    templateUrl: './src/faq/view/faq.html',
    controller: 'Faq',
    controllerAs: 'ctrl'
  }).state('faq.category', {
    url: '/category/:filter?',
    authenticate: false,
    templateUrl: './src/faq/view/faq.category.html',
    controller: 'Faq',
    controllerAs: 'ctrl'
  }).state('faq.question', {
    url: '/question/:questionId',
    authenticate: false,
    templateUrl: './src/faq/view/faq.question.html',
    controller: 'Faq',
    controllerAs: 'ctrl'
  });
}

},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Faq = function () {
  function Faq($state, $stateParams, FaqService) {
    var _this = this;

    _classCallCheck(this, Faq);

    this.state = $state;
    this.faqService = FaqService;
    this.faqService.findAll().then(function (response) {
      _this.categories = response.data.values;
    });
    if (!$stateParams.filter && !$stateParams.questionId) {
      $state.go('faq.category');
      this.filter({ filter: null });
    } else if ($stateParams.filter) {
      this.filter({
        filter: $stateParams.filter
      });
    } else if ($stateParams.questionId) {
      this.find($stateParams.questionId);
    }
  }

  _createClass(Faq, [{
    key: 'search',
    value: function search(params) {
      this.state.go('faq.category', params);
    }
  }, {
    key: 'filter',
    value: function filter(params) {
      var _this2 = this;

      this.faqService.findAll(params).then(function (response) {
        _this2.category = response.data.values;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      var _this3 = this;

      this.faqService.findById(id).then(function (response) {
        _this3.question = response.data;
      });
    }
  }]);

  return Faq;
}();

exports.default = Faq;


Faq.$inject = ['$state', '$stateParams', 'FaqService'];

},{}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

var _faq = require('./controller/faq.js');

var _faq2 = _interopRequireDefault(_faq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('faq', []).config(_config2.default).controller('Faq', _faq2.default).service('FaqService', _service2.default);

},{"./config.js":65,"./controller/faq.js":66,"./service.js":68}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FaqService = function (_CommonService) {
  _inherits(FaqService, _CommonService);

  function FaqService($http, envService) {
    _classCallCheck(this, FaqService);

    var _this = _possibleConstructorReturn(this, (FaqService.__proto__ || Object.getPrototypeOf(FaqService)).call(this, $http, envService));

    _this.$http = $http;
    return _this;
  }

  _createClass(FaqService, [{
    key: 'findAll',
    value: function findAll(params) {
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setRoute', this).call(this, 'faq');
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setPublicToken', this).call(this);
      if (params != undefined) {
        _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setParams', this).call(this, params);
      }
      return _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setRoute', this).call(this, 'faq');
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setPublicToken', this).call(this);
      return _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'findById', this).call(this, id);
    }
  }, {
    key: 'filter',
    value: function filter(data) {
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setRoute', this).call(this, 'faq');
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setPublicToken', this).call(this);
      _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'setParams', this).call(this, data);
      return _get(FaqService.prototype.__proto__ || Object.getPrototypeOf(FaqService.prototype), 'findAll', this).call(this);
    }
  }]);

  return FaqService;
}(_common2.default);

exports.default = FaqService;


FaqService.$inject = ['$http', 'envService'];

},{"./../common/service/common.js":39}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HomeConfig;
function HomeConfig($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    authenticate: false,
    templateUrl: './src/home/view/home.html',
    controller: 'Home',
    controllerAs: 'ctrl'
  });
}

},{}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Home = function () {
  function Home($scope, $timeout, $interval, CategoryService) {
    var _this = this;

    _classCallCheck(this, Home);

    CategoryService.findAll().then(function (response) {
      var categories = response.data.values,
          length = categories.length,
          count = 0;
      $interval(function () {
        count++;
        if (count >= length) count = 0;
        _this.category = categories[count].name.toLowerCase();
      }, 2000);
    });
    this.impact = {
      image: 'assets/images/causas-impactadas.jpg',
      title: 'João se curou do câncer',
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent Quem manda na minha terra sou Euzis! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'
    };
    this.impacts = [{
      image: 'assets/images/causas-impactadas.jpg',
      title: 'João se curou do câncer',
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent Quem manda na minha terra sou Euzis! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'
    }, {
      image: 'assets/images/causas-impactadas.jpg',
      title: 'João aprender a ler',
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent Quem manda na minha terra sou Euzis! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'
    }, {
      image: 'assets/images/causas-impactadas.jpg',
      title: 'João ganhou um lar',
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent Quem manda na minha terra sou Euzis! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'
    }, {
      image: 'assets/images/causas-impactadas.jpg',
      title: 'João tem um cachorro',
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent Quem manda na minha terra sou Euzis! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'
    }];
    this.loadImpact(0);
  }

  _createClass(Home, [{
    key: 'loadImpact',
    value: function loadImpact(index) {
      this.impact = this.impacts[index];
    }
  }]);

  return Home;
}();

exports.default = Home;


Home.$inject = ['$scope', '$timeout', '$interval', 'CategoryService'];

},{}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _home = require('./controller/home.js');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Service      from './service.js'
// import Confirmation from './controller/confirmation.js'
// import Me           from './controller/me.js'
// import Change       from './controller/change.js'

exports.default = angular.module('home', []).config(_config2.default).controller('Home', _home2.default);
// .service('UserService', Service)

},{"./config.js":69,"./controller/home.js":70}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InstitutionConfig;
function InstitutionConfig($stateProvider) {
  $stateProvider.state('institution', {
    url: '/instituicao/:slug',
    authenticate: false,
    templateUrl: './src/institution/view/page.html',
    controller: 'Page',
    controllerAs: 'ctrl'
  });
}

},{}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function () {
  function Page($filter, $stateParams, InstitutionService, ProfileService, NotificationService, StorageService) {
    _classCallCheck(this, Page);

    this.filter = $filter;
    this.service = InstitutionService;
    this.profileService = ProfileService;
    this.notification = NotificationService;
    this.storage = StorageService;
    this.profile = this.storage.getItem('profile');
    if (this.profile && this.profile.type == 'user') {
      this.getProfile();
    }
    if ($stateParams.slug) {
      this.findInstitution($stateParams.slug);
    }
  }

  _createClass(Page, [{
    key: 'getProfile',
    value: function getProfile() {
      var _this = this;

      this.profileService.me().then(function (response) {
        var _response$data = response.data,
            name = _response$data.name,
            birthdate = _response$data.birthdate,
            email = _response$data.email,
            type = _response$data.type;

        _this.profile.birthdate = _this.filter('date')(birthdate, 'dd/MM/yyyy'), _this.birthday = {
          name: name,
          birthdate: _this.filter('date')(birthdate, 'dd/MM/yyyy'),
          email: email,
          type: type
        };
      });
    }
  }, {
    key: 'findInstitution',
    value: function findInstitution(slug) {
      var _this2 = this;

      this.service.findById(slug).then(function (response) {
        _this2.institution = response.data;
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(data) {
      var _this3 = this;

      data.institution_uuid = this.institution.uuid;
      this.notification.subscribe(data).then(function (response) {
        _this3.response = {
          status: true,
          icon: 'fa-hourglass-half',
          message: 'Seu aniversário está quase cadastrado, verifique sua caixa de e-mail para confirmar e concluir sua assinatura.'
        };
        _this3.birthday = {};
      }, function (error) {
        _this3.response = {
          status: false,
          icon: 'fa-exclamation',
          message: 'Ops, algo errado aconteceu, infelizmente seu aniversário não foi cadastrado, entre em contato conosco :('
        };
      });
    }
  }]);

  return Page;
}();

exports.default = Page;


Page.$inject = ['$filter', '$stateParams', 'InstitutionService', 'ProfileService', 'NotificationService', 'StorageService'];

},{}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

var _page = require('./controller/page.js');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('institution', []).config(_config2.default).service('InstitutionService', _service2.default).controller('Page', _page2.default);

},{"./config.js":72,"./controller/page.js":73,"./service.js":75}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstitutionService = function (_CommonService) {
  _inherits(InstitutionService, _CommonService);

  function InstitutionService($http, envService) {
    _classCallCheck(this, InstitutionService);

    return _possibleConstructorReturn(this, (InstitutionService.__proto__ || Object.getPrototypeOf(InstitutionService)).call(this, $http, envService));
  }

  _createClass(InstitutionService, [{
    key: 'findById',
    value: function findById(slug) {
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions');
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setPublicToken', this).call(this);
      return _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'findById', this).call(this, slug);
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions');
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setPublicToken', this).call(this);
      return _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'savePage',
    value: function savePage(data, progress) {
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions/' + data.uuid + '/page');
      return _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'postWithFile', this).call(this, data, progress);
    }
  }, {
    key: 'search',
    value: function search(data) {
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions');
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setPublicToken', this).call(this);
      _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'setParams', this).call(this, data);
      return _get(InstitutionService.prototype.__proto__ || Object.getPrototypeOf(InstitutionService.prototype), 'search', this).call(this);
    }
  }]);

  return InstitutionService;
}(_common2.default);

exports.default = InstitutionService;


InstitutionService.$inject = ['$http', 'envService'];

},{"./../common/service/common.js":39}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PagesConfig;
function PagesConfig($stateProvider) {
  $stateProvider.state('pages', {
    url: '/paginas',
    authenticate: false,
    templateUrl: './src/pages/view/pages.html'
  }).state('pages.about', {
    url: '/quem-somos',
    authenticate: false,
    templateUrl: './src/pages/view/about.html',
    controller: 'About',
    controllerAs: 'ctrl'
  }).state('pages.how-it-works', {
    url: '/como-funciona',
    authenticate: false,
    templateUrl: './src/pages/view/how-it-works.html'
  }).state('pages.explore', {
    url: '/explore-novas-causas',
    authenticate: false,
    templateUrl: './src/pages/view/explore.html',
    controller: 'Explore',
    controllerAs: 'ctrl'
  }).state('pages.campaign', {
    url: '/campanha',
    templateUrl: './src/pages/view/campaign.html',
    controller: 'Campaign',
    controllerAs: 'ctrl'
  }).state('pages.terms', {
    url: '/termos-de-uso',
    authenticate: false,
    templateUrl: './src/pages/view/terms.html'
  }).state('pages.policies', {
    url: '/politica-de-privacidade',
    authenticate: false,
    templateUrl: './src/pages/view/policies.html'
  }).state('pages.contact', {
    url: '/contato',
    authenticate: false,
    templateUrl: './src/pages/view/contact.html',
    controller: 'Contact',
    controllerAs: 'ctrl'
  });
}

},{}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var About = function About() {
  _classCallCheck(this, About);

  this.slides = [{
    id: 0,
    quotes: [{
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Delegadis gente finis, bibendum egestas augue arcu ut est. Manduma pindureta quium dia nois paga. Quem num gosta di mé, boa gente num é. Per aumento de cachacis, eu reclamis.',
      name: 'Fulano de souza 1'
    }, {
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Delegadis gente finis, bibendum egestas augue arcu ut est. Manduma pindureta quium dia nois paga. Quem num gosta di mé, boa gente num é. Per aumento de cachacis, eu reclamis.',
      name: 'Fulano de souza 2'
    }]
  }, {
    id: 1,
    quotes: [{
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Delegadis gente finis, bibendum egestas augue arcu ut est. Manduma pindureta quium dia nois paga. Quem num gosta di mé, boa gente num é. Per aumento de cachacis, eu reclamis.',
      name: 'Fulano de souza 3'
    }, {
      text: 'Mussum Ipsum, cacilds vidis litro abertis. Delegadis gente finis, bibendum egestas augue arcu ut est. Manduma pindureta quium dia nois paga. Quem num gosta di mé, boa gente num é. Per aumento de cachacis, eu reclamis.',
      name: 'Fulano de souza 4'
    }]
  }];
};

exports.default = About;


About.$inject = [];

},{}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Campaign = function Campaign() {
  _classCallCheck(this, Campaign);
};

exports.default = Campaign;


Campaign.$inject = [];

},{}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function () {
  function Contact($rootScope, $http, envService) {
    _classCallCheck(this, Contact);

    this.rootScope = $rootScope;
    this.url = envService.read('apiUrl');
    this.token = envService.read('token');
    this.http = $http;
    this.master = {
      destination: 'how-it-work'
    };
    this.contact = angular.copy(this.master);
  }

  _createClass(Contact, [{
    key: 'send',
    value: function send(contact, data) {
      var _this = this;

      this.http.post(this.url + 'contact', data, {
        headers: {
          token: this.token
        }
      }).then(function (response) {
        _this.rootScope.$broadcast('alert', {
          type: 'alert-success',
          icon: 'fa-check',
          message: {
            message: 'Legal ter entrado em contato :) aguarde nosso retorno.'
          }
        });
        _this.contact = angular.copy(_this.master);
        contact.$setPristine();
      }, function (error) {
        _this.rootScope.$broadcast('alert', {
          type: 'alert-warning',
          icon: 'fa-exclamation',
          message: error.data
        });
      });
    }
  }]);

  return Contact;
}();

exports.default = Contact;


Contact.$inject = ['$rootScope', '$http', 'envService'];

},{}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DonateBillet = function () {
  function DonateBillet($uibModalInstance, donate) {
    _classCallCheck(this, DonateBillet);

    this.instance = $uibModalInstance;
    this.donate = donate;
  }

  _createClass(DonateBillet, [{
    key: 'buildBillet',
    value: function buildBillet(donate) {
      this.instance.close(donate);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.instance.dismiss('cancel');
    }
  }]);

  return DonateBillet;
}();

exports.default = DonateBillet;


DonateBillet.$inject = ['$uibModalInstance', 'donate'];

},{}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Explore = function () {
  function Explore(ActivityAreaService, InstitutionService, StorageService) {
    var _this = this;

    _classCallCheck(this, Explore);

    this.activityAreaService = ActivityAreaService;
    this.institutionService = InstitutionService;
    this.profile = StorageService.getItem('profile');
    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        'default': 600,
        'blur': 0
      }
    };
    this.isOpen = false;
    this.getInstitutions();
    this.getActivityAreas();
    this.search = function () {
      return _this.getSearch(_this.query);
    };
  }

  _createClass(Explore, [{
    key: 'getInstitutions',
    value: function getInstitutions() {
      var _this2 = this;

      this.institutionService.findAll().then(function (response) {
        _this2.institutions = response.data.values;
        console.log(_this2.institutions);
      });
    }
  }, {
    key: 'getSearch',
    value: function getSearch(data) {
      var _this3 = this;

      data = angular.copy(data);
      if (data.area_activity_uuid) {
        data.area_activity_uuid = data.area_activity_uuid.uuid;
      }
      this.institutionService.search(data).then(function (response) {
        return _this3.institutions = response.data.values;
      });
    }
  }, {
    key: 'getActivityAreas',
    value: function getActivityAreas() {
      var _this4 = this;

      this.activityAreaService.findAll().then(function (response) {
        return _this4.area_activities = response.data.values;
      });
    }
  }]);

  return Explore;
}();

Explore.$inject = ['ActivityAreaService', 'InstitutionService', 'StorageService'];

exports.default = Explore;

},{}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _contact = require('./controller/contact.js');

var _contact2 = _interopRequireDefault(_contact);

var _about = require('./controller/about.js');

var _about2 = _interopRequireDefault(_about);

var _explore = require('./controller/explore.js');

var _explore2 = _interopRequireDefault(_explore);

var _campaign = require('./controller/campaign.js');

var _campaign2 = _interopRequireDefault(_campaign);

var _donateBillet = require('./controller/donate.billet.js');

var _donateBillet2 = _interopRequireDefault(_donateBillet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('pages', []).config(_config2.default).controller('Contact', _contact2.default).controller('About', _about2.default).controller('Explore', _explore2.default).controller('Campaign', _campaign2.default).controller('DonateBillet', _donateBillet2.default);

},{"./config.js":76,"./controller/about.js":77,"./controller/campaign.js":78,"./controller/contact.js":79,"./controller/donate.billet.js":80,"./controller/explore.js":81}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProfileConfig;
function ProfileConfig($stateProvider) {
  $stateProvider.state('profile', {
    url: '/perfil',
    templateUrl: './src/profile/view/profile.html'
  }).state('profile.user', {
    url: '/usuario',
    authenticate: true,
    templateUrl: './src/profile/view/user.html',
    controller: 'ProfileUser',
    controllerAs: 'ctrl',
    resolve: {
      profile: function profile(ProfileService) {
        return ProfileService.me();
      }
    }
  }).state('profile.user.configurations', {
    url: '/configuracoes',
    authenticate: true,
    templateUrl: './src/profile/view/user.configurations.html',
    controller: 'UserConfigurations',
    controllerAs: 'ctrl',
    resolve: {
      profile: function profile(ProfileService) {
        return ProfileService.me();
      }
    }
  }).state('profile.user.impacts', {
    url: '/impactos',
    authenticate: true,
    templateUrl: './src/profile/view/user.impacts.html',
    controller: 'UserImpacts',
    controllerAs: 'ctrl',
    resolve: {
      // profile: (ProfileService) => {
      //   return ProfileService.me()
      // }
    }
  }).state('profile.user.events', {
    url: '/eventos',
    authenticate: true,
    templateUrl: './src/profile/view/user.events.html',
    controller: 'UserEvents',
    controllerAs: 'ctrl',
    resolve: {
      // profile: (ProfileService) => {
      //   return ProfileService.me()
      // }
    }
  }).state('profile.user.donors', {
    url: '/eventos/:uuid/doacoes',
    authenticate: true,
    templateUrl: './src/profile/view/event.donors.html',
    controller: 'EventDonors',
    controllerAs: 'ctrl',
    resolve: {}
  })
  // .state('profile.user.report', {
  //   url: '/eventos/:uuid/relatorio',
  //   authenticate: true,
  //   templateUrl: './src/profile/view/event.report.html',
  //   controller: 'UserReport',
  //   controllerAs: 'ctrl',
  //   resolve: {
  //   }
  // })
  .state('profile.ong', {
    url: '/ong',
    authenticate: true,
    templateUrl: './src/profile/view/ong.html',
    controller: 'ProfileOng',
    controllerAs: 'ctrl',
    resolve: {
      profile: function profile(ProfileService) {
        return ProfileService.me();
      }
    }
  }).state('profile.ong.donors', {
    url: '/eventos/:uuid/doacoes',
    authenticate: true,
    templateUrl: './src/profile/view/event.donors.html',
    controller: 'EventDonors',
    controllerAs: 'ctrl',
    resolve: {}
  }).state('profile.ong.configurations', {
    url: '/configuracoes',
    authenticate: true,
    templateUrl: './src/profile/view/ong.configurations.html',
    controller: 'OngConfigurations',
    controllerAs: 'ctrl',
    resolve: {
      profile: function profile(ProfileService) {
        return ProfileService.me();
      }
    }
  }).state('profile.ong.events', {
    url: '/eventos',
    authenticate: true,
    templateUrl: './src/profile/view/ong.events.html',
    controller: 'OngEvents',
    controllerAs: 'ctrl',
    resolve: {}
  }).state('profile.ong.page', {
    url: '/:uuid/pagina',
    authenticate: true,
    templateUrl: './src/profile/view/ong.page.html',
    controller: 'OngPage',
    controllerAs: 'ctrl',
    resolve: {
      profile: function profile(ProfileService) {
        return ProfileService.me();
      }
    }
  }).state('profile.ong.history', {
    url: '/eventos/historico',
    authenticate: true,
    templateUrl: './src/profile/view/ong.history.html',
    controller: 'OngHistory',
    controllerAs: 'ctrl',
    resolve: {
      // profile: (ProfileService) => {
      //   return ProfileService.me()
      // }
    }
  }).state('profile.ong.report', {
    url: '/eventos/:uuid/relatorio',
    authenticate: true,
    templateUrl: './src/profile/view/ong.report.html',
    controller: 'OngReport',
    controllerAs: 'ctrl',
    resolve: {}
  }).state('profile.register', {
    url: '/cadastro/:tab',
    authenticate: false,
    templateUrl: './src/profile/view/register.html',
    controller: 'ProfileRegister',
    controllerAs: 'ctrl'
  }).state('profile.confirmation', {
    url: '/confirmacao/:uuid/:confirmation_code',
    authenticate: false,
    templateUrl: './src/profile/view/confirmation.html',
    controller: 'ProfileConfirmation',
    controllerAs: 'ctrl'
  }).state('profile.check', {
    url: '/verifique',
    authenticate: false,
    templateUrl: './src/profile/view/profile.check.html'
  }).state('profile.change', {
    url: '/alterar',
    templateUrl: './src/profile/view/change.html',
    controller: 'ProfileChange',
    controllerAs: 'ctrl'
  });
}

},{}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileChange = function () {
  function ProfileChange($scope, $stateParams, $state, $filter, ProfileService) {
    var _this = this;

    _classCallCheck(this, ProfileChange);

    this.filter = $filter;
    this.service = ProfileService;
    this.me = function () {
      ProfileService.me().then(function (response) {
        console.log(response);
        _this.me = response.data;
        _this.profile = response.data;
      }, function (error) {
        console.error('error: ', error);
      });
    };
  }

  _createClass(ProfileChange, [{
    key: 'change',
    value: function change(profile) {
      birthdate = profile.birthdate.split('/');
      profile.birthdate = new Date(birthdate[2] + '-' + birthdate[1] + '-' + birthdate[0]);
      profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd');
      this.service.change(profile).then(function (response) {
        console.log(response);
      });
    }
  }]);

  return ProfileChange;
}();

exports.default = ProfileChange;


ProfileChange.$inject = ['$scope', '$stateParams', '$state', '$filter', 'ProfileService'];

},{}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileConfirmation = function () {
  function ProfileConfirmation($rootScope, $stateParams, $state, $timeout, ProfileService, StorageService) {
    var _this = this;

    _classCallCheck(this, ProfileConfirmation);

    this.storage = StorageService;
    this.rootScope = $rootScope;
    this.state = $state;
    this.timeout = $timeout;
    this.confirmation = false;
    if ($stateParams.uuid && $stateParams.confirmation_code) {
      var profile = {
        uuid: $stateParams.uuid,
        confirmation_code: $stateParams.confirmation_code
      };
      ProfileService.confirmation(profile).then(function (response) {
        _this.confirmation = true;
        // console.log(response)
        _this.profile = response.data;
        _this.timeout(function () {
          return _this.login();
        }, 2000);
      }, function (error) {
        _this.error = error.data;
        // console.log('error', error)
      });
    }
  }

  _createClass(ProfileConfirmation, [{
    key: 'login',
    value: function login() {
      this.storage.setItem('token', this.profile.token);
      var _profile = this.profile,
          name = _profile.name,
          email = _profile.email,
          type = _profile.type;

      this.storage.setItem('profile', { name: name, email: email, type: type });
      this.rootScope.$broadcast('profile.change');
      switch (type) {
        case 'user':
          this.state.go('profile.user');break;
        case 'ong':
          this.state.go('profile.ong');break;
      }
    }
  }]);

  return ProfileConfirmation;
}();

exports.default = ProfileConfirmation;


ProfileConfirmation.$inject = ['$rootScope', '$stateParams', '$state', '$timeout', 'ProfileService', 'StorageService'];

},{}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDonors = function () {
  function EventDonors(EventService, ProfileService, $stateParams, $uibModal, StorageService) {
    _classCallCheck(this, EventDonors);

    this.service = EventService;
    this.profileService = ProfileService;
    this.modal = $uibModal;
    this.storage = StorageService;
    if ($stateParams.uuid) {
      this.uuid = $stateParams.uuid;
      this.getEvent();
    }
    this.pagination = { current_page: 1 };
    this.profile = this.storage.getItem('profile');
  }

  _createClass(EventDonors, [{
    key: 'getEvent',
    value: function getEvent() {
      var _this = this;

      var event = void 0;
      this.service.findById(this.uuid).then(function (response) {
        event = response.data;
        event.progress = event.total_receive / event.goal * 100;
        _this.getPayments();
        _this.event = event;
      });
    }
  }, {
    key: 'getPayments',
    value: function getPayments() {
      var _this2 = this;

      this.profileService.getEventPayments(this.uuid, {
        page: this.pagination.current_page
      }).then(function (response) {
        _this2.pagination = response.data.meta.pagination;
        _this2.donors = response.data.values.map(function (donor) {
          donor.updated_at = new Date(donor.updated_at);
          return donor;
        });
      });
    }
  }, {
    key: 'changePage',
    value: function changePage() {
      this.getPayments();
    }
  }, {
    key: 'unAvailable',
    value: function unAvailable() {
      var modalInstance = this.modal.open({
        templateUrl: './../src/profile/view/unavailable.html',
        controller: 'Unavailable',
        controllerAs: 'ctrl'
      });
    }
  }]);

  return EventDonors;
}();

exports.default = EventDonors;


EventDonors.$inject = ['EventService', 'ProfileService', '$stateParams', '$uibModal', 'StorageService'];

},{}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngConfigurations = function () {
  function OngConfigurations($filter, $rootScope, StorageService, ProfileService, InstitutionService, GeoLocationFactory, profile) {
    _classCallCheck(this, OngConfigurations);

    this.filter = $filter;
    this.rootScope = $rootScope;
    this.storage = StorageService;
    this.service = ProfileService;
    this.institutionService = InstitutionService;
    this.geolocation = GeoLocationFactory;
    this.load(profile);
  }

  _createClass(OngConfigurations, [{
    key: 'load',
    value: function load(profile) {
      profile = angular.copy(profile.data);
      console.log(profile);
      var _profile$institutions = profile.institutions,
          uuid = _profile$institutions.uuid,
          name = _profile$institutions.name,
          cnpj = _profile$institutions.cnpj,
          bank_account = _profile$institutions.bank_account,
          coords = _profile$institutions.coords,
          address = _profile$institutions.address,
          phone = _profile$institutions.phone,
          areaActivity = _profile$institutions.areaActivity,
          facebook = _profile$institutions.facebook;

      this.institution = {
        uuid: uuid,
        name: name,
        cnpj: cnpj,
        bank_account: bank_account,
        coords: coords,
        address: address,
        phone: phone,
        area_activity_uuid: areaActivity.uuid,
        facebook: facebook
      };
      profile.birthdate = new Date(profile.birthdate);
      profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy');
      this.profile = profile;
    }
  }, {
    key: 'findAddressByPosition',
    value: function findAddressByPosition() {
      var _this = this;

      this.geolocation.getPosition(function (position) {
        _this.institution.coords = position.coords.latitude + ', ' + position.coords.longitude;
        _this.geolocation.getAddress(position.coords).then(function (response) {
          return _this.institution.address = response.data.results[0].formatted_address;
        });
      }, function (error) {
        return console.error(error);
      });
    }
  }, {
    key: 'saveOng',
    value: function saveOng(institution) {
      institution = angular.copy(institution);
      this.institutionService.update(institution).then(function (response) {
        return console.log(response);
      });
    }
  }, {
    key: 'saveUser',
    value: function saveUser(profile) {
      var _this2 = this;

      this.service.change(profile, function (progress) {
        _this2.progress = progress;
      }).then(function (response) {
        _this2.storage.setItem('token', response.data.token);
        var _response$data = response.data,
            name = _response$data.name,
            email = _response$data.email,
            type = _response$data.type,
            avatar = _response$data.avatar,
            permissions = _response$data.permissions;

        _this2.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar, permissions: permissions });
        _this2.rootScope.$broadcast('profile.change');
        _this2.profile.password = '';
        _this2.profile.new_password = '';
      });
    }
  }]);

  return OngConfigurations;
}();

exports.default = OngConfigurations;


OngConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'InstitutionService', 'GeoLocationFactory', 'profile'];

},{}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngEvents = function () {
  function OngEvents($rootScope, ProfileService) {
    _classCallCheck(this, OngEvents);

    this.rootScope = $rootScope;
    this.service = ProfileService;
    this.pendings = 0;
    this.pagination = { current_page: 1 };
    this.getEvents();
  }

  _createClass(OngEvents, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents({
        withoutReport: true,
        page: this.pagination.current_page
      }).then(function (response) {
        // console.log(response)
        _this.pagination = response.data.meta.pagination;
        _this.events = response.data.values.map(function (event) {
          event.dateStartSubmissionReport = new Date(event.dateStartSubmissionReport);
          return event;
        });
        _this.pendings = response.data.values.filter(function (event) {
          return event.needReport == true;
        });
        _this.rootScope.$broadcast('alert', {
          type: 'alert-warning',
          icon: 'fa-warning',
          message: 'Voc\xEA tem ' + _this.pendings.length + ' relat\xF3rios pendentes.'
        });
      });
    }
  }, {
    key: 'changePage',
    value: function changePage() {
      this.getEvents();
    }
  }]);

  return OngEvents;
}();

exports.default = OngEvents;


OngEvents.$inject = ['$rootScope', 'ProfileService'];

},{}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngHistory = function () {
  function OngHistory($rootScope, ProfileService) {
    _classCallCheck(this, OngHistory);

    this.rootScope = $rootScope;
    this.service = ProfileService;
    this.pagination = { current_page: 1 };
    this.getEvents();
  }

  _createClass(OngHistory, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents({
        withReport: true,
        page: this.pagination.current_page
      }).then(function (response) {
        _this.pagination = response.data.meta.pagination;
        _this.events = response.data.values.map(function (event) {
          event.ends = new Date(event.ends);
          return event;
        });
        // this.pendings = response.data.values.filter(event => {
        //   return (event.needReport == true)
        // })
        // this.rootScope.$broadcast('alert', {
        //   type: 'alert-warning',
        //   icon: 'fa-warning',
        //   message: `Você tem ${this.pendings.length} relatórios pendentes.`
        // })
      });
    }
  }, {
    key: 'changePage',
    value: function changePage() {
      this.getEvents();
    }
  }]);

  return OngHistory;
}();

exports.default = OngHistory;


OngHistory.$inject = ['$rootScope', 'ProfileService'];

},{}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileOng = function () {
  function ProfileOng($scope, $window, $state, StorageService, ProfileService, profile) {
    var _this = this;

    _classCallCheck(this, ProfileOng);

    this.service = ProfileService;
    this.profile = profile.data;
    this.getEventsWithoutReport();
    $scope.$on('profile.change', function () {
      _this.profile = StorageService.getItem('profile');
    });
  }

  _createClass(ProfileOng, [{
    key: 'getEventsWithoutReport',
    value: function getEventsWithoutReport() {
      var _this2 = this;

      this.service.getEvents({ onlyEnabledToReceiveReport: true, total: true }).then(function (response) {
        return _this2.onlyEnabledToReceiveReport = response.data.total;
      });
    }
  }]);

  return ProfileOng;
}();

exports.default = ProfileOng;


ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile'];

},{}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngPage = function () {
  function OngPage(profile, InstitutionService, $rootScope) {
    _classCallCheck(this, OngPage);

    this.profile = profile.data;
    this.service = InstitutionService;
    this.rootScope = $rootScope;
    this.getInstitution(profile.data.institutions.uuid);
  }

  _createClass(OngPage, [{
    key: 'getInstitution',
    value: function getInstitution(id) {
      var _this = this;

      this.service.findById(id).then(function (response) {
        delete response.data.cover;
        _this.page = response.data;
      });
    }
  }, {
    key: 'save',
    value: function save(data) {
      var _this2 = this;

      this.service.savePage(data, function (progress) {
        _this2.progress = progress;
      }).then(function (response) {
        _this2.rootScope.$broadcast('alert', {
          type: 'alert-success',
          icon: 'fa-check',
          message: 'Página oficial salva com sucesso! :)'
        });
      }, function (error) {
        _this2.rootScope.$broadcast('alert', {
          type: 'alert-danger',
          icon: 'fa-exclamation',
          message: 'Erro ao salvar página oficial! :('
        });
      });
    }
  }]);

  return OngPage;
}();

exports.default = OngPage;


OngPage.$inject = ['profile', 'InstitutionService', '$rootScope'];

},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngReport = function () {
  function OngReport($rootScope, EventService, $stateParams) {
    _classCallCheck(this, OngReport);

    this.rootScope = $rootScope;
    this.service = EventService;
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid);
      this.getReport($stateParams.uuid);
    }
    this.benefit = [{ label: 'Crianças', value: 'children' }, { label: 'Jovens', value: 'young' }, { label: 'Pessoas', value: 'people' }, { label: 'Familias', value: 'families' }, { label: 'Idosos', value: 'elderly' }, { label: 'Animais', value: 'animals' }, { label: 'Cachorros', value: 'dogs' }, { label: 'Gatos', value: 'cats' }, { label: 'Árvores', value: 'trees' }];
  }

  _createClass(OngReport, [{
    key: 'getEvent',
    value: function getEvent(id) {
      var _this = this;

      this.service.findById(id).then(function (response) {
        return _this.event = response.data;
      }, function (error) {
        return console.error(error);
      });
    }
  }, {
    key: 'getReport',
    value: function getReport(id) {
      var _this2 = this;

      this.service.getReport(id).then(function (response) {
        console.log(response.data);
        _this2.report = response.data;
        delete _this2.report.picture1;
        delete _this2.report.picture2;
        delete _this2.report.picture3;
        delete _this2.report.picture4;
      }, function (error) {
        return console.error(error);
      });
    }
  }, {
    key: 'save',
    value: function save(id, data, submission) {
      var _this3 = this;

      var feedbackMessage = void 0;
      if (submission) {
        data.submission = true;
        feedbackMessage = 'Seu relatório foi enviado para aprovação, aguarde e se estiver tudo correto, será publicado.';
      } else {
        feedbackMessage = 'Seu relatório foi salvo, e permanece em progresso, assim que concluído, submeta para avaliação.';
      }
      this.service.saveReport(id, data, function (progress) {
        _this3.progress = progress;
      }).then(function (response) {
        console.log(response);
        _this3.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: feedbackMessage });
      }, function (error) {
        console.error(error.data);
      });
    }
  }]);

  return OngReport;
}();

exports.default = OngReport;


OngReport.$inject = ['$rootScope', 'EventService', '$stateParams'];

},{}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileRegister = function () {
  function ProfileRegister($rootScope, $scope, $stateParams, $state, $filter, $timeout, ActivityAreaService, ProfileService, StorageService, LastStateUnloggedService) {
    _classCallCheck(this, ProfileRegister);

    this.activityAreaService = ActivityAreaService;
    this.service = ProfileService;
    this.timeout = $timeout;
    this.storage = StorageService;
    this.lastStateUnloggedService = LastStateUnloggedService;
    this.$rootScope = $rootScope;
    this.state = $state;
    this.filter = $filter;
    this.masterProfile = {
      gender: 'Feminino'
    };
    if ($stateParams.tab === 'ong') this.activeForm = 1;
    this.step = 0;
    this.showPassword = false;
    this.typeInputPassword = 'password';
    this.getActivityAreas();
    this.fbRegister = false;
    // $http.get('data/area_activities.json')
    //   .then(response => this.area_activities = response.data) 
  }

  _createClass(ProfileRegister, [{
    key: 'getActivityAreas',
    value: function getActivityAreas() {
      var _this = this;

      this.activityAreaService.findAll().then(function (response) {
        return _this.area_activities = response.data.values;
      });
    }
  }, {
    key: 'resetProfile',
    value: function resetProfile() {
      this.profile = angular.copy(this.masterProfile);
    }
  }, {
    key: 'toggleShowPassword',
    value: function toggleShowPassword() {
      this.typeInputPassword = this.showPassword ? 'text' : 'password';
    }
  }, {
    key: 'changeTab',
    value: function changeTab(active) {
      this.error = null;
      this.resetProfile();
      this.changeStep();
      switch (active) {
        case 0:
          this.timeout(function () {
            return document.querySelector('form[name="registerOng"] input[name="name_organization"]').focus();
          }, 300);break;
        case 1:
          this.timeout(function () {
            return document.querySelector('form[name="registerUser"] input[name="name"]').focus();
          }, 300);break;
      }
    }
  }, {
    key: 'validateStep',
    value: function validateStep(form) {
      var validated = void 0;
      switch (this.step) {
        case 0:
          validated = form.name_organization.$invalid || form.mission.$invalid || form.area_activity_uuid.$invalid ? true : false;break;
        case 1:
          validated = form.phone.$invalid || form.facebook.$invalid ? true : false;break;
        case 2:
          validated = form.name.$invalid || form.email.$invalid || form.password.$invalid ? true : false;break;
      }
      return validated;
    }
  }, {
    key: 'changeStep',
    value: function changeStep(direction) {
      switch (direction) {
        case 'next':
          this.step++;break;
        case 'prev':
          this.step--;break;
        default:
          this.step = 0;
      }
      switch (this.step) {
        case 0:
          this.timeout(function () {
            return document.querySelector('form[name="registerOng"] input[name="name_organization"]').focus();
          }, 300);break;
        case 1:
          this.timeout(function () {
            return document.querySelector('form[name="registerOng"] input[name="phone"]').focus();
          }, 300);break;
        case 2:
          this.timeout(function () {
            return document.querySelector('form[name="registerOng"] input[name="name"]').focus();
          }, 300);break;
      }
    }
  }, {
    key: 'registerFacebook',
    value: function registerFacebook() {
      var _this2 = this;

      this.service.registerFacebook(function (response) {
        _this2.registerUser(response);
      });
    }
  }, {
    key: 'checkOfAge',
    value: function checkOfAge(age) {
      var date = new Date(),
          timeDiff = date - age,
          diffDays = timeDiff / (1000 * 3600 * 24 * 365);
      return diffDays < 18 ? false : true;
    }
  }, {
    key: 'registerUser',
    value: function registerUser(profile) {
      var _this3 = this;

      this.error = null;
      profile = profile ? angular.copy(profile) : angular.copy(this.profile);
      var birthdate = void 0;
      if (profile.facebook_token) {
        this.fbRegister = true;
        profile.gender = profile.gender == 'male' ? 'Masculino' : 'Feminino';
        birthdate = profile.birthday.split('/');
        profile.birthdate = new Date(birthdate[2] + '-' + birthdate[0] + '-' + birthdate[1]);
      } else {
        birthdate = profile.birthdate.split('/');
        profile.birthdate = new Date(birthdate[2] + '-' + birthdate[1] + '-' + birthdate[0]);
      }
      if (!this.checkOfAge(profile.birthdate)) {
        this.error = {
          errors: {
            birthdate: ['Desculpe, não podemos aceitar usuários menores de idade.']
          }
        };
      } else {
        profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy');
        this.service.register(profile).then(function (response) {
          return _this3.registerSuccess(response);
        }, function (response) {
          return _this3.registerError(response);
        });
      }
    }
  }, {
    key: 'registerOng',
    value: function registerOng(profile) {
      var _this4 = this;

      this.error = null;
      profile = angular.copy(profile);
      if (profile.area_activity_uuid) {
        profile.area_activity_uuid = profile.area_activity_uuid.uuid;
      }
      profile = profile ? angular.copy(profile) : angular.copy(this.profile);
      profile.phone = profile.phone.replace(/\s/g, '');
      this.service.register(profile).then(function (response) {
        return _this4.registerSuccess(response);
      }, function (response) {
        return _this4.registerError(response);
      });
    }
  }, {
    key: 'registerSuccess',
    value: function registerSuccess(response) {
      if (this.fbRegister) {
        this.storage.setItem('token', response.data.token);
        var _response$data = response.data,
            name = _response$data.name,
            email = _response$data.email,
            type = _response$data.type,
            avatar = _response$data.avatar,
            permissions = _response$data.permissions;

        this.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar, permissions: permissions });
        this.$rootScope.$broadcast('profile.change');
        if (this.lastStateUnloggedService.getName()) {
          var _name = this.lastStateUnloggedService.getName();
          var params = this.lastStateUnloggedService.getParams();
          this.lastStateUnloggedService.clear();
          this.state.go(_name, params);
        } else {
          this.state.go('profile.user.events');
        }
      } else {
        this.state.go('profile.check');
      }
    }
  }, {
    key: 'registerError',
    value: function registerError(response) {
      this.error = response.data;
      console.error(JSON.stringify(response.data));
    }
  }]);

  return ProfileRegister;
}();

exports.default = ProfileRegister;


ProfileRegister.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$filter', '$timeout', 'ActivityAreaService', 'ProfileService', 'StorageService', 'LastStateUnloggedService'];

},{}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Unavailable = function () {
  function Unavailable($uibModalInstance) {
    _classCallCheck(this, Unavailable);

    this.instance = $uibModalInstance;
  }

  _createClass(Unavailable, [{
    key: 'cancel',
    value: function cancel() {
      this.instance.dismiss('cancel');
    }
  }]);

  return Unavailable;
}();

exports.default = Unavailable;


Unavailable.$inject = ['$uibModalInstance'];

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserConfigurations = function () {
  function UserConfigurations($filter, $rootScope, StorageService, ProfileService, ValidationFactory, profile) {
    _classCallCheck(this, UserConfigurations);

    this.filter = $filter;
    this.rootScope = $rootScope;
    this.storage = StorageService;
    this.service = ProfileService;
    this.validation = ValidationFactory;
    this.load(profile.data);
  }

  _createClass(UserConfigurations, [{
    key: 'load',
    value: function load(profile) {
      profile = angular.copy(profile);
      delete profile.avatar;
      profile.birthdate = new Date(profile.birthdate);
      profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy');
      // profile.needpassword = true
      this.profile = profile;
    }
  }, {
    key: 'validateDate',
    value: function validateDate(field, date) {
      date = date.split('/');
      date = new Date(date[2] + '-' + date[1] + '-' + date[0]);
      if (!field.$error.mask) {
        var valid = this.validation.dateMinByYears(date, 0) && this.validation.dateMaxByYears(date, 121);
        field.$setValidity('age', valid);
      }
    }
  }, {
    key: 'save',
    value: function save(profile) {
      var _this = this;

      this.service.change(profile, function (progress) {
        _this.progress = progress;
      }).then(function (response) {
        _this.storage.setItem('token', response.data.token);
        var _response$data = response.data,
            name = _response$data.name,
            email = _response$data.email,
            type = _response$data.type,
            avatar = _response$data.avatar,
            permissions = _response$data.permissions;

        _this.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar, permissions: permissions });
        _this.rootScope.$broadcast('profile.change');
        _this.profile = response.data;
        _this.load(_this.profile);
        _this.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: { message: 'Dados alterados com sucesso!' } });
      }, function (error) {
        _this.rootScope.$broadcast('alert', { type: 'alert-warning', icon: 'fa-exclamation', message: error.data });
      });
    }
  }]);

  return UserConfigurations;
}();

exports.default = UserConfigurations;


UserConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'ValidationFactory', 'profile'];

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserEvents = function () {
  function UserEvents($scope, $rootScope, ProfileService) {
    _classCallCheck(this, UserEvents);

    this.rootScope = $rootScope;
    this.service = ProfileService;
    this.rootScope.$broadcast('alert', { type: 'alert-info', icon: 'fa-info-circle', message: { message: 'Veja nosso <a href="https://drive.google.com/open?id=0B5mOKvkRV-iYMHZxX1pLdUMtcXM" target="_blank">KIT</a> para bombar suas campanhas!' } });
    this.pagination = { current_page: 1 };
    // this.pagination_closed = { current_page: 1 }
    this.getEvents();
    // this.getEventsClosed()
  }

  _createClass(UserEvents, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents({
        withoutReport: true,
        page: this.pagination.current_page
      }).then(function (response) {
        _this.pagination = response.data.meta.pagination;
        _this.events = response.data.values.map(function (event) {
          event.ends = new Date(event.ends);
          return event;
        });
      });
    }
  }, {
    key: 'changePage',
    value: function changePage() {
      this.getEvents();
    }
    // getEventsClosed() {
    //   this.service.getEvents({
    //     closed: true,
    //     page: this.pagination_closed.current_page
    //   }).then(response => {
    //     this.pagination_closed = response.data.meta.pagination
    //     this.events_closed = response.data.values.map(event => {
    //       event.ends = new Date(event.ends)
    //       return event
    //     })
    //   })
    // }
    // changePageClosed() {
    //   this.getEventsClosed()
    // }

  }]);

  return UserEvents;
}();

exports.default = UserEvents;


UserEvents.$inject = ['$scope', '$rootScope', 'ProfileService'];

},{}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserImpacts = function () {
  function UserImpacts($scope, ProfileService) {
    _classCallCheck(this, UserImpacts);

    this.service = ProfileService;
    this.pagination = { current_page: 1 };
    this.getEvents();
  }

  _createClass(UserImpacts, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents({
        withReport: true,
        page: this.pagination.current_page
      }).then(function (response) {
        _this.pagination = response.data.meta.pagination;
        _this.events = response.data.values.map(function (event) {
          event.ends = new Date(event.ends);
          return event;
        });
      });
    }
  }, {
    key: 'changePage',
    value: function changePage() {
      this.getEventsOpen();
    }
  }]);

  return UserImpacts;
}();

exports.default = UserImpacts;


UserImpacts.$inject = ['$scope', 'ProfileService'];

},{}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileUser = function () {
  function ProfileUser($scope, $rootScope, $window, $state, $timeout, StorageService, ProfileService, profile) {
    var _this = this;

    _classCallCheck(this, ProfileUser);

    this.service = ProfileService;
    this.profile = profile.data;
    this.rootScope = $rootScope;
    this.timeout = $timeout;
    $scope.$on('profile.change', function () {
      _this.profile = StorageService.getItem('profile');
    });
    // this.getEvents()
  }

  _createClass(ProfileUser, [{
    key: 'alert',
    value: function alert() {
      this.rootScope.$broadcast('alert', { type: 'alert-info', icon: 'fa-warning', message: 'mensagem' });
    }
    // getEvents() {
    //   this.service.getEvents()
    //     .then(
    //       response => {
    //         this.needReport = response.data.values.filter(event => {
    //           return (event.needReport == true)
    //         }).length
    //       }
    //     )
    // }

  }]);

  return ProfileUser;
}();

exports.default = ProfileUser;


ProfileUser.$inject = ['$scope', '$rootScope', '$window', '$state', '$timeout', 'StorageService', 'ProfileService', 'profile'];

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

var _register = require('./controller/register.js');

var _register2 = _interopRequireDefault(_register);

var _confirmation = require('./controller/confirmation.js');

var _confirmation2 = _interopRequireDefault(_confirmation);

var _user = require('./controller/user.js');

var _user2 = _interopRequireDefault(_user);

var _ong = require('./controller/ong.js');

var _ong2 = _interopRequireDefault(_ong);

var _unavailable = require('./controller/unavailable.js');

var _unavailable2 = _interopRequireDefault(_unavailable);

var _eventDonors = require('./controller/event.donors.js');

var _eventDonors2 = _interopRequireDefault(_eventDonors);

var _userConfigurations = require('./controller/user.configurations.js');

var _userConfigurations2 = _interopRequireDefault(_userConfigurations);

var _ongConfigurations = require('./controller/ong.configurations.js');

var _ongConfigurations2 = _interopRequireDefault(_ongConfigurations);

var _userEvents = require('./controller/user.events.js');

var _userEvents2 = _interopRequireDefault(_userEvents);

var _userImpacts = require('./controller/user.impacts.js');

var _userImpacts2 = _interopRequireDefault(_userImpacts);

var _ongEvents = require('./controller/ong.events.js');

var _ongEvents2 = _interopRequireDefault(_ongEvents);

var _ongPage = require('./controller/ong.page.js');

var _ongPage2 = _interopRequireDefault(_ongPage);

var _ongReport = require('./controller/ong.report.js');

var _ongReport2 = _interopRequireDefault(_ongReport);

var _ongHistory = require('./controller/ong.history.js');

var _ongHistory2 = _interopRequireDefault(_ongHistory);

var _change = require('./controller/change.js');

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('profile', []).config(_config2.default).service('ProfileService', _service2.default).controller('ProfileRegister', _register2.default).controller('ProfileConfirmation', _confirmation2.default).controller('ProfileUser', _user2.default).controller('ProfileOng', _ong2.default).controller('EventDonors', _eventDonors2.default).controller('UserConfigurations', _userConfigurations2.default).controller('OngConfigurations', _ongConfigurations2.default).controller('UserEvents', _userEvents2.default).controller('UserImpacts', _userImpacts2.default).controller('OngEvents', _ongEvents2.default).controller('OngPage', _ongPage2.default).controller('OngReport', _ongReport2.default).controller('OngHistory', _ongHistory2.default).controller('ProfileChange', _change2.default).controller('Unavailable', _unavailable2.default);

},{"./config.js":83,"./controller/change.js":84,"./controller/confirmation.js":85,"./controller/event.donors.js":86,"./controller/ong.configurations.js":87,"./controller/ong.events.js":88,"./controller/ong.history.js":89,"./controller/ong.js":90,"./controller/ong.page.js":91,"./controller/ong.report.js":92,"./controller/register.js":93,"./controller/unavailable.js":94,"./controller/user.configurations.js":95,"./controller/user.events.js":96,"./controller/user.impacts.js":97,"./controller/user.js":98,"./service.js":100}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileService = function (_CommonService) {
  _inherits(ProfileService, _CommonService);

  function ProfileService($http, FacebookService, envService) {
    _classCallCheck(this, ProfileService);

    var _this = _possibleConstructorReturn(this, (ProfileService.__proto__ || Object.getPrototypeOf(ProfileService)).call(this, $http, envService));

    _this.http = $http;
    _this.facebookService = FacebookService;
    return _this;
  }

  _createClass(ProfileService, [{
    key: 'register',
    value: function register(data) {
      data = this.setDataToken(data);
      this.setRoute('users');
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'confirmation',
    value: function confirmation(data) {
      this.setRoute('users/confirmation/' + data.uuid + '/' + data.confirmation_code);
      return this.$http.put(this.url + this.route);
    }
  }, {
    key: 'me',
    value: function me() {
      this.setRoute('users/me');
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'getEvents',
    value: function getEvents(params) {
      _get(ProfileService.prototype.__proto__ || Object.getPrototypeOf(ProfileService.prototype), 'setRoute', this).call(this, 'users/me/events');
      if (params != undefined) {
        _get(ProfileService.prototype.__proto__ || Object.getPrototypeOf(ProfileService.prototype), 'setParams', this).call(this, params);
      }
      return _get(ProfileService.prototype.__proto__ || Object.getPrototypeOf(ProfileService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'getEventPayments',
    value: function getEventPayments(uuid, params) {
      _get(ProfileService.prototype.__proto__ || Object.getPrototypeOf(ProfileService.prototype), 'setRoute', this).call(this, 'users/me/events/' + uuid + '/payments');
      if (params != undefined) {
        _get(ProfileService.prototype.__proto__ || Object.getPrototypeOf(ProfileService.prototype), 'setParams', this).call(this, params);
      }
      return _get(ProfileService.prototype.__proto__ || Object.getPrototypeOf(ProfileService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'change',
    value: function change(data, _progress) {
      var fd = new FormData();
      angular.forEach(data, function (value, key) {
        fd.append(key, value);
      });
      this.setRoute('users/me');
      return this.http({
        method: 'POST',
        url: this.url + this.route,
        data: fd,
        headers: { 'Content-Type': undefined },
        uploadEventHandlers: {
          progress: function progress(e) {
            return _progress(e);
          }
        }
      });
    }
  }, {
    key: 'registerFacebook',
    value: function registerFacebook(callback) {
      return this.facebookService.auth(callback);
    }
  }, {
    key: 'logoutFacebook',
    value: function logoutFacebook(callback) {
      return this.facebookService.logout(callback);
    }
  }]);

  return ProfileService;
}(_common2.default);

exports.default = ProfileService;


ProfileService.$inject = ['$http', 'FacebookService', 'envService'];

},{"./../common/service/common.js":39}]},{},[1]);
