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
    appId: '922781867788493',
    // appId: '1151546794911998',
    xfbml: true
  });
  // console.log(FacebookFactory.ui)
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
function config(API, $q, $window, $rootScope, $injector) {
  return {
    'request': function request(config) {
      if (config.url.indexOf('.html') === -1) $rootScope.loading = true;
      config.headers = config.headers || {};
      config['headers']['Accept'] = API.accept;
      config['headers']['Content-Type'] = API.contenttype;
      // console.log($window.localStorage.getItem('token'))
      if (!config.headers.token) {
        if ($window.localStorage.getItem('token')) {
          config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token');
        }
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

var _angularSanitize = require('angular-sanitize');

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

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

var _loading = require('./../common/component/loading/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _alert = require('./../common/component/alert/alert.js');

var _alert2 = _interopRequireDefault(_alert);

var _countdown = require('./../common/component/countdown/countdown.js');

var _countdown2 = _interopRequireDefault(_countdown);

var _module3 = require('./../home/module.js');

var _module4 = _interopRequireDefault(_module3);

var _module5 = require('./../pages/module.js');

var _module6 = _interopRequireDefault(_module5);

var _module7 = require('./../faq/module.js');

var _module8 = _interopRequireDefault(_module7);

var _module9 = require('./../event/module.js');

var _module10 = _interopRequireDefault(_module9);

var _module11 = require('./../auth/module.js');

var _module12 = _interopRequireDefault(_module11);

var _module13 = require('./../profile/module.js');

var _module14 = _interopRequireDefault(_module13);

var _module15 = require('./../institution/module.js');

var _module16 = _interopRequireDefault(_module15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ui.bootstrap', 'ngMask', _angularUiRouter2.default, 'ngMessages', 'ngSanitize', 'common', 'loading', 'alert', 'countdown', 'home', 'pages', 'faq', 'event', 'auth', 'profile', 'institution']).config(_config2.default).constant('API', _api2.default).factory('HttpInterceptor', _interceptor2.default).controller('AppController', _controller2.default).run(_run2.default);

},{"./../auth/module.js":11,"./../common/component/alert/alert.js":13,"./../common/component/countdown/countdown.js":16,"./../common/component/loading/loading.js":18,"./../common/module.js":23,"./../event/module.js":37,"./../faq/module.js":41,"./../home/module.js":45,"./../institution/module.js":47,"./../pages/module.js":55,"./../profile/module.js":70,"./api.json":2,"./config.js":3,"./controller.js":4,"./interceptor.js":5,"./run.js":7,"angular-messages":"angular-messages","angular-sanitize":"angular-sanitize","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router","ng-mask":"ng-mask"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;
function run($rootScope, $window, $state, $anchorScroll) {
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    $rootScope.$broadcast('alert-clear');
    if (toState.authenticate && !$window.localStorage.getItem('token')) {
      $state.go('auth.login');
    }
    switch (toState.name) {
      case 'profile.register':
        $rootScope.background = 'auth-login';break;
      case 'auth.login':
        $rootScope.background = 'auth-login';break;
      default:
        $rootScope.background = null;
    }
    $anchorScroll();
  });
}

run.$inject = ['$rootScope', '$window', '$state', '$anchorScroll'];

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
    this.state = $state;
    this.$window = $window;
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
        return _this2.loginError(response);
      });
    }
  }, {
    key: 'loginSuccess',
    value: function loginSuccess(response) {
      this.storage.setItem('token', response.data.token);
      var _response$data = response.data;
      var name = _response$data.name;
      var email = _response$data.email;
      var type = _response$data.type;

      this.storage.setItem('profile', { name: name, email: email, type: type });
      this.$rootScope.$broadcast('profile.change');
      switch (type) {
        case 'user':
          this.state.go('profile.user');break;
        case 'ong':
          this.state.go('profile.ong');break;
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
        _this.$rootScope.$broadcast('auth.logout');
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
  }]);

  return AuthService;
}(_common2.default);

exports.default = AuthService;


AuthService.$inject = ['API', '$http', 'FacebookService'];

},{"./../common/service/common.js":27}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('alert', []).component('alert', _component2.default);

},{"./component.js":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  bindings: {
    show: '=?',
    type: '=?',
    icon: '=?',
    message: '=?'
  },
  template: '\n    <p data-ng-repeat="alert in $ctrl.alerts" class="alert alert-dismissible" data-ng-class="[alert.type]" data-ng-show="$ctrl.show" role="alert">\n      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n      <i class="fa" data-ng-class="[alert.icon]"></i>\n      <span data-ng-bind-html="alert.message"></span>\n    </p>\n  ',
  controller: function controller($scope) {
    var ctrl = this;
    $scope.$on('alert', function (event, args) {
      ctrl.alerts.push(args);
      // ctrl.type = args.type
      // ctrl.icon = args.icon
      // ctrl.message = args.message
      ctrl.show = true;
    });
    $scope.$on('alert-clear', function (event) {
      ctrl.alerts = [];
    });
    ctrl.$onInit = function () {
      ctrl.alerts = [];
      ctrl.show = false;
    };
  }
};

