(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _module = require('./src/app/module.js');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.bootstrap(document, ['app']);

},{"./src/app/module.js":6,"angular":"angular"}],2:[function(require,module,exports){
module.exports={
  "url": "https://dev.eventosdobem.com/api/",
  "accept": "application/vnd.api.v1+json",
  "contenttype": "application/json",
  "token": "0IphXRqJZe9wkMYQJJBp2X0TsVjQyg"
}
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppConfig;
function AppConfig($httpProvider, $injector, $urlRouterProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
  $urlRouterProvider.otherwise('/#');
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function AppController($location, $window, API, FacebookFactory) {
  _classCallCheck(this, AppController);

  FacebookFactory.init({
    appId: '922781867788493'
  });
  // switch($location.path()) {
  //   case '/usuario/cadastro': {
  //     this.background = 'auth-login.jpg'
  //   }
  // }
  // this.brand = 'Eventos do Bem'
  // this.logout = () => {
  //   $window.localStorage.clear()
  //   $state.go('auth-login')
  // }
  // this.user = JSON.parse($window.localStorage.getItem('user'))
  // this.dropDownMenu = [
  //   {
  //     label: 'Perfil',
  //     url: 'user-me'
  //   },
  //   {
  //     label: 'Logout',
  //     url: 'auth-logout'
  //   }
  // ]
  // this.toggleDropdown = function($event) {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.status.isopen = !this.status.isopen;
  // };
};

exports.default = AppController;


AppController.$inject = ['$location', '$window', 'API', 'FacebookFactory'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function config(API, $q, $window, $injector) {
  return {
    'request': function request(config) {
      config.headers = config.headers || {};
      config['headers']['Accept'] = API.accept;
      config['headers']['Content-Type'] = API.contenttype;
      if ($window.localStorage.getItem('token')) {
        config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token');
      }
      return config || $q.when(config);
    },
    'requestError': function requestError(rejection) {
      return $q.reject(rejection);
    },
    'response': function response(_response) {
      return $q.resolve(_response);
    },
    'responseError': function responseError(response) {
      if (response.status === 401) {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
        $injector.get('$state').transitionTo('auth.login');
      }
      return $q.reject(response);
    }
  };
}
exports.default = config;

},{}],6:[function(require,module,exports){
'use strict';

var _angularUiRouter = require('angular-ui-router');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularUiBootstrap = require('angular-ui-bootstrap');

var _angularUiBootstrap2 = _interopRequireDefault(_angularUiBootstrap);

var _ngMask = require('ng-mask');

var _ngMask2 = _interopRequireDefault(_ngMask);

var _angularMessages = require('angular-messages');

var _angularMessages2 = _interopRequireDefault(_angularMessages);

var _api = require('./api.json');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _interceptor = require('./interceptor.js');

var _interceptor2 = _interopRequireDefault(_interceptor);

var _run = require('./run.js');

var _run2 = _interopRequireDefault(_run);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

var _module = require('./../common/module.js');

var _module2 = _interopRequireDefault(_module);

var _module3 = require('./../home/module.js');

var _module4 = _interopRequireDefault(_module3);

var _module5 = require('./../faq/module.js');

var _module6 = _interopRequireDefault(_module5);

var _module7 = require('./../event/module.js');

var _module8 = _interopRequireDefault(_module7);

var _module9 = require('./../auth/module.js');

var _module10 = _interopRequireDefault(_module9);

var _module11 = require('./../user/module.js');

var _module12 = _interopRequireDefault(_module11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ui.bootstrap', 'ngMask', _angularUiRouter2.default, 'ngMessages', 'common', 'home', 'faq', 'event', 'auth', 'user']).config(_config2.default).constant('API', _api2.default).factory('HttpInterceptor', _interceptor2.default).controller('AppController', _controller2.default).run(_run2.default);

},{"./../auth/module.js":11,"./../common/module.js":15,"./../event/module.js":22,"./../faq/module.js":26,"./../home/module.js":30,"./../user/module.js":37,"./api.json":2,"./config.js":3,"./controller.js":4,"./interceptor.js":5,"./run.js":7,"angular-messages":"angular-messages","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router","ng-mask":"ng-mask"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;
function run($rootScope, $window, $state) {
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !$window.localStorage.getItem('token')) {
      $state.go('auth.login');
    }
    switch (toState.name) {
      case 'user.register':
        $rootScope.background = 'auth-login';break;
      case 'auth.login':
        $rootScope.background = 'auth-login';break;
      default:
        $rootScope.background = null;
    }
  });
}

},{}],8:[function(require,module,exports){
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
    templateUrl: './src/auth/view/login.html',
    controller: 'AuthLogin',
    controllerAs: 'ctrl'
  }).state('auth.logout', {
    url: '/logout',
    templateUrl: './src/auth/view/logout.html',
    controller: 'AuthLogout',
    controllerAs: 'ctrl'
  });
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthLogin = function () {
  function AuthLogin($rootScope, $stateParams, $state, $q, $window, AuthService, StorageService) {
    _classCallCheck(this, AuthLogin);

    this.service = AuthService;
    this.storage = StorageService;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.user = {
      rememberme: true
    };
    this.showPassword = false;
    this.typeInputPassword = 'password';
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
    key: 'login',
    value: function login(user) {
      var _this2 = this;

      user = user ? angular.copy(user) : angular.copy(this.user);
      this.$window.localStorage.setItem('rememberme', user.rememberme);
      this.service.login(user).then(function (response) {
        return _this2.loginSuccess(response);
      }, function (response) {
        return _this2.loginError(response);
      });
    }
  }, {
    key: 'loginSuccess',
    value: function loginSuccess(response) {
      this.$window.localStorage.setItem('token', response.data.token);
      var _response$data = response.data;
      var email = _response$data.email;
      var name = _response$data.name;

      this.$window.localStorage.setItem('user', JSON.stringify({ name: name, email: email }));
      this.$rootScope.$broadcast('auth.login');
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


AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$q', '$window', 'AuthService', 'StorageService'];

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
        _this.$window.localStorage.removeItem('rememberme');
        _this.$window.localStorage.removeItem('token');
        _this.$window.localStorage.removeItem('user');
        _this.$rootScope.$broadcast('auth.logout');
      }, function (error) {
        console.error('error', error);
        _this.$window.localStorage.removeItem('rememberme');
        _this.$window.localStorage.removeItem('token');
        _this.$window.localStorage.removeItem('user');
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

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _login = require('./controller/login.js');

var _login2 = _interopRequireDefault(_login);

var _logout = require('./controller/logout.js');

var _logout2 = _interopRequireDefault(_logout);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('auth', []).config(_config2.default).controller('AuthLogin', _login2.default).controller('AuthLogout', _logout2.default).service('AuthService', _service2.default);

},{"./config.js":8,"./controller/login.js":9,"./controller/logout.js":10,"./service.js":12}],12:[function(require,module,exports){
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

  function AuthService(API, $http, FacebookService) {
    _classCallCheck(this, AuthService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AuthService).call(this, API, $http));

    _this.facebookService = FacebookService;
    return _this;
  }

  _createClass(AuthService, [{
    key: 'login',
    value: function login(data) {
      data = this.setDataToken(data);
      this.setRoute('auth/login');
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
  }]);

  return AuthService;
}(_common2.default);

exports.default = AuthService;


AuthService.$inject = ['API', '$http', 'FacebookService'];

},{"./../common/service/common.js":16}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function Header($scope, $state, $window, StorageService) {
  var _this = this;

  _classCallCheck(this, Header);

  this.brand = 'Eventos do Bem';
  this.user = JSON.parse($window.localStorage.getItem('user'));
  $scope.$on('auth.login', function () {
    _this.user = JSON.parse($window.localStorage.getItem('user'));
    $state.go('user.me');
  });
  $scope.$on('auth.logout', function () {
    _this.user = null;
  });
  this.dropDownMenu = {
    logged: [{
      label: 'Perfil',
      url: 'user.me'
    }, {
      label: 'Logout',
      url: 'auth.logout'
    }],
    nologged: [{
      label: 'Entrar',
      url: 'auth.login'
    }, {
      label: 'Cadastrar',
      url: 'user.register'
    }]
  };
  this.toggleDropdown = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  };
};