exports.default = Component;

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('countdown', []).component('countDownElement', _component2.default);

},{"./component.js":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Component = {
  restrict: 'E',
  bindings: {
    show: '='
  },
  template: '\n  <div class="loading" data-ng-show="$ctrl.show">\n    <img src="assets/gifs/loading-evb.gif" />\n  </div>\n  '
};

exports.default = Component;

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('loading', []).component('loading', _component2.default);

},{"./component.js":17}],19:[function(require,module,exports){
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
            item.url = 'profile.user';break;
          case 'ong':
            item.url = 'profile.ong';break;
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./service/common.js');

var _common2 = _interopRequireDefault(_common);

var _city = require('./service/city.js');

var _city2 = _interopRequireDefault(_city);

var _category = require('./service/category.js');

var _category2 = _interopRequireDefault(_category);

var _activityArea = require('./service/activityArea.js');

var _activityArea2 = _interopRequireDefault(_activityArea);

var _facebook = require('./factory/facebook.js');

var _facebook2 = _interopRequireDefault(_facebook);

var _facebook3 = require('./service/facebook.js');

var _facebook4 = _interopRequireDefault(_facebook3);

var _creditcard = require('./factory/creditcard.js');

var _creditcard2 = _interopRequireDefault(_creditcard);

var _fixedOnScroll = require('./directive/fixedOnScroll.js');

var _fixedOnScroll2 = _interopRequireDefault(_fixedOnScroll);

var _header = require('./controller/header.js');

var _header2 = _interopRequireDefault(_header);

var _storage = require('./service/storage.js');

var _storage2 = _interopRequireDefault(_storage);

var _hydrator = require('./service/hydrator.js');

var _hydrator2 = _interopRequireDefault(_hydrator);

var _notification = require('./service/notification.js');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('common', []).service('CommonService', _common2.default).service('CityService', _city2.default).service('CategoryService', _category2.default).service('ActivityAreaService', _activityArea2.default).factory('FacebookFactory', _facebook2.default.facebookFactory).factory('CreditCardFactory', _creditcard2.default.creditCardFactory).service('FacebookService', _facebook4.default).service('StorageService', _storage2.default).service('Hydrator', _hydrator2.default).service('NotificationService', _notification2.default).controller('Header', _header2.default).directive('fixedOnScroll', _fixedOnScroll2.default.directiveFactory);

},{"./controller/header.js":19,"./directive/fixedOnScroll.js":20,"./factory/creditcard.js":21,"./factory/facebook.js":22,"./service/activityArea.js":24,"./service/category.js":25,"./service/city.js":26,"./service/common.js":27,"./service/facebook.js":28,"./service/hydrator.js":29,"./service/notification.js":30,"./service/storage.js":31}],24:[function(require,module,exports){
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

  function ActivityAreaService(API, $http) {
    _classCallCheck(this, ActivityAreaService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityAreaService).call(this, API, $http));

    _this.setRoute('activityAreas');
    return _this;
  }

  _createClass(ActivityAreaService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(Object.getPrototypeOf(ActivityAreaService.prototype), 'findAll', this).call(this);
    }
  }]);

  return ActivityAreaService;
}(_common2.default);

exports.default = ActivityAreaService;


ActivityAreaService.$inject = ['API', '$http'];

},{"./common.js":27}],25:[function(require,module,exports){
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

  function CategoryService(API, $http) {
    _classCallCheck(this, CategoryService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CategoryService).call(this, API, $http));

    _this.setRoute('categories');
    return _this;
  }

  _createClass(CategoryService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(Object.getPrototypeOf(CategoryService.prototype), 'findAll', this).call(this);
    }
  }]);

  return CategoryService;
}(_common2.default);

exports.default = CategoryService;


CategoryService.$inject = ['API', '$http'];

},{"./common.js":27}],26:[function(require,module,exports){
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

  function CityService(API, $http) {
    _classCallCheck(this, CityService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CityService).call(this, API, $http));

    _this.setRoute('cities');
    return _this;
  }

  _createClass(CityService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(Object.getPrototypeOf(CityService.prototype), 'findAll', this).call(this);
    }
  }]);

  return CityService;
}(_common2.default);

exports.default = CityService;