exports.default = Header;


Header.$inject = ['$scope', '$state', '$window', 'StorageService'];

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./service/common.js');

var _common2 = _interopRequireDefault(_common);

var _facebook = require('./factory/facebook.js');

var _facebook2 = _interopRequireDefault(_facebook);

var _facebook3 = require('./service/facebook.js');

var _facebook4 = _interopRequireDefault(_facebook3);

var _header = require('./controller/header.js');

var _header2 = _interopRequireDefault(_header);

var _storage = require('./service/storage.js');

var _storage2 = _interopRequireDefault(_storage);

var _hydrator = require('./service/hydrator.js');

var _hydrator2 = _interopRequireDefault(_hydrator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('common', []).service('CommonService', _common2.default).factory('FacebookFactory', _facebook2.default.facebookFactory).service('FacebookService', _facebook4.default).service('StorageService', _storage2.default).service('Hydrator', _hydrator2.default).controller('Header', _header2.default);

},{"./controller/header.js":13,"./factory/facebook.js":14,"./service/common.js":16,"./service/facebook.js":17,"./service/hydrator.js":18,"./service/storage.js":19}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonService = function () {
  function CommonService(API, $http) {
    _classCallCheck(this, CommonService);

    this.url = API.url;
    this.token = API.token;
    this.$http = $http;
  }

  _createClass(CommonService, [{
    key: 'setDataToken',
    value: function setDataToken(data) {
      data['token'] = this.token;
      return data;
    }
  }, {
    key: 'setRoute',
    value: function setRoute(route) {
      this.route = route;
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      return this.$http.get(this.url + this.route + '/' + id);
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this.$http.put(this.url + this.route + '/' + data._id, data);
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      return this.$http.delete(this.url + this.route + '/' + id);
    }
  }]);

  return CommonService;
}();