CityService.$inject = ['API', '$http'];

},{"./common.js":27}],27:[function(require,module,exports){
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
    this.config = {};
    this.$http = $http;
  }

  _createClass(CommonService, [{
    key: 'setRoute',
    value: function setRoute(route) {
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
  }, {
    key: 'search',
    value: function search() {
      return this.$http.get(this.url + this.route + '/search', this.config);
    }
  }]);

  return CommonService;
}();

exports.default = CommonService;

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationService = function () {
  function NotificationService() {
    _classCallCheck(this, NotificationService);
  }

  _createClass(NotificationService, [{
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
}();

exports.default = NotificationService;

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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
    url: '/comecar',
    authenticate: true,
    templateUrl: './src/event/view/start.html',
    controller: 'EventStart',
    controllerAs: 'ctrl'
  }).state('event.slug', {
    url: '/:slug',
    templateUrl: './src/event/view/event.html',
    controller: 'Event',
    controllerAs: 'ctrl'
  }).state('event.donate', {
    url: '/:slug/doacao',
    templateUrl: './src/event/view/donate.html',
    controller: 'EventDonate',
    controllerAs: 'ctrl'
  });
}

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDonateCard = function () {
  function EventDonateCard($uibModalInstance, donate, EventService) {
    _classCallCheck(this, EventDonateCard);

    this.instance = $uibModalInstance;
    this.eventService = EventService;
    this.donate = donate;
    this.donate.data['is_anonymous'] = false;
  }

  _createClass(EventDonateCard, [{
    key: 'buildCard',
    value: function buildCard() {
      var _this = this;

      this.donate.data['message'] = this.donate.message;
      delete this.donate.message;
      console.log(this.donate);
      this.eventService.pay(this.donate.uuid, this.donate.data).then(function (response) {
        _this.instance.close(response.data);
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.instance.dismiss('cancel');
    }
  }]);

  return EventDonateCard;
}();

exports.default = EventDonateCard;


EventDonateCard.$inject = ['$uibModalInstance', 'donate', 'EventService'];

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDonate = function () {
  function EventDonate($rootScope, $state, $stateParams, $window, ProfileService, EventService, NotificationService, $uibModal, CreditCardFactory) {
    var _this = this;

    _classCallCheck(this, EventDonate);

    this.rootScope = $rootScope;
    this.state = $state;
    this.stateParams = $stateParams;
    this.window = $window;
    this.profileService = ProfileService;
    this.eventService = EventService;
    this.notificationService = NotificationService;
    this.modal = $uibModal;
    this.creditCard = CreditCardFactory;
    this.logged = this.window.localStorage.getItem('token');

    if (!this.stateParams.slug) {
      this.state.go('pages.explore');
    }
    console.log(this.notificationService);

    this.eventService.findById(this.stateParams.slug).then(function (response) {
      return _this.uuid = response.data.uuid;
    });

    if (this.logged) {
      this.profileService.me().then(function (response) {
        console.log(response);
        var _response$data = response.data;
        var name = _response$data.name;
        var birthdate = _response$data.birthdate;
        var email = _response$data.email;

        birthdate = birthdate.split('-');
        birthdate = birthdate[2] + '/' + birthdate[1] + '/' + birthdate[0];
        _this.donate = {
          name: name,
          birthdate: birthdate,
          email: email
        };
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

  _createClass(EventDonate, [{
    key: 'openCard',
    value: function openCard() {
      var _this2 = this;

      var _donate = angular.copy(this.donate);
      if (this.window.localStorage.getItem('token')) {
        delete _donate.name;
        delete _donate.email;
        delete _donate.birthdate;
      }
      _donate.card_validate = _donate.card_month + '/' + _donate.card_year;
      _donate.card_number = _donate.card_number.replace(/\-/g, '');
      _donate.document = parseInt(_donate.document.replace(/\./g, ''));
      var modalInstance = this.modal.open({
        templateUrl: './../src/event/view/donate.card.html',
        controller: 'EventDonateCard',
        controllerAs: 'ctrl',
        resolve: {
          donate: function donate() {
            return {
              uuid: _this2.uuid,
              data: _donate
            };
          }
        }
      });
      modalInstance.result.then(function (response) {
        _this2.donate = {};
        _this2.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: response.status });
      });
    }
  }, {
    key: 'openBillet',
    value: function openBillet() {
      var _this3 = this;

      var modalInstance = this.modal.open({
        templateUrl: './../src/event/view/billet.html',
        controller: 'DonateBillet',
        controllerAs: 'ctrl',
        resolve: {
          donate: function donate() {
            return _this3.donate;
          }
        }
      });
      modalInstance.result.then(function (response) {
        _this3.donate = {};
        _this3.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: response.status });
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
      //5165-3011-0835-3140
    }
  }, {
    key: 'getFlag',
    value: function getFlag(number) {
      this.flag = this.creditCard.getFlag(number);
    }
  }]);

  return EventDonate;
}();

exports.default = EventDonate;


EventDonate.$inject = ['$rootScope', '$state', '$stateParams', '$window', 'ProfileService', 'EventService', 'NotificationService', '$uibModal', 'CreditCardFactory'];

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event($state, $stateParams, EventService) {
  var _this = this;

  _classCallCheck(this, Event);

  this.$state = $state;
  this.service = EventService;
  this.event = {};

  var event = void 0;
  if ($stateParams.slug) {
    EventService.findById($stateParams.slug).then(function (response) {
      console.log(response);
      event = response.data;
      event.ends = new Date(event.ends);
      event.progress = Math.floor(event.total_receive / event.goal * 100);
      _this.event = event;
    });
  }
};

exports.default = Event;


Event.$inject = ['$state', '$stateParams', 'EventService'];

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventStart = function () {
  function EventStart($state, $window, $stateParams, CityService, EventService, CategoryService, InstitutionService) {
    var _this = this;

    _classCallCheck(this, EventStart);

    console.log('start');
    this.$state = $state;
    this.window = $window;
    this.service = EventService;
    if (this.hasDraft()) {
      this.draft = this.getDraft();
    }
    this.event = {};
    // this.categories = [
    //   { id: 'Aniversários', label: 'Aniversários' },
    //   { id: 'Casamentos', label: 'Casamentos' },
    //   { id: 'Corridas', label: 'Corridas' },
    //   { id: 'Jantares', label: 'Jantares' },
    //   { id: 'Voluntariado', label: 'Voluntariado' }
    // ]
    CityService.findAll().then(function (response) {
      return _this.cities = response.data.values;
    });
    InstitutionService.findAll().then(function (response) {
      return _this.institutions = response.data.values;
    });
    CategoryService.findAll().then(function (response) {
      return _this.categories = response.data.values;
    });
  }

  _createClass(EventStart, [{
    key: 'save',
    value: function save(event) {
      event = angular.copy(event);
      event.institution_uuid = event.institution_uuid.uuid;
      // let end_date = event.end_date.split('/')
      // event.end_date = `${end_date[2]}-${end_date[1]}-${end_date[0]}`
      console.log(event);
      this.service.save(event).then(function (response) {
        return console.log(response);
      }, function (error) {
        return console.error(error);
      });
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


EventStart.$inject = ['$state', '$window', '$stateParams', 'CityService', 'EventService', 'CategoryService', 'InstitutionService'];

},{}],37:[function(require,module,exports){
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

var _eventDonate = require('./controller/event.donate.js');

var _eventDonate2 = _interopRequireDefault(_eventDonate);

var _eventDonateCard = require('./controller/event.donate.card.js');

var _eventDonateCard2 = _interopRequireDefault(_eventDonateCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('event', []).config(_config2.default).controller('Event', _event2.default).controller('EventStart', _eventStart2.default).controller('EventDonate', _eventDonate2.default).controller('EventDonateCard', _eventDonateCard2.default).service('EventService', _service2.default);

},{"./config.js":32,"./controller/event.donate.card.js":33,"./controller/event.donate.js":34,"./controller/event.js":35,"./controller/event.start.js":36,"./service.js":38}],38:[function(require,module,exports){
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

  function EventService(API, $http) {
    _classCallCheck(this, EventService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventService).call(this, API, $http));

    _this.setRoute('events');
    return _this;
  }

  _createClass(EventService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(Object.getPrototypeOf(EventService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      this.setPublicToken();
      return _get(Object.getPrototypeOf(EventService.prototype), 'findById', this).call(this, id);
    }
  }, {
    key: 'search',
    value: function search(data) {
      this.setPublicToken();
      this.setParams(data);
      return _get(Object.getPrototypeOf(EventService.prototype), 'search', this).call(this);
    }
  }, {
    key: 'save',
    value: function save(data) {
      this.setRoute('events/create');
      return this.create(data);
    }
  }, {
    key: 'pay',
    value: function pay(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/credit_card');
      return this.create(data);
    }
  }]);

  return EventService;
}(_common2.default);

exports.default = EventService;


EventService.$inject = ['API', '$http'];

},{"./../common/service/common.js":27}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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
  } else if (!$stateParams.categoryId && !$stateParams.questionId) {
    $state.go('faq.category', { categoryId: 1 });
  }
};

exports.default = Faq;


Faq.$inject = ['$state', '$stateParams', 'FaqService'];

},{}],41:[function(require,module,exports){
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

},{"./config.js":39,"./controller/faq.js":40,"./service.js":42}],42:[function(require,module,exports){
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
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Cevadis im ampola pa arma uma pindureta. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Sapien in monti palavris qui num significa nadis i pareci latim. Leite de capivaris, leite de mula manquis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Quem num gosti di mum que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. undefined Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Suco de cevadiss deixa as pessoas mais interessantiss. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! in elementis mé pra quem é amistosis quis leo. Quem manda na minha terra sou Euzis! Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Viva Forevis aptent taciti sociosqu ad litora torquent Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá. Manduma pindureta quium dia nois paga. Diuretics paradis num copo é motivis de denguis. Quem num gosta di mé, boa gente num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Paisis, filhis, espiritis santis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. A ordem dos tratores não altera o pão duris Detraxit consequat et quo num tendi nada. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Atirei o pau no gatis, per gatis num morreus. Mé faiz elementum girarzis, nisi eros vermeio. Per aumento de cachacis, eu reclamis. Pra lá , depois divoltis porris, paradis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Delegadis gente finis, bibendum egestas augue arcu ut est. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Detraxit consequat et quo num tendi nada. Atirei o pau no gatis, per gatis num morreus. Casamentiss faiz malandris se pirulitá. Quem num gosti di mum que vai caçá sua turmis! Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interagi no mé, cursus quis, vehicula ac nisi. Si num tem leite então bota uma pinga aí cumpadi! Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Cevadis im ampola pa arma uma pindureta. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Sapien in monti palavris qui num significa nadis i pareci latim. Leite de capivaris, leite de mula manquis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Quem num gosti di mum que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. undefined Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Suco de cevadiss deixa as pessoas mais interessantiss. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! in elementis mé pra quem é amistosis quis leo. Quem manda na minha terra sou Euzis! Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Viva Forevis aptent taciti sociosqu ad litora torquent Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá. Manduma pindureta quium dia nois paga. Diuretics paradis num copo é motivis de denguis. Quem num gosta di mé, boa gente num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Paisis, filhis, espiritis santis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. A ordem dos tratores não altera o pão duris Detraxit consequat et quo num tendi nada. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Atirei o pau no gatis, per gatis num morreus. Mé faiz elementum girarzis, nisi eros vermeio. Per aumento de cachacis, eu reclamis. Pra lá , depois divoltis porris, paradis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Delegadis gente finis, bibendum egestas augue arcu ut est. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Detraxit consequat et quo num tendi nada. Atirei o pau no gatis, per gatis num morreus. Casamentiss faiz malandris se pirulitá. Quem num gosti di mum que vai caçá sua turmis! Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interagi no mé, cursus quis, vehicula ac nisi. Si num tem leite então bota uma pinga aí cumpadi! Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 2,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 3,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 4,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 5,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 6,
        title: 'Question 2',
        question: 'Si num tem leite então bota uma pinga aí cumpadi! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Leite de capivaris, leite de mula manquis.'
      }]
    }, {
      id: 2,
      name: 'Apoiadores',
      questions: [{
        id: 1,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Cevadis im ampola pa arma uma pindureta. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Sapien in monti palavris qui num significa nadis i pareci latim. Leite de capivaris, leite de mula manquis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimiss. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Quem num gosti di mum que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. undefined Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Suco de cevadiss deixa as pessoas mais interessantiss. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! in elementis mé pra quem é amistosis quis leo. Quem manda na minha terra sou Euzis! Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Viva Forevis aptent taciti sociosqu ad litora torquent Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá. Manduma pindureta quium dia nois paga. Diuretics paradis num copo é motivis de denguis. Quem num gosta di mé, boa gente num é. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Paisis, filhis, espiritis santis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. A ordem dos tratores não altera o pão duris Detraxit consequat et quo num tendi nada. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Atirei o pau no gatis, per gatis num morreus. Mé faiz elementum girarzis, nisi eros vermeio. Per aumento de cachacis, eu reclamis. Pra lá , depois divoltis porris, paradis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Delegadis gente finis, bibendum egestas augue arcu ut est. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Detraxit consequat et quo num tendi nada. Atirei o pau no gatis, per gatis num morreus. Casamentiss faiz malandris se pirulitá. Quem num gosti di mum que vai caçá sua turmis! Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interagi no mé, cursus quis, vehicula ac nisi. Si num tem leite então bota uma pinga aí cumpadi! Manduma pindureta quium dia nois paga. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Ta deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.” Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 2,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 3,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 4,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 5,
        title: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss.',
        question: 'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Suco de cevadiss deixa as pessoas mais interessantiss. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.'
      }, {
        id: 6,
        title: 'Question 2',
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

},{"./../common/service/common.js":27}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Home = function () {
  function Home($scope, $timeout) {
    _classCallCheck(this, Home);

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


Home.$inject = ['$scope', '$timeout'];

},{}],45:[function(require,module,exports){
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

},{"./config.js":43,"./controller/home.js":44}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InstitutionConfig;
function InstitutionConfig($stateProvider) {
  // $stateProvider
  //   .state('instituition', {
  //     url: '/',
  //     templateUrl: './src/instituition/view/home.html',
  //     controller: 'Home',
  //     controllerAs: 'ctrl'
  //   })
}

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('institution', []).config(_config2.default).service('InstitutionService', _service2.default);

},{"./config.js":46,"./service.js":48}],48:[function(require,module,exports){
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

  function InstitutionService(API, $http) {
    _classCallCheck(this, InstitutionService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InstitutionService).call(this, API, $http));

    _this.setRoute('institutions');
    return _this;
  }

  _createClass(InstitutionService, [{
    key: 'findAll',
    value: function findAll() {
      this.setPublicToken();
      return _get(Object.getPrototypeOf(InstitutionService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'search',
    value: function search(data) {
      this.setPublicToken();
      this.setParams(data);
      return _get(Object.getPrototypeOf(InstitutionService.prototype), 'search', this).call(this);
    }
  }]);

  return InstitutionService;
}(_common2.default);

exports.default = InstitutionService;


InstitutionService.$inject = ['API', '$http'];

},{"./../common/service/common.js":27}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PagesConfig;
function PagesConfig($stateProvider) {
  $stateProvider.state('pages', {
    url: '/paginas',
    templateUrl: './src/pages/view/pages.html'
  }).state('pages.about', {
    url: '/quem-somos',
    templateUrl: './src/pages/view/about.html',
    controller: 'About',
    controllerAs: 'ctrl'
  }).state('pages.how-it-works', {
    url: '/como-funciona',
    templateUrl: './src/pages/view/how-it-works.html'
  }).state('pages.explore', {
    url: '/explore-novas-causas',
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
    templateUrl: './src/pages/view/terms.html'
  }).state('pages.policies', {
    url: '/politica-de-privacidade',
    templateUrl: './src/pages/view/policies.html'
  }).state('pages.contact', {
    url: '/contato',
    templateUrl: './src/pages/view/contact.html',
    controller: 'Contact',
    controllerAs: 'ctrl'
  });
}

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function Contact($timeout) {
  _classCallCheck(this, Contact);

  $timeout(function () {
    // console.log(document.querySelector('.fb-page > span'))
    // document.querySelector('.fb-page > span').style.width = '100%'
    // this.fbBoxWidth = document.querySelector('.fbBox').offsetWidth
  }, 2000);
};

exports.default = Contact;


Contact.$inject = ['$timeout'];

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Explore = function () {
  function Explore(ActivityAreaService, EventService, StorageService) {
    var _this = this;

    _classCallCheck(this, Explore);

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
    this.getEvents();
    this.getActivityAreas();
    this.search = function () {
      return _this.getSearch(_this.query);
    };
  }

  _createClass(Explore, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this2 = this;

      this.eventService.findAll().then(function (response) {
        return _this2.events = response.data.values;
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
      this.eventService.search(data).then(function (response) {
        return _this3.events = response.data.values;
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

Explore.$inject = ['ActivityAreaService', 'EventService', 'StorageService'];

exports.default = Explore;

},{}],55:[function(require,module,exports){
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

},{"./config.js":49,"./controller/about.js":50,"./controller/campaign.js":51,"./controller/contact.js":52,"./controller/donate.billet.js":53,"./controller/explore.js":54}],56:[function(require,module,exports){
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
  }).state('profile.user.report', {
    url: '/eventos/:uuid/relatorio',
    authenticate: true,
    templateUrl: './src/profile/view/user.report.html',
    controller: 'UserReport',
    controllerAs: 'ctrl',
    resolve: {}
  }).state('profile.ong', {
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
    templateUrl: './src/profile/view/register.html',
    controller: 'ProfileRegister',
    controllerAs: 'ctrl'
  }).state('profile.confirmation', {
    url: '/confirmacao/:uuid/:confirmation_code',
    templateUrl: './src/profile/view/confirmation.html',
    controller: 'ProfileConfirmation',
    controllerAs: 'ctrl'
  }).state('profile.change', {
    url: '/alterar',
    templateUrl: './src/profile/view/change.html',
    controller: 'ProfileChange',
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

},{}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileConfirmation = function () {
  function ProfileConfirmation($rootScope, $stateParams, $state, $window, ProfileService, StorageService) {
    var _this = this;

    _classCallCheck(this, ProfileConfirmation);

    this.storage = StorageService;
    this.rootScope = $rootScope;
    this.state = $state;
    this.window = $window;
    this.confirmation = false;
    if ($stateParams.uuid && $stateParams.confirmation_code) {
      var profile = {
        uuid: $stateParams.uuid,
        confirmation_code: $stateParams.confirmation_code
      };
      ProfileService.confirmation(profile).then(function (response) {
        _this.confirmation = true;
        console.log(response);
        _this.profile = response.data;
      }, function (error) {
        _this.error = error.data;
        console.log('error', error);
      });
    }
  }

  _createClass(ProfileConfirmation, [{
    key: 'login',
    value: function login() {
      this.storage.setItem('token', this.profile.token);
      var _profile = this.profile;
      var name = _profile.name;
      var email = _profile.email;
      var type = _profile.type;

      this.storage.setItem('profile', { name: name, email: email });
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


ProfileConfirmation.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'ProfileService', 'StorageService'];

},{}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngConfigurations = function () {
  function OngConfigurations($filter, $rootScope, StorageService, ProfileService, profile) {
    _classCallCheck(this, OngConfigurations);

    this.filter = $filter;
    this.rootScope = $rootScope;
    this.storage = StorageService;
    this.service = ProfileService;
    this.load(profile);
  }

  _createClass(OngConfigurations, [{
    key: 'load',
    value: function load(profile) {
      profile = angular.copy(profile.data);
      console.log(profile);
      profile.birthdate = new Date(profile.birthdate);
      profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy');
      this.profile = profile;
    }
  }, {
    key: 'save',
    value: function save(profile) {
      var _this = this;

      profile = angular.copy(profile);
      profile.avatar = null;
      // birthdate = profile.birthdate.split('/')
      // profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
      // profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
      this.service.change(profile).then(function (response) {
        _this.storage.setItem('token', response.data.token);
        var _response$data = response.data;
        var name = _response$data.name;
        var email = _response$data.email;
        var type = _response$data.type;

        _this.storage.setItem('profile', { name: name, email: email, type: type });
        _this.rootScope.$broadcast('profile.change');
        _this.profile.password = '';
        _this.profile.new_password = '';
      });
    }
  }]);

  return OngConfigurations;
}();

exports.default = OngConfigurations;


OngConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'profile'];

},{}],60:[function(require,module,exports){
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
    this.getEvents();
  }

  _createClass(OngEvents, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents({}).then(function (response) {
        _this.pendings = response.data.values.filter(function (event) {
          return event.needReport == true;
        });
        _this.rootScope.$broadcast('alert', { type: 'alert-warning', icon: 'fa-warning', message: 'Você tem ' + _this.pendings.length + ' relatórios pendentes.' });
        _this.events = response.data.values.map(function (event) {
          event.ends = new Date(event.ends);
          return event;
        });
        // console.log(this.events)
      });
    }
  }]);

  return OngEvents;
}();

exports.default = OngEvents;


OngEvents.$inject = ['$rootScope', 'ProfileService'];

},{}],61:[function(require,module,exports){
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
    this.getEvents();
  }

  _createClass(OngHistory, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents({ closed: true }).then(function (response) {
        _this.rootScope.$broadcast('alert', { type: 'alert-warning', icon: 'fa-warning', message: 'Você tem ' + response.data.values.length + ' campanhas encerradas.' });
        _this.events = response.data.values.map(function (event) {
          event.ends = new Date(event.ends);
          return event;
        });
        // console.log(this.events)
      });
    }
  }]);

  return OngHistory;
}();

exports.default = OngHistory;


OngHistory.$inject = ['$rootScope', 'ProfileService'];

},{}],62:[function(require,module,exports){
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
    this.getEvents();
    $scope.$on('profile.change', function () {
      _this.profile = StorageService.getItem('profile');
    });
  }

  _createClass(ProfileOng, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this2 = this;

      this.service.getEvents({}).then(function (response) {
        _this2.needReport = response.data.values.filter(function (event) {
          return event.needReport == true;
        }).length;
      });
    }
  }]);

  return ProfileOng;
}();