exports.default = CommonService;

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
    this.storage = undefined;
  }

  _createClass(StorageService, [{
    key: 'setItem',
    value: function setItem(key, data) {
      this.$window[this.storage].setItem(key, data);
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      return this.$window[this.storage].getItem(key);
    }
  }, {
    key: 'setStorage',
    value: function setStorage(storage) {
      this.storage = storage;
    }
  }, {
    key: 'getStorage',
    value: function getStorage() {
      return this.storage;
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

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EventConfig;
function EventConfig($stateProvider) {
  $stateProvider.state('start', {
    url: '/evento/comecar',
    authenticate: true,
    templateUrl: './src/event/view/start.html',
    controller: 'EventStart',
    controllerAs: 'ctrl'
  });
}

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventStart = function () {
  function EventStart($state, $window, $stateParams, EventService) {
    _classCallCheck(this, EventStart);

    this.$state = $state;
    this.window = $window;
    this.service = EventService;
  }

  _createClass(EventStart, [{
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
      this.event = JSON.parse(draft);
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


EventStart.$inject = ['$state', '$window', '$stateParams', 'EventService'];

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

var _eventStart = require('./controller/event.start.js');

var _eventStart2 = _interopRequireDefault(_eventStart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('event', []).config(_config2.default).controller('EventStart', _eventStart2.default).service('EventService', _service2.default);

},{"./config.js":20,"./controller/event.start.js":21,"./service.js":23}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventService = function EventService(API, $http, $q) {
  _classCallCheck(this, EventService);

  this.$q = $q;
};

exports.default = EventService;


EventService.$inject = ['API', '$http', '$q'];

},{"./../common/service/common.js":16}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FaqConfig;
function FaqConfig($stateProvider) {
  $stateProvider.state('faq', {
    // abstract: true,
    url: '/perguntas-frequentes',
    templateUrl: './src/faq/view/faq.html',
    controller: 'Faq',
    controllerAs: 'ctrl'
  }).state('faq.category', {
    url: '/category/:categoryId',
    templateUrl: './src/faq/view/faq.category.html',
    controller: 'Faq',
    controllerAs: 'ctrl'
  }).state('faq.question', {
    url: '/question/:questionId',
    templateUrl: './src/faq/view/faq.question.html',
    controller: 'Faq',
    controllerAs: 'ctrl'
  });
}

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Faq = function Faq($state, $stateParams, FaqService) {
  var _this = this;

  _classCallCheck(this, Faq);

  this.$state = $state;
  this.faqService = FaqService;
  this.faqService.getCategories().then(function (response) {
    return _this.categories = response;
  });
  if ($stateParams.categoryId) {
    this.faqService.getCategory($stateParams.categoryId).then(function (response) {
      return _this.category = response;
    });
  } else if ($stateParams.questionId) {
    this.faqService.getQuestion($stateParams.questionId).then(function (response) {
      return _this.question = response;
    });
  } else {
    $state.go('faq.category', { categoryId: 1 });
  }
};

exports.default = Faq;


Faq.$inject = ['$state', '$stateParams', 'FaqService'];

},{}],26:[function(require,module,exports){
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

},{"./config.js":24,"./controller/faq.js":25,"./service.js":27}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./../common/service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FaqService = function () {
  function FaqService(API, $http, $q) {
    _classCallCheck(this, FaqService);

    this.$q = $q;
    this.categories = [{
      id: 1,
      name: 'Criadores de campanhas',
      questions: [{
        id: 1,
        title: 'Question 1',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 2,
        title: 'Question 2',
        question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
      }]
    }, {
      id: 2,
      name: 'Apoiadores',
      questions: [{
        id: 3,
        title: 'Question 3',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 4,
        title: 'Question 4',
        question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
      }]
    }, {
      id: 3,
      name: 'Sobre a plataforma',
      questions: [{
        id: 5,
        title: 'Question 5',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 6,
        title: 'Question 6',
        question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
      }]
    }];
  }

  _createClass(FaqService, [{
    key: 'getCategories',
    value: function getCategories() {
      var deferred = this.$q.defer();
      deferred.resolve(this.categories);
      return deferred.promise;
    }
  }, {
    key: 'getCategory',
    value: function getCategory(id) {
      var deferred = this.$q.defer();
      var category = this.categories.filter(function (value) {
        return value.id == id;
      });
      deferred.resolve(category[0]);
      return deferred.promise;
    }
  }, {
    key: 'getQuestion',
    value: function getQuestion(id) {
      var deferred = this.$q.defer();
      var category = this.categories.map(function (category) {
        return category.questions.filter(function (question) {
          return question.id == id;
        });
      }).filter(function (category) {
        return category.length > 0;
      });
      deferred.resolve(category[0][0]);
      return deferred.promise;
    }
  }]);

  return FaqService;
}();

exports.default = FaqService;


FaqService.$inject = ['API', '$http', '$q'];

},{"./../common/service/common.js":16}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HomeConfig;
function HomeConfig($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './src/home/view/home.html',
    controller: 'Home',
    controllerAs: 'ctrl'
  });
}

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Home = function Home($scope, $stateParams, $state) {
  _classCallCheck(this, Home);
};

exports.default = Home;


Home.$inject = ['$scope', '$stateParams', '$state'];

},{}],30:[function(require,module,exports){
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

},{"./config.js":28,"./controller/home.js":29}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserConfig;
function UserConfig($stateProvider) {
  $stateProvider.state('user', {
    url: '/usuario',
    templateUrl: './src/user/view/user.html'
  }).state('user.me', {
    url: '/eu',
    authenticate: true,
    templateUrl: './src/user/view/me.html',
    controller: 'UserMe',
    controllerAs: 'ctrl',
    resolve: {
      me: function me(UserService) {
        return UserService.me();
      }
    }
  }).state('user.me.configurations', {
    url: '/eu/configuracoes',
    authenticate: true,
    templateUrl: './src/user/view/me.configurations.html',
    controller: 'UserMeConfigurations',
    controllerAs: 'ctrl',
    resolve: {
      user: function user(UserService) {
        return UserService.me();
      }
    }
  }).state('user.register', {
    url: '/cadastro',
    templateUrl: './src/user/view/register.html',
    controller: 'UserRegister',
    controllerAs: 'ctrl'
  }).state('user.confirmation', {
    url: '/confirmacao/:uuid/:confirmation_code',
    templateUrl: './src/user/view/confirmation.html',
    controller: 'UserConfirmation',
    controllerAs: 'ctrl'
  }).state('user.change', {
    url: '/eu/alterar',
    templateUrl: './src/user/view/change.html',
    controller: 'UserChange',
    controllerAs: 'ctrl'
  });
}

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserChange = function () {
  function UserChange($scope, $stateParams, $state, $filter, UserService) {
    var _this = this;

    _classCallCheck(this, UserChange);

    this.filter = $filter;
    this.service = UserService;
    this.me = function () {
      UserService.me().then(function (response) {
        console.log(response);
        _this.me = response.data;
        _this.user = response.data;
      }, function (error) {
        console.error('error: ', error);
      });
    };
  }

  _createClass(UserChange, [{
    key: 'change',
    value: function change(user) {
      birthdate = user.birthdate.split('/');
      user.birthdate = new Date(birthdate[2] + '-' + birthdate[1] + '-' + birthdate[0]);
      user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'yyyy-MM-dd');
      this.service.change(user).then(function (response) {
        console.log(response);
      });
    }
  }]);

  return UserChange;
}();

exports.default = UserChange;


UserChange.$inject = ['$scope', '$stateParams', '$state', '$filter', 'UserService'];

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthConfirmation = function AuthConfirmation($rootScope, $stateParams, $state, $window, AuthService) {
  var _this = this;

  _classCallCheck(this, AuthConfirmation);

  this.user = {
    uuid: $stateParams.uuid,
    confirmation_code: $stateParams.confirmation_code
  };
  this.confirmation = function () {
    console.log(_this.user);
    // AuthService.confirmation(this.user)
    //   .then(
    //     response => {
    //       $window.localStorage.setItem('token', response.data.token)
    //       delete response.data.token
    //       $window.localStorage.setItem('user', JSON.stringify(response.data))
    //       $rootScope.$broadcast('auth.login')
    //     },
    //     error => {
    //       this.error = error.data
    //       console.log('error', error)
    //     }
    //   )
  };
};

exports.default = AuthConfirmation;


AuthConfirmation.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService'];

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserMeConfigurations = function () {
  function UserMeConfigurations($filter, UserService, user) {
    _classCallCheck(this, UserMeConfigurations);

    this.filter = $filter;
    this.service = UserService;
    this.user = user.data;
  }

  _createClass(UserMeConfigurations, [{
    key: 'save',
    value: function save(user) {
      user = angular.copy(user);
      birthdate = user.birthdate.split('/');
      user.birthdate = new Date(birthdate[2] + '-' + birthdate[1] + '-' + birthdate[0]);
      user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'yyyy-MM-dd');
      this.service.change(user).then(function (response) {
        console.log(response);
      });
    }
  }]);

  return UserMeConfigurations;
}();

exports.default = UserMeConfigurations;


UserMeConfigurations.$inject = ['$filter', 'UserService', 'user'];

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserMe = function UserMe($scope, $stateParams, $state, UserService, me) {
  _classCallCheck(this, UserMe);

  console.log(me);
  this.me = me.data;
  // this.me = () => {
  //   UserService.me()
  //     .then(
  //       response => {
  //         this.me = response.data
  //       },
  //       error => {
  //         console.error('error: ',error)
  //       })
  // }
};

exports.default = UserMe;


UserMe.$inject = ['$scope', '$stateParams', '$state', 'UserService', 'me'];

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRegister = function () {
  function UserRegister($scope, $stateParams, $state, $filter, Hydrator, UserService) {
    _classCallCheck(this, UserRegister);

    this.service = UserService;
    this.hydrator = Hydrator;
    this.state = $state;
    this.filter = $filter;
    this.user = {
      gender: 'Feminino'
    };
    this.showPassword = false;
    this.typeInputPassword = 'password';
  }

  _createClass(UserRegister, [{
    key: 'toggleShowPassword',
    value: function toggleShowPassword() {
      this.typeInputPassword = this.showPassword ? 'text' : 'password';
    }
  }, {
    key: 'registerFacebook',
    value: function registerFacebook() {
      var _this = this;

      this.service.registerFacebook(function (response) {
        _this.register(response);
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
    key: 'register',
    value: function register(user) {
      var _this2 = this;

      user = user ? angular.copy(user) : angular.copy(this.user);
      var birthdate = void 0;
      if (user.facebook_token) {
        user.gender = user.gender == 'male' ? 'Masculino' : 'Feminino';
        birthdate = user.birthday.split('/');
        user.birthdate = new Date(birthdate[2] + '-' + birthdate[0] + '-' + birthdate[1]);
      } else {
        birthdate = user.birthdate.split('/');
        user.birthdate = new Date(birthdate[2] + '-' + birthdate[1] + '-' + birthdate[0]);
      }
      if (!this.checkOfAge(user.birthdate)) {
        this.error = {
          errors: {
            birthdate: ['Desculpe, não podemos aceitar usuários menores de idade.']
          }
        };
      } else {
        user.birthdate = this.filter('date')(user.birthdate.setDate(user.birthdate.getDate() + 1), 'yyyy-MM-dd');
        this.service.register(user).then(function (response) {
          return _this2.registerSuccess(response);
        }, function (response) {
          return _this2.registerError(response);
        });
      }
    }
  }, {
    key: 'registerSuccess',
    value: function registerSuccess(response) {
      console.log(response);
    }
  }, {
    key: 'registerError',
    value: function registerError(response) {
      this.error = response.data;
      console.error(response);
    }
  }]);

  return UserRegister;
}();

exports.default = UserRegister;


UserRegister.$inject = ['$scope', '$stateParams', '$state', '$filter', 'Hydrator', 'UserService'];

},{}],37:[function(require,module,exports){
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

var _me = require('./controller/me.js');

var _me2 = _interopRequireDefault(_me);

var _meConfigurations = require('./controller/me.configurations.js');

var _meConfigurations2 = _interopRequireDefault(_meConfigurations);

var _change = require('./controller/change.js');

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('user', []).config(_config2.default).controller('UserMe', _me2.default).controller('UserMeConfigurations', _meConfigurations2.default).controller('UserChange', _change2.default).controller('UserConfirmation', _confirmation2.default).controller('UserRegister', _register2.default).service('UserService', _service2.default);

},{"./config.js":31,"./controller/change.js":32,"./controller/confirmation.js":33,"./controller/me.configurations.js":34,"./controller/me.js":35,"./controller/register.js":36,"./service.js":38}],38:[function(require,module,exports){
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

var UserService = function (_CommonService) {
  _inherits(UserService, _CommonService);

  function UserService(API, $http, FacebookService) {
    _classCallCheck(this, UserService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserService).call(this, API, $http));

    _this.facebookService = FacebookService;
    return _this;
  }

  _createClass(UserService, [{
    key: 'register',
    value: function register(data) {
      data = this.setDataToken(data);
      this.setRoute('users');
      return this.$http.post(this.url + this.route, data);
    }
  }, {
    key: 'me',
    value: function me() {
      this.setRoute('users/me');
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'change',
    value: function change(data) {
      this.setRoute('users/me');
      return this.$http.post(this.url + this.route, data);
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

  return UserService;
}(_common2.default);

exports.default = UserService;


UserService.$inject = ['API', '$http', 'FacebookService'];

},{"./../common/service/common.js":16}]},{},[1]);