exports.default = ProfileOng;


ProfileOng.$inject = ['$scope', '$window', '$state', 'StorageService', 'ProfileService', 'profile'];

},{}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngPage = function OngPage(profile) {
  _classCallCheck(this, OngPage);

  this.profile = profile.data;
};

exports.default = OngPage;


OngPage.$inject = ['profile'];

},{}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OngReport = function () {
  function OngReport(EventService, $stateParams) {
    _classCallCheck(this, OngReport);

    this.service = EventService;
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid);
    }
  }

  _createClass(OngReport, [{
    key: 'getEvent',
    value: function getEvent(id) {
      var _this = this;

      this.service.findById(id).then(function (response) {
        return _this.event = response.data;
      });
    }
  }]);

  return OngReport;
}();

exports.default = OngReport;


OngReport.$inject = ['EventService', '$stateParams'];

},{}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileRegister = function () {
  function ProfileRegister($scope, $stateParams, $state, $filter, $timeout, ActivityAreaService, ProfileService) {
    _classCallCheck(this, ProfileRegister);

    this.activityAreaService = ActivityAreaService;
    this.service = ProfileService;
    this.timeout = $timeout;
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
        profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd');
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
      console.log(response);
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


ProfileRegister.$inject = ['$scope', '$stateParams', '$state', '$filter', '$timeout', 'ActivityAreaService', 'ProfileService'];

},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserConfigurations = function () {
  function UserConfigurations($filter, $rootScope, StorageService, ProfileService, profile) {
    _classCallCheck(this, UserConfigurations);

    this.filter = $filter;
    this.rootScope = $rootScope;
    this.storage = StorageService;
    this.service = ProfileService;
    this.needpassword = true;
    this.load(profile);
  }

  _createClass(UserConfigurations, [{
    key: 'load',
    value: function load(profile) {
      profile = angular.copy(profile.data);
      profile.birthdate = new Date(profile.birthdate);
      profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy');
      this.profile = profile;
      this.needpassword = profile.needpassword;
    }
  }, {
    key: 'save',
    value: function save(profile) {
      var _this = this;

      profile = profile ? angular.copy(profile) : angular.copy(this.profile);
      console.log(profile);
      if (profile.avatar) {
        console.log(document.querySelector('#avatar').files[0]);
        profile.avatar = document.querySelector('#avatar').files[0];
      }
      console.log(profile);
      // birthdate = profile.birthdate.split('/')
      // profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
      // profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
      this.service.change(profile).then(function (response) {
        console.log(response.data);
        _this.storage.setItem('token', response.data.token);
        var _response$data = response.data;
        var name = _response$data.name;
        var email = _response$data.email;
        var type = _response$data.type;

        _this.storage.setItem('profile', { name: name, email: email, type: type });
        _this.rootScope.$broadcast('profile.change');
        _this.profile.password = '';
        _this.profile.new_password = '';
        _this.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: 'mensagem' });
      });
    }
  }, {
    key: 'setPassword',
    value: function setPassword() {
      console.log(this.profile.needpassword && this.needpassword);
      this.needpassword = !this.needpassword;
    }
  }]);

  return UserConfigurations;
}();

exports.default = UserConfigurations;


UserConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'profile'];

},{}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserEvents = function () {
  function UserEvents($rootScope, ProfileService) {
    _classCallCheck(this, UserEvents);

    this.rootScope = $rootScope;
    this.service = ProfileService;
    this.pendings = 0;
    this.rootScope.$broadcast('alert', { type: 'alert-info', icon: 'fa-warning', message: ' Veja nosso <a href="#">kit</a> para bombar suas campanhas!' });
    this.getEvents();
  }

  _createClass(UserEvents, [{
    key: 'getEvents',
    value: function getEvents() {
      var _this = this;

      this.service.getEvents().then(function (response) {
        _this.pendings = response.data.values.filter(function (event) {
          return event.needReport == true;
        });
        _this.rootScope.$broadcast('alert', { type: 'alert-warning', icon: 'fa-warning', message: 'Você tem ' + _this.pendings.length + ' relatórios pendentes.' });
        _this.events = response.data.values.map(function (event) {
          event.ends = new Date(event.ends);
          return event;
        });
        // console.log(this.events)
      });
    }
  }]);

  return UserEvents;
}();

exports.default = UserEvents;


UserEvents.$inject = ['$rootScope', 'ProfileService'];

},{}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileUser = function () {
  function ProfileUser($scope, $rootScope, $window, $state, StorageService, ProfileService, profile) {
    var _this = this;

    _classCallCheck(this, ProfileUser);

    this.service = ProfileService;
    this.profile = profile.data;
    this.rootScope = $rootScope;
    $scope.$on('profile.change', function () {
      _this.profile = StorageService.getItem('profile');
    });
    this.getEvents();
  }

  _createClass(ProfileUser, [{
    key: 'alert',
    value: function alert() {
      this.rootScope.$broadcast('alert', { type: 'alert-info', icon: 'fa-warning', message: 'mensagem' });
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      var _this2 = this;

      this.service.getEvents().then(function (response) {
        _this2.needReport = response.data.values.filter(function (event) {
          return event.needReport == true;
        }).length;
      });
    }
  }]);

  return ProfileUser;
}();

exports.default = ProfileUser;


ProfileUser.$inject = ['$scope', '$rootScope', '$window', '$state', 'StorageService', 'ProfileService', 'profile'];

},{}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserReport = function () {
  function UserReport(EventService, $stateParams) {
    _classCallCheck(this, UserReport);

    this.service = EventService;
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid);
    }
  }

  _createClass(UserReport, [{
    key: 'getEvent',
    value: function getEvent(id) {
      var _this = this;

      this.service.findById(id).then(function (response) {
        return _this.event = response.data;
      });
    }
  }]);

  return UserReport;
}();

exports.default = UserReport;


UserReport.$inject = ['EventService', '$stateParams'];

},{}],70:[function(require,module,exports){
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

var _userConfigurations = require('./controller/user.configurations.js');

var _userConfigurations2 = _interopRequireDefault(_userConfigurations);

var _ongConfigurations = require('./controller/ong.configurations.js');

var _ongConfigurations2 = _interopRequireDefault(_ongConfigurations);

var _userEvents = require('./controller/user.events.js');

var _userEvents2 = _interopRequireDefault(_userEvents);

var _ongEvents = require('./controller/ong.events.js');

var _ongEvents2 = _interopRequireDefault(_ongEvents);

var _userReport = require('./controller/user.report.js');

var _userReport2 = _interopRequireDefault(_userReport);

var _ongPage = require('./controller/ong.page.js');

var _ongPage2 = _interopRequireDefault(_ongPage);

var _ongReport = require('./controller/ong.report.js');

var _ongReport2 = _interopRequireDefault(_ongReport);

var _ongHistory = require('./controller/ong.history.js');

var _ongHistory2 = _interopRequireDefault(_ongHistory);

var _change = require('./controller/change.js');

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('profile', []).config(_config2.default).service('ProfileService', _service2.default).controller('ProfileRegister', _register2.default).controller('ProfileConfirmation', _confirmation2.default).controller('ProfileUser', _user2.default).controller('ProfileOng', _ong2.default).controller('UserConfigurations', _userConfigurations2.default).controller('OngConfigurations', _ongConfigurations2.default).controller('UserEvents', _userEvents2.default).controller('OngEvents', _ongEvents2.default).controller('UserReport', _userReport2.default).controller('OngPage', _ongPage2.default).controller('OngReport', _ongReport2.default).controller('OngHistory', _ongHistory2.default).controller('ProfileChange', _change2.default);

},{"./config.js":56,"./controller/change.js":57,"./controller/confirmation.js":58,"./controller/ong.configurations.js":59,"./controller/ong.events.js":60,"./controller/ong.history.js":61,"./controller/ong.js":62,"./controller/ong.page.js":63,"./controller/ong.report.js":64,"./controller/register.js":65,"./controller/user.configurations.js":66,"./controller/user.events.js":67,"./controller/user.js":68,"./controller/user.report.js":69,"./service.js":71}],71:[function(require,module,exports){
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

  function ProfileService(API, $http, FacebookService) {
    _classCallCheck(this, ProfileService);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileService).call(this, API, $http));

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
      _get(Object.getPrototypeOf(ProfileService.prototype), 'setRoute', this).call(this, 'users/me/events');
      if (params != undefined) {
        _get(Object.getPrototypeOf(ProfileService.prototype), 'setParams', this).call(this, params);
      }
      return _get(Object.getPrototypeOf(ProfileService.prototype), 'findAll', this).call(this);
      // return this.$http.get(this.url + this.route)
    }
  }, {
    key: 'change',
    value: function change(data) {
      this.setRoute('users/me');
      return this.$http.put(this.url + this.route, data);
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


ProfileService.$inject = ['API', '$http', 'FacebookService'];

},{"./../common/service/common.js":27}]},{},[1]);
