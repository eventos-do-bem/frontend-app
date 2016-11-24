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
      // config['headers']['Content-Type'] = API.contenttype
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

angular.module('app', ['ui.bootstrap', 'ngMask', _angularUiRouter2.default, 'ngMessages', 'ngSanitize', 'common', 'loading', 'alert', 'countdown', 'facebook', 'home', 'pages', 'faq', 'event', 'donate', 'auth', 'profile', 'institution', 'confirmation']).config(_config2.default).constant('API', _api2.default).factory('HttpInterceptor', _interceptor2.default).controller('AppController', _controller2.default).run(_run2.default);

},{"./../auth/module.js":11,"./../common/component/alert/alert.js":13,"./../common/component/countdown/countdown.js":16,"./../common/component/facebook/facebook.js":18,"./../common/component/loading/loading.js":22,"./../common/module.js":31,"./../confirmation/module.js":43,"./../donate/module.js":48,"./../event/module.js":55,"./../faq/module.js":59,"./../home/module.js":63,"./../institution/module.js":66,"./../pages/module.js":74,"./../profile/module.js":90,"./api.json":2,"./config.js":3,"./controller.js":4,"./interceptor.js":5,"./run.js":7,"angular-messages":"angular-messages","angular-sanitize":"angular-sanitize","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router","ng-mask":"ng-mask"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;
function run($rootScope, $window, $location, $state, $anchorScroll) {
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
    // $location.hash('scrollArea')
    // $anchorScroll('scrollArea')
  });
}

run.$inject = ['$rootScope', '$window', '$location', '$state', '$anchorScroll'];

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
      console.log(response.data);
      this.storage.setItem('token', response.data.token);
      var _response$data = response.data;
      var name = _response$data.name;
      var email = _response$data.email;
      var type = _response$data.type;
      var avatar = _response$data.avatar;

      this.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar });
      this.$rootScope.$broadcast('profile.change');
      switch (type) {
        case 'user':
          this.state.go('profile.user.events');break;
        case 'ong':
          this.state.go('profile.ong.events');break;
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

},{"./../common/service/common.js":35}],13:[function(require,module,exports){
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
  bindings: {},
  template: '\n    <p data-ng-repeat="alert in $ctrl.alerts" class="alert alert-dismissible" data-ng-class="[alert.type]" data-ng-show="alert.show" role="alert">\n      <button type="button" class="close" data-ng-click="alert.show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n      <i class="fa" data-ng-class="[alert.icon]"></i>\n      <span data-ng-bind-html="alert.message"></span>\n    </p>\n  ',
  controller: function controller($scope) {
    var ctrl = this;
    $scope.$on('alert', function (event, args) {
      args.show = true;
      ctrl.alerts.push(args);
    });
    $scope.$on('alert-clear', function (event) {
      ctrl.alerts = [];
    });
    ctrl.$onInit = function () {
      ctrl.alerts = [];
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

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('facebook', []).component('fbPage', _component2.default);

},{"./component.js":17}],19:[function(require,module,exports){
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
    progress: '<?'
  },
  template: '\n    <input type="file" ng-model="file" data-ng-hide="true">\n    <button type="button" class="btn btn-default" data-ng-class="$ctrl.style" data-ng-click="click()">\n      <i class="fa fa-upload"></i>\n      <span ng-transclude></span>\n      <span data-ng-show="$ctrl.percent">\n        <span data-ng-bind="$ctrl.percent"></span>%\n      </span>\n    </button>\n  ',
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

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('file', []).component('file', _component2.default);

},{"./component.js":19}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('loading', []).component('loading', _component2.default);

},{"./component.js":21}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Component = {
    restrict: 'E',
    controller: function controller($element, $attrs) {
        var state = $element[0].querySelector('.' + $attrs.highlighted);
        state.style.fill = '#0074DB';
    },
    template: '\n  <svg version="1.1" id="map" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 382.887" enable-background="new 0 0 400 382.887" xml:space="preserve">\n    <g>\n      <path class="path_estado estado estado1" fill="#ffffff" d="M146.691,276.623"></path>\n      <path class="path_estado estado estado2" fill="#ffffff" d="M237.638,111.115"></path>\n      <path class="path_estado estado acre" id="estado_acre" fill="#ffffff" d="M14.924,125.217\n          c0,0,14.616,6.623,28.774,7.536c2.968,2.055,5.48,3.196,5.48,3.196s23.064,12.561,28.317,13.931l-0.228,1.599l-2.969,1.827\n          l-2.74,1.37l-1.599,1.826l-2.969,0.457l-2.284,0.913l-1.826,2.513l-1.37,0.686l-1.827-0.229l-2.513-1.142H53.29h-6.395\n          l-2.969-0.229l-0.685-2.284l-0.229-4.339l0.686-2.969v-3.197l-0.229-2.056l-2.968,2.056l-3.425,2.74l-2.512,0.913l-6.166-0.685\n          l-0.457-2.74l-2.74-2.056l-2.055-0.913h-2.284l0.457-1.599v-2.74l-1.599-1.827l-2.74-2.969l-2.055-4.11l-1.599-3.197v-2.055\n          L14.924,125.217z"></path>\n      <path class="path_estado estado amazonia" id="estado_amazonia" fill="#ffffff" d="M14.924,122.248l4.338,2.74\n          c0,0,20.096,6.166,24.664,6.166c0.914,0,2.284,1.142,2.284,1.142l2.741,1.827c0,0,25.577,13.929,28.318,14.158\n          c2.74,0.229,2.74-0.913,2.74-0.913l1.598-1.37l1.599-1.599l2.74-0.457l3.197,0.913l3.198-1.37h2.055l1.599-0.685l0.685-1.827\n          l2.969-0.685l3.883-0.229l0.913-2.055l1.37-0.914v-2.055l2.97-1.827l0.228-2.055l9.135-0.457l1.142,2.283l2.284,2.056l2.969,2.969\n          l2.741-0.229l2.511,0.457h15.073l13.245-0.229l2.283-1.827l0.229-4.567l1.6-3.653l0.456-3.882l-1.37-3.197l-0.914-2.284\n          l19.411-39.279l0.914-3.426l0.913-1.827l-3.653,0.914l-2.97-2.056l-2.968-2.511l-7.536-0.686l-2.283-3.425\n          c0,0-4.568-6.288-5.025-6.395c-0.685,0.686-0.356-1.82-0.356-1.82l-0.157-3.175l-0.428-2.569l-1.685-0.2h-2.797l-3.711,0.057\n          l-0.971,0.257l-1.542,2.112l-2.283,3.026l-1.057,1.684c0,0-0.456,2.227-0.484,2.341c-0.029,0.115-0.657,0.885-0.657,0.885\n          l-1.428,0.6l-2.454-0.029l-1.77-1.313l-1.113-1.313l-1.514,0.285c0,0-1.284,0.828-1.37,0.885s-0.942,1.37-0.942,1.37l-0.114,2.284\n          l-0.2,3.482l-1.341,0.257l-1.513,0.028c0,0-1.484-0.828-1.656-0.914c-0.171-0.085-1.028-0.971-1.028-0.971\n          s-1.313-1.169-1.456-1.313c-0.143-0.143-1.113-1.399-1.113-1.399s-1.2-1.17-1.257-1.285c-0.057-0.114-0.656-1.113-0.656-1.113\n          v-0.856l0.058-2.026l-0.171-3.968c0,0-0.286-1.542-0.314-1.627c-0.028-0.085-0.485-2.684-0.485-2.769s-0.057-2.597-0.057-2.597\n          s-0.144-2.113-0.258-2.341c-0.113-0.229-0.942-1.57-1.084-1.77c-0.143-0.2-1.057-1.885-1.057-1.885l-1.028-2.541\n          c0,0-0.657-1.826-0.913-2.198c-0.257-0.371-0.941-1.798-0.999-1.884s-0.342-0.714-0.342-0.714l-2.655-0.028l-0.4-0.6l-0.828,0.257\n          l-0.827,0.771l-2.084,0.913l-0.428,1.798l-1.427,1.57l-1.484,1.599l-2.026,0.285l-1.627,0.6l-1.313,1.028l-1.542,1.17l-2.084,2.227\n          l-1.77,0.428l-1.655,0.371l-1.028-0.742l-0.086-1.027h-1.313l-1,0.199l-0.457,1.199l-1.941-0.029L83.12,46.83l-0.771-0.542\n          c0,0-0.6-0.799-0.685-0.885c-0.086-0.085-1.228-1.028-1.228-1.028l-0.971-0.742l-3.739-0.313l-0.115-5.424l-1.057-1.656\n          l-0.627-0.942l-0.6-0.6l-1.342,1.028l-1.17,0.799l-0.656,1.228l-1.656,0.999l-1.399-1.77l-0.428-0.915l-0.827,1.228l-0.828,1.113\n          l-4.453,0.029l-3.055-0.17l-4.338-0.115c0,0-0.914,0.229-0.999,0.256c-0.086,0.029-1.257,0.657-1.257,0.657\n          s-0.399,0.885-0.371,0.971c0.028,0.086,0.229,1.855,0.229,1.855l0.142,1.313c0,0,0.285,0.485,0.685,0.514\n          c0.4,0.029,1.713,0.029,1.713,0.029s1.628,0.085,1.77,0.085c0.143,0,0.742,0.485,0.742,0.485s0.599,0.485,0.657,0.6\n          c0.057,0.115,0.685,1.142,0.685,1.142l0.257,1.285c0,0,0,1.199,0,1.284c0,0.086-0.285,1.142-0.285,1.142h-1l-1.769,0.114\n          l-0.457-0.456l-1.513-0.115l-1.341,0.543l-1.77,0.086l0.029,1.598l-0.057,4.967l0.856,0.828c0,0,1.027,0.571,1.142,0.685\n          c0.114,0.115,0.799,0.601,0.971,0.743c0.17,0.143,0.856,0.4,0.856,0.4l0.143,2.426l-0.17,1.171l1.227,1.641l0.557,1.584\n          l-0.514,6.252v2.869c0,0-0.728,2.227-0.728,2.612S52.619,80.5,52.619,80.5l-0.043,2.869c0,0-0.557,0.856-0.6,1.156\n          c-0.043,0.3-0.129,3.854-0.129,3.854s-0.642,1.712-0.685,1.97c-0.043,0.257,0,2.483,0,2.483s-0.942,2.869-1.071,3.083\n          c-0.128,0.214-0.942,1.541-1.113,1.584c-0.171,0.042-1.798-0.043-2.012-0.043c-0.214,0-1.884-0.599-2.013-0.728\n          c-0.128-0.129-0.899-0.643-0.899-0.643h-1.927l-1.456,0.557l-0.6,1.071l-2.27,0.899l-3.211,0.299l-2.912,0.086l-1.712,0.729\n          l-1.97,1.156l-1.37,1.028c0,0-2.141,1.456-2.141,1.584c0,0.128-1.884,2.44-2.055,2.654c-0.171,0.214-0.728,2.141-0.728,2.141\n          l-0.3,1.371l-0.942,1.328c0,0-0.771,1.156-0.813,1.284s0.257,1.97,0.257,1.97l0.299,1.242l-0.856,2.269l-1.584,1.456\n          c0,0-1.756,0.942-1.756,1.113C16.008,120.493,14.924,122.248,14.924,122.248z"></path>\n      <path class="path_estado estado roraima" id="estado_roraima" fill="#ffffff" d="M101.561,13.06c0.342,0,3.597,0,3.597,0\n          l1.542,1.627l1.542,1.198l3.254,0.343l2.226,0.256l0.856,1.713l1.885,0.171h2.141l0.856-1.284l0.257-1.884l1.541-0.856l2.142-0.6\n          h3.34l1.456-0.428l2.055-1.456l1.97-1.028l1.627-0.771l2.398-0.257l1.712-2.055l1.799-2.313l0.257-1.712l3.769,0.171l0.855,1.712\n          l-0.855,1.456l-0.686,1.37l0.085,1.712l1.713,0.257l1.798,0.771l1.199,1.97l0.685,1.542l-0.428,1.542l-1.284,1.284l-0.342,1.627\n          l-0.856,2.826l0.085,1.37l-0.514,1.113v3.254l0.085,1.713l0.942,1.285l0.856,1.712l0.085,2.655l1.285,0.771l2.056,1.798\n          l1.113,1.542l2.654,1.712l0.771,1.028l0.171,5.052v2.826l-1.199,0.514h-3.768l-3.683-0.085c0,0-0.771,0.856-1.113,0.942\n          c-0.342,0.085-2.227,2.313-2.227,2.313l-0.855,1.798v1.028l-0.857,0.685l-0.685,0.856l-0.856,1.199l-0.172,1.542l-0.514,0.771\n          l-1.284,0.256l-0.771-0.771l-0.771-1.028l-1.798-1.113l-1.37-0.514l-1.542,0.342l-1.199,1.113l-1.199,0.856l-1.284,1.626\n          l-0.257,4.282l-0.599,0.514l-1.285-0.856l-1.969-2.398l-1.2-1.37l-0.685-0.686l1.027-1.456v-1.626l-0.343-0.942l-0.77-1.285\n          l-0.257-1.627l-0.257-2.141l-0.257-1.799l-0.171-2.911V44.66l-0.856-1.541l-1.028-1.199l-0.856-1.456l-0.942-1.97l-0.686-1.712\n          l-0.942-2.142l-0.342-0.942l-1.37-1.199h-0.771l0.085-3.254c0,0-1.37,0-1.627-0.086c-0.256-0.085-2.312-0.085-2.312-0.085\n          l-1.113,0.085l-1.798-0.342l-0.6-0.342h-0.771c0,0-0.257-6.937-0.257-7.194c0-0.257,1.028-1.456,1.028-1.456l0.6-0.942v-2.569\n          l-2.056-1.37l-1.37-0.428l-1.284-0.428l-0.514-0.685L101.561,13.06z"></path>\n      <path class="path_estado estado amapa" id="estado_amapa" fill="#ffffff" d="M197.989,32.671l2.568,0.856l1.713,0.343\n          l1.541-0.257l0.686-0.771l2.141-0.086h1.8l1.541,0.771l1.627,0.171l2.227-0.085l2.226-1.456c0,0,0.942-1.456,1.199-1.884\n          c0.258-0.428,1.885-4.282,1.885-4.282l2.396-4.11l2.228-3.425l2.313-2.826l1.799-1.542l1.541,1.199l1.113,1.37\n          c0,0,0.172,1.798,0.172,2.141s0.085,4.368,0.085,4.368l0.428,1.284l0.942,1.456c0,0,0.685,0.771,0.685,1.199\n          c0,0.429,0.343,2.483,0.257,2.741c-0.086,0.257,0.601,3.083,0.601,3.083l0.771,1.542l1.627,1.712l1.798,1.37l2.056,0.343\n          l1.027,1.027l1.028,1.713l-0.258,2.055c0,0-0.855,0.343-1.113,0.686c-0.257,0.342-2.226,2.312-3.167,3.168\n          c-0.942,0.857-2.57,3.254-2.57,3.254l-2.397,1.97c0,0-1.713,1.199-2.398,1.456c-0.685,0.257-1.713,1.284-1.713,1.542\n          c0,0.256-1.113,2.826-1.113,2.826l-1.284,1.798l-1.542,1.97l-0.599,2.398c0,0-0.429,0.514-0.942,0.514c-0.513,0-1.884,0-1.884,0\n          s-0.685-1.114-0.942-1.37c-0.257-0.257-1.113-1.799-1.37-2.569c-0.256-0.771-1.541-2.826-1.541-2.826s-0.856-1.37-1.285-1.97\n          c-0.428-0.599-1.284-2.312-1.713-2.74c-0.428-0.428-1.198-1.456-1.198-1.456s-0.171-1.884-0.257-2.312s-0.856-2.998-1.455-3.512\n          c-0.601-0.513-1.628-3.339-1.884-3.596c-0.259-0.257-0.772-1.627-1.543-1.884c-0.771-0.256-1.884-0.685-2.569-1.113\n          c-0.685-0.428-2.141-0.942-2.568-1.027c-0.429-0.085-1.284-1.113-2.227-1.285c-0.942-0.171-1.456-0.599-1.884-0.942\n          c-0.429-0.342-1.628-1.541-1.628-2.141S197.989,32.671,197.989,32.671z"></path>\n      <path class="path_estado estado maranhao" id="estado_maranhao" fill="#ffffff" d="M280.714,67.098l1.97,0.171l1.713,1.456\n          l1.455,0.171l2.313,0.086l1.884,0.771l1.199,1.627l2.397,1.798c0,0,1.199,1.626,1.199,1.884c0,0.257,0.342,1.456,0.342,1.798\n          s0,1.798-0.256,1.884c-0.257,0.085-1.884,1.712-1.884,1.712l-0.429,1.627l0.171,2.056l1.2,1.027l1.54-0.429l0.771-1.712\n          l1.885-1.028h1.542l0.771-1.028c0,0,0.771-0.942,1.369-0.942c0.601,0,3.255-0.085,3.255-0.085l1.37-0.686l1.113-0.514l2.142,0.428\n          l1.798,0.856l2.142,1.37l1.626,0.771l2.826,0.343l1.627,0.428l-0.17,1.627l-1.199,1.285l-1.884,1.028l-0.771,0.514l-2.74,0.6\n          l-1.2,2.397l-1.37,2.397l-1.028,1.799c0,0-0.17,3.083-0.17,4.624c0,1.541,0.771,2.912,0.771,3.511c0,0.6,0.599,2.398,0,3.083\n          c-0.601,0.685-1.113,2.826-1.713,3.34s-0.343,2.826-0.343,2.826l0.172,1.37l1.627,1.884l-0.344,2.483l-1.027,1.371l-2.226,0.171\n          c0,0-1.371-0.599-1.713-0.599c-0.343,0-2.142,0.085-2.142,0.085l-1.97,0.172l-1.285,0.685l-1.884,1.627l-1.627,1.712l-2.227,2.141\n          l-2.14,0.856l-3.769,1.028l-2.398,2.056l-1.113,2.568l-0.256,1.713c0,0-0.515,2.141-0.601,2.483\n          c-0.086,0.343-1.369,2.227-1.541,2.484c-0.172,0.256-1.027,2.998-1.027,3.254c0,0.257,0.171,3.083,0.171,3.083l0.6,1.37\n          c0,0,0.6,1.37,0.343,1.626c-0.258,0.257-0.172,3.683-0.172,3.683l-1.027,1.37c0,0-1.455-0.513-1.799-0.599\n          c-0.343-0.086-1.541-0.856-1.541-0.856s-0.771-2.227-0.855-2.741c-0.086-0.514-0.172-2.483-0.515-2.911\n          c-0.344-0.429-1.114-0.942-1.541-1.542c-0.429-0.6-1.628-1.97-1.628-2.227c0-0.257,0.171-1.97,0.171-2.227\n          c0-0.256,1.028-2.398,1.028-2.398s1.884-0.771,2.227-0.942c0.342-0.171,0.856-2.569,0.856-2.569v-2.227\n          c0,0-0.258-0.343-0.856-1.027c-0.601-0.686-4.452-0.343-4.452-0.343l-2.056-1.284l-2.142-2.74c0,0-1.113-1.713-1.027-2.056\n          c0.085-0.342,0.855-3.597,0.855-3.597l0.429-8.136l-0.257-2.74l-0.856-1.798c0,0-3.939-2.569-4.282-2.569\n          c-0.342,0-2.397-0.514-2.397-0.514l-0.513-1.113l2.568-2.998l3.083-1.542l1.969-1.712l2.056-3.254l2.484-4.025l2.054-2.911\n          l1.8-2.827l0.428-1.712l0.515-1.713l0.341-1.542c0,0,0.43-1.113,0.601-1.37c0.17-0.257,1.198-2.141,1.198-2.141\n          s0.601-2.569,0.601-2.826c0-0.257,0.427-2.141,0.427-2.398c0-0.257,0.856-2.997,0.856-2.997L280.714,67.098z"></path>\n      <path class="path_estado estado rondonia" id="estado_rondonia" fill="#ffffff" d="M137.614,184.42\n          c0,0-3.254-0.599-3.768-0.599c-0.514,0-3.512,0.086-4.111,0c-0.599-0.084-2.911-0.256-2.911-0.256l-2.055-1.371l-0.942-1.627\n          l-1.284-0.686l-3.169-0.513l-2.055-0.429l-1.199-1.114l-1.113-1.37l-0.686-1.285l-0.942-0.599l-1.627,0.686h-1.455l-0.942-0.857\n          l-1.285-0.771l-1.456-0.086l-2.997,0.343l-2.056-0.942l-1.712-1.97l-2.398-2.141l-1.37-1.37l-1.285-1.798l-0.942-2.826l0.171-3.854\n          l-0.514-1.798l-0.428-2.227l1.113-1.028l0.085-4.453l-0.771-1.627h-1.97c0,0-3.425,0.085-3.938,0.085\n          c-0.514,0-3.512,0.771-3.512,0.771l-2.056,0.6l-0.428-0.6l0.685-0.942l1.028-1.114c0,0,1.37-0.256,1.627-0.256\n          c0.257,0,2.141,0,2.141,0l2.655-0.086l2.74-0.514h3.169l1.284-0.856l1.199-1.627l1.028-1.113h4.454c0,0,1.284-0.086,1.456-0.514\n          c0.171-0.428,0.342-1.97,0.342-1.97l1.542-0.942l0.342-1.97l0.771-1.028l1.456-0.086l1.113-2.055l1.113-0.942l1.627,0.086h2.655\n          l1.627,1.284l2.483,1.626l1.627,1.799l1.627,1.712l1.284,0.856l1.199,0.171l1.027-0.257h1.285l0.799,2.256l-0.229,1.255\n          l0.343,1.712l0.228,1.599l-0.115,2.855l-0.57,2.055l0.342,2.855l0.228,1.484v1.485l-0.113,2.17l0.456,0.57l0.229,1.143l3.083-0.229\n          l4.11,0.115h3.997l0.457,1.37l2.169,0.343l1.256,0.57l-0.229,1.028l-1.256,1.37l-0.114,1.6l0.8,2.168l1.255,2.17l0.115,4.225\n          l-1.028,1.141l-2.055,2.969L137.614,184.42z"></path>\n      <path class="path_estado estado mato-grosso estado_ativo" id="estado_mato-grosso" fill="#ffffff" d="M131.391,139.833l29.345,0.456l0.8-1.941\n          l1.027-2.854l0.229-2.854v-2.398l0.456-1.827l0.457-1.485l0.8,0.115l0.457,0.571l0.228,1.37l1.027,1.941l0.914,3.083l0.571,4.796\n          l1.37,1.37l7.65,6.28l3.083,0.457l12.445,0.457l27.177,1.141l19.753,1.371l-0.114,1.028l-0.798,2.626l-2.74,7.65\n          c0,0-0.344-0.229-0.229,3.311c0.114,3.54,0.114,10.962,0.114,10.962l0.685,2.968c0,0,0.115,3.311-1.256,5.139\n          c-1.369,1.826-2.054,5.253-2.054,5.253l-1.028,6.393l-1.143,1.828l-2.398,1.255l-1.94,1.828l-1.599,2.284l-0.685,2.054l-1.371,0.8\n          l-2.397,1.599l-1.941,1.712L216,212.338l-2.056,2.969l-1.711,2.284l-1.484,1.714l-0.229,1.597l-0.113,2.285l0.798,1.255\n          l-0.112,0.799v1.941h-3.655l-0.342-1.255l0.342-2.285l-0.342-1.256l-0.912-1.828l-1.714-0.114l-1.827,1.257l-1.027,0.913\n          c0,0-1.599,0-2.284,0s-2.283-0.685-2.283-0.685l-1.37,0.229l-4.225,0.228l-2.741-1.142c0,0-0.456-0.457-1.94-1.484\n          s-2.626-0.914-3.083-0.914s-2.854-0.228-3.996,0.229c-1.143,0.456-0.57,0.571-1.713,0.571c-1.142,0-2.513,0.913-2.855,1.142\n          c-0.342,0.229-1.484,2.055-1.484,2.055l-0.685,1.257l-2.056-0.116h-0.799l-1.027-1.027l-2.398-1.485l-1.941-0.456l-2.169-1.486\n          l-0.799-1.14l-0.571-3.882v-1.486l0.913-0.685l0.343-1.483v-1.257l-17.584-0.114l-0.343-3.311l-0.685-3.311l-0.571-0.8\n          l-1.027-0.798l-0.571-1.485h1.941l0.342-2.397l-0.456-3.426l-0.914-1.369l-0.913-6.052l-1.142-0.914l1.37-1.257l5.139-7.536\n          l0.113-7.079l-1.026-1.37l-0.572-1.942l0.343-1.484c0,0,0.686-2.17,0.343-2.626s-0.686-1.028-1.027-1.37\n          c-0.343-0.342-2.969-1.028-2.969-1.028s-2.74-1.028-3.083-1.028c-0.343,0-7.764,0.115-7.764,0.115l0.228-4.567l-1.027-1.941\n          l0.57-2.398L131.391,139.833z"></path>\n      <path class="path_estado estado mato-grosso-do-sul estado_ativo" id="estado_mato-grosso-do-sul" fill="#ffffff" d="M167.245,224.213l0.571,2.626\n          c0,0,1.257,1.597,1.37,2.055c0.114,0.457,0.114,2.284,0.114,2.284l-1.599,1.826l-0.229,2.97c0,0,0.57,2.284,0.456,2.626\n          c-0.113,0.343-1.826,2.625-1.826,2.625l-1.599,1.828l-0.229,1.714l1.37,1.712l-1.028,2.056c0,0-0.569,1.141-0.685,1.598\n          c-0.114,0.458,0.571,1.483,0.571,2.056c0,0.57,0.914,2.512,0.914,2.855c0,0.342,0.57,1.826,0.57,1.826v3.083l0.343,4.224v2.513\n          l3.426,0.343l0.799,0.229h4.339l4.91-0.114l3.197,0.685l2.169,0.687l1.256,1.255l1.027,2.056l0.457,2.74v2.512l0.8,0.686\n          l0.913,1.483l0.229,2.056l0.457,2.74l0.799,1.027l2.741-0.228l1.37-0.8l1.598-0.799l2.056,0.114l0.913,1.027l1.256,0.229\n          l0.914-1.141l0.229-2.628l2.055-1.599l0.343-1.597l1.256-1.599l1.485-1.714l4.566-2.397l1.714-1.713l2.854-2.626l4.566-3.54\n          c0,0,0.001-1.483,0.115-1.827c0.114-0.341,1.256-1.712,1.256-1.712l0.228-2.056l1.6-2.513l2.397-3.311l1.826-2.397l1.826-1.486\n          l0.801-0.569v-6.737l-2.627-0.799l-3.539-1.143c0,0-3.768-1.942-4.34-2.397c-0.571-0.457-2.17-1.142-2.626-1.485\n          c-0.456-0.342-2.282-0.456-2.854-0.456c-0.571,0-1.826,0.228-2.397-0.229c-0.572-0.456,0-3.654,0-3.654s-2.057-0.571-2.284-1.028\n          c-0.229-0.456,0.229-1.028-0.456-1.37c-0.686-0.343-2.397-0.343-3.197-0.343s-2.74,0-2.74,0l-0.686-2.169l0.913-1.028l0.571-1.37\n          l0.456-1.712l-0.912,0.342l-0.571,0.457l-1.941,0.8h-2.17c0,0-2.169,0.114-2.512,0.114s-2.512,0.228-2.512,0.228s-1.941,0-2.627,0\n          c-0.685,0-1.712,0.115-2.397-0.342c-0.685-0.458-2.055-0.913-2.397-1.028s-2.626-1.599-2.626-1.599s-0.913-0.457-1.37-0.457\n          s-2.398,0.343-2.74,0.343c-0.343,0-2.855,0.913-2.855,0.913l-1.484,1.143l-1.484,1.14l-1.484,1.485l-1.142,0.115\n          c0,0-1.713-0.228-2.17-0.343S167.245,224.213,167.245,224.213z"></path>\n      <path class="path_estado estado goias" id="estado_goias" fill="#ffffff" d="M238.723,177.969l2.056,1.257l1.94,1.485\n          l1.941,0.341l1.941,1.827l2.397,0.686l0.457-3.083l1.483-0.914l3.427-0.114l0.341,2.056l0.459,1.485l1.369,0.228l2.398-0.228\n          l1.94,0.228l1.599,0.914l0.799,0.456l2.514,0.115v-1.257l2.397-0.571l1.712-1.026l2.399-0.571l2.396-0.686l2.056-0.457l1.369,0.114\n          l0.114,3.54l-0.799,0.457l0.229,6.053l0.8,1.026l1.027,1.371l0.685,0.457v3.768l-0.228,0.685l-1.027-0.114l-1.257-1.028\n          l-1.371-0.572l-1.483,0.115l-0.457,1.371v1.142l-2.054,0.455l-1.371,0.229v1.483v3.198l0.457,1.256v0.685l0.228,1.37l-1.484,0.115\n          l-2.17,0.228l-1.256,2.399l-0.456,1.828l-0.114,1.826l0.457,1.483l0.685,0.8l0.914,1.371l0.113,1.028l-1.37,1.142l-1.256,1.37\n          l-0.457,1.257l0.229,1.369l1.027,0.457l0.456,0.799v2.055v1.028l-1.37,1.028l-1.712,0.914l-1.257,1.369l-0.344,0.914l-1.254-0.685\n          l-2.171-0.458h-2.625l-2.969-0.112c0,0-1.485,0.341-1.827,0.341c-0.343,0-2.056,0.572-2.056,0.572l-1.37,1.141l-2.74-0.228\n          l-3.654,0.571c0,0-1.599,0.343-1.941,0.343c-0.342,0-1.94,1.599-1.94,1.599l-1.713,2.055l-1.257,1.37l-2.054,2.398l-2.17-1.601\n          l-2.398-1.255c0,0-1.369-0.799-1.94-0.799c-0.572,0-2.854-1.371-3.197-1.371s-1.941-1.257-2.284-1.369\n          c-0.342-0.114-0.914-0.914-1.942-1.257c-1.026-0.343-2.168-0.798-2.168-0.798l-1.027-1.142l-0.229-1.257l-1.712-1.028l-0.457-2.054\n          v-1.828l-0.342-1.599l-0.343-3.196l1.482-3.313l1.714-0.914l1.713-1.483l0.8-2.398l3.312-3.882l1.94-0.685l2.169-0.914l0.343-1.142\n          l0.914-2.513l1.713-2.398l1.483-0.685l2.056-1.597l0.686-1.941l1.026-4.453l1.257-2.398l0.572-2.398c0,0,0-1.483,0.456-2.397\n          c0.457-0.914,0.57-3.083,1.027-3.311c0.456-0.228,0.914-2.398,0.914-2.398L238.723,177.969z"></path>\n      <polygon class="path_estado estado parana estado_ativo" id="estado_parana" fill="#ffffff" points="202.07,286.101 202.07,290.439 \n          201.841,293.866 201.841,297.634 200.358,299.347 199.672,299.802 200.471,300.259 201.499,300.259 202.298,299.574 \n          202.983,299.916 204.353,302.087 205.153,303.684 205.61,305.854 207.779,306.883 210.406,307.338 212.917,307.567 \n          215.658,307.681 218.398,308.024 219.426,308.822 221.824,309.507 225.478,310.308 228.332,310.421 229.13,309.623 \n          229.246,308.365 229.932,306.883 232.672,306.767 234.156,306.653 235.413,305.284 236.325,304.483 238.722,304.483 \n          241.92,304.483 244.431,304.483 245.003,305.739 246.144,306.312 247.286,306.197 248.772,305.055 250.255,304.712 \n          251.854,304.712 253.68,304.712 254.822,305.396 255.622,305.396 256.308,304.142 256.763,302.542 257.905,301.401 \n          258.249,300.374 259.048,299.802 258.933,298.089 257.905,297.291 256.421,297.291 255.051,297.176 254.48,296.72 254.594,295.006 \n          254.594,293.637 248.2,293.637 247.628,291.125 247.401,288.611 246.374,286.899 244.888,285.644 244.775,284.159 244.431,280.962 \n          244.203,278.45 242.719,276.966 240.778,276.738 233.7,276.623 231.986,275.481 230.844,274.797 229.473,274.453 228.332,274.226 \n          225.136,273.998 221.482,273.769 220.225,273.769 217.713,273.769 215.772,273.883 213.603,273.883 212.461,273.883 \n          210.519,274.797 208.578,276.395 206.637,278.222 205.953,279.821 203.668,282.332 202.87,283.931  "></polygon>\n      <path class="path_estado estado sao-paulo estado_ativo" id="estado_sao-paulo" fill="#ffffff" d="M215.315,271.371l3.313,0.229l3.425,0.228\n          h2.74l2.627,0.229l2.056,0.456l2.169,1.371l1.599,0.457h3.197h2.511h2.97l1.599,0.343l0.685,1.027l1.028,1.028l0.912,0.912\n          l0.458,1.257v1.826v1.37l0.114,1.486l0.455,1.14l0.572,0.229l0.342,1.142l0.801,1.027l0.228,1.256L249,290.212l0.114,1.026\n          l2.398,0.113h3.195l1.028,0.229l0.572,1.142l0.113,1.599l0.342,0.685l1.599,0.114l1.601,0.572l0.342,0.57l1.142-0.343l1.142-1.828\n          l2.396-1.369c0,0,1.142-0.912,1.371-1.256c0.229-0.342,3.54-2.283,3.54-2.283l2.17-1.941l1.257-1.027l2.282-0.913l1.599-0.572\n          l1.257-0.228l1.484-1.484l5.822-0.114l0.914-1.599l2.626-1.599l1.37-0.571l2.284-0.228l1.483-0.343l-0.114-1.027l0.114-1.028\n          l1.371-1.369v-2.056h-1.713l-1.714-1.142h-2.054l-1.94,0.799l-1.828,0.685l-1.599,0.8l-1.941,0.685c0,0,0,0.912-0.342,1.028\n          c-0.343,0.115-3.313,0.115-3.313,0.115l-2.625,0.112l-1.257-0.571l-1.027-2.056l-0.456-1.483c0,0-0.57-1.484-0.685-1.826\n          c-0.115-0.343-0.115-2.626-0.115-2.626l-0.114-2.398l0.114-1.599l0.342-1.599l-1.713-0.457c0,0-1.712,0-2.056-0.685\n          c-0.342-0.687-1.369-2.056-1.369-2.398c0-0.342-0.571-1.712-0.571-2.282c0-0.572-0.113-1.828-0.113-2.628\n          c0-0.799-0.114-1.256-0.114-1.599s-0.8-2.283-0.8-2.283l-1.256-0.914l-1.712-0.228l-1.371,0.342l-2.97,0.572h-3.652l-1.484,0.113\n          l-0.687,1.485l-0.455,1.142l-1.713-0.799l-2.056-0.8l-1.142-1.714c0,0-0.687-1.028-1.484-1.141\n          c-0.799-0.114-1.714-0.114-2.854-0.114c-1.142,0-4.34,0-4.34,0l-2.168-0.686l-1.371-0.114l-1.371,0.685l-1.94,1.028l-1.371,1.827\n          l-2.624,2.056l-2.056,2.512l-0.571,1.712l-1.484,2.17l-0.229,1.827l-1.027,1.598l-0.113,1.486l-1.027,1.712l-2.056,1.483\n          l-2.171,1.942L215.315,271.371z"></path>\n      <path class="path_estado estado rio-de-janeiro estado_ativo" id="estado_rio-de-janeiro" fill="#ffffff" d="M294.902,271.143l3.082-1.827l1.828-0.343\n          l3.425-0.229l2.283-0.569h1.256h1.712l2.285-0.685l1.941-1.027l1.028-0.459l1.254-0.569l0.914-0.913l1.257-1.485l0.457-2.054\n          l0.455-1.486l0.115-1.369l1.598-1.028l0.686,0.457l0.571,1.256c0,0,0.914,0.455,1.257,0.685c0.342,0.229,1.826,0.458,1.826,0.458\n          h2.397h1.027l0.114,3.653l0.571,1.027l-0.113,1.028l-1.027,0.685l-1.828,1.027l-0.8,0.457l-1.599,0.457l-1.483,1.142l-0.799,1.484\n          l-1.027,1.598l-0.572,0.914v1.257l-2.168,0.228c0,0-3.083,0-3.427,0c-0.343,0-2.74,0-2.74,0l-1.027-0.912v-1.144h-1.599\n          l-1.142,0.115v1.827l-0.8,0.913c0,0-2.74-0.115-3.084-0.115c-0.341,0-1.597-0.455-1.597-0.455l-1.713-0.457l-0.914,1.027\n          l-0.913,0.344l-0.571-1.028l0.685-1.6l-0.457-1.256l-1.142-0.457L294.902,271.143z"></path>\n      <path class="path_estado estado espirito-santo" id="estado_espirito-santo" fill="#ffffff" d="M322.306,257.325l1.369,0.572l1.256,0.571\n          l3.654-0.457l0.914-1.027l1.142-1.142l0.914-1.258l1.483-1.826l1.37-1.941l0.685-1.254l0.914-2.398l0.457-2.171l2.283-1.141\n          c0,0,0.799-0.458,0.799-0.914c0-0.457,0.343-2.854,0.343-2.854l0.344-3.882v-2.97l-0.799-2.285l-1.486-0.912l-1.713-1.256\n          l-1.37-0.343h-2.625l-1.144,0.457l-1.026,0.685l-1.027,0.8v1.37l0.113,1.255l0.229,1.712l0.686,1.486l-0.686,1.028l-0.114,0.912\n          v1.713l-0.342,2.171l-0.686,2.625l-0.686,1.484l-1.142,1.371l-0.57,1.483l-0.571,1.027l-1.826,0.343l-1.371,0.686l-0.113,1.941\n          l-0.115,1.94l-0.228,2.171L322.306,257.325z"></path>\n      <path class="path_estado estado minas-gerais" id="estado_minas-gerais" fill="#ffffff" d="M233.614,244.538l0.086,1.028l2.996-0.086\n          h2.912l3.083,0.171l4.111,0.086l2.056,1.028l0.941,1.026l0.856,1.027h1.627l0.513-0.685c0,0,0.43-0.599,1.028-0.599\n          c0.601,0,2.142,0.085,2.74,0c0.601-0.086,1.285-0.515,1.628-0.515c0.342,0,2.654-0.256,2.654-0.256s1.885-0.344,2.142-0.344\n          c0.256,0,2.312,0,2.312,0l1.456,0.514l0.856,0.856l0.856,1.027l0.514,1.799l0.514,1.884v1.884l0.428,1.628l0.258,0.856l0.685,1.113\n          l1.027,1.198l1.199,0.686l1.028,0.256l1.283,0.601l0.429,1.199l-0.085,1.455l-0.172,1.371l-0.514,1.198v1.712l0.086,1.629\n          l0.514,1.369l0.429,0.771l0.771,1.199l0.086,1.199l0.171,0.856h1.455l2.142-0.086l0.428-1.113l0.941-1.198l1.457-0.515l0.513,0.515\n          c0,0,1.2,0.085,1.457-0.086c0.256-0.171,1.027-0.6,1.027-0.6l1.885-0.6l1.369-0.771l1.113-0.601l2.228-0.513l1.884-0.429\n          l1.283-0.514l1.371-0.429l1.97-0.427l1.884-0.258l1.284-0.257l1.457-0.171h2.568l1.798-0.085l1.885-0.687\n          c0,0,1.97-0.856,1.97-1.112c0-0.257,1.884-1.456,1.884-1.456l1.027-1.455l0.856-2.142l0.771-2.056l0.687-1.285l0.855-1.541\n          l0.942-1.199l0.514-1.713l0.6-1.97l1.112-1.369l2.57-0.086l0.685-1.113l0.856-2.056l1.113-1.455c0,0,0.086-1.113,0.086-1.542\n          c0-0.428,0.599-2.912,0.599-2.912l-0.343-1.455l-0.599-0.771l0.257-1.798l0.856-0.515l-0.086-1.541l-0.942-0.685\n          c0,0,0.086-1.199,0.086-1.542c0-0.342,0.771-1.712,0.771-1.712l0.429-0.685c0,0,0.086-1.2,0.686-1.542\n          c0.599-0.342,1.199-0.513,1.199-0.513l0.685-0.086l0.771,0.171h1.97h1.371l0.17-0.77l-1.884-1.714c0,0-1.112-1.626-1.198-1.884\n          c-0.086-0.256,0.17-2.826,0.17-2.826l0.429-2.568l0.942-0.513h1.455l0.172-1.371l0.686-1.626l0.942-1.114l0.856-1.028l0.085-2.056\n          l-2.141-1.028l-1.543-0.685l-1.798-0.685c0,0-1.112,0-1.369,0c-0.258,0-1.885,0-1.885,0h-1.199l-1.285,0.513h-1.111l-0.344-1.198\n          l-0.343-1.714l-1.369-1.198l-0.856-1.113l-0.942-0.429c0,0-1.199-0.171-1.542-0.171c-0.342,0-1.884,0-1.884,0l-0.856-0.084\n          l-1.541-0.6l-2.998-1.627l-1.97-1.541l-1.455-1.2c0,0-1.027-0.085-1.371-0.085c-0.343,0-1.626,0.171-1.626,0.171l-0.172,0.856\n          l-1.199,0.085l-2.056-0.085l-1.455-1.542l-0.429-1.026l-0.428-0.942l-1.199-0.771l-1.541-0.259l-1.542,0.087l-3.082,2.14\n          l-5.225,3.34l-4.71,2.312l-2.142,0.686l-1.369,0.599l-0.172-2.313c0,0-1.027-1.198-1.285-1.198c-0.256,0-1.627,0-1.627,0\n          l-1.027,1.284l-1.455,0.515l-0.856,0.256l0.086,2.484l0.513,1.798l-0.085,1.97l-0.342,1.455l-1.543,0.856l-1.369-0.17l-1.456,0.685\n          l-0.172,1.541l-0.17,2.569l0.855,1.199l0.171,1.457l0.171,1.541l-0.171,1.456l-1.284,0.942l-0.601,1.113l0.258,1.371l0.685,0.343\n          l0.258,1.456l-0.342,1.97l0.256,1.626c0,0-0.514,0.515-0.685,1.028c-0.172,0.515-1.627,1.884-1.627,1.884l-1.97,0.771l-1.627,1.542\n          l-0.942,1.028l-1.113-1.285c0,0-1.371-0.942-1.798-0.942c-0.429,0-1.714,0-1.714,0h-2.569l-2.312-0.085l-1.37,0.257l-0.942,1.113\n          l-1.369,0.513l-1.97,0.171l-1.799,0.342l-2.313,0.343l-1.713,0.085c0,0-1.027,0.086-1.285,0.343\n          c-0.257,0.256-1.284,0.599-1.541,1.455s-2.484,3.425-2.484,3.425s-1.626,2.056-1.884,2.484\n          C233.614,243.167,233.614,244.538,233.614,244.538z"></path>\n      <path class="path_estado estado santa-catarina estado_ativo" id="estado_santa-catarina" fill="#ffffff" d="M206.867,308.939v2.511l0.113,2.512\n          l0.229,1.37l1.94,0.115h2.514l2.281,0.114l2.515,0.342l3.425,0.914l2.056,0.912l1.597,0.343l2.056,0.685l1.828,0.459l1.484,0.799\n          l7.992,7.649l1.712,0.571l2.285-0.114h2.511c0,0,0.687-0.342,0.914,0.343c0.229,0.685,0.686,1.483,0.686,1.483l-0.229,1.371\n          l-0.571,1.257l-1.369,1.483l-0.571,1.257l1.37,0.342l1.37,0.57l0.914-1.37l1.94-1.713l1.713-1.483l3.083-1.6\n          c0,0,0.8-0.685,0.914-1.141c0.112-0.457,0.914-3.313,0.914-3.313l0.685-2.511l0.228-2.74v-2.628l-0.114-3.082c0,0,0-2.283,0-2.626\n          c0-0.342-0.113-2.855-0.113-2.855l-0.343-1.598l-2.056-1.599h-1.828l-1.483,0.571l-0.914,0.798l-1.027,0.229l-1.94,0.571\n          l-1.027-0.457l-0.686-0.799l-0.685-0.8l-1.714,0.115l-1.484,0.112l-2.283,0.343h-1.485l-1.255,1.371l-1.028,0.799l-1.941-0.114\n          l-0.685,0.685l-1.028,1.371l-0.57,1.256h-1.371h-1.597l-1.713-0.229l-2.398-0.229l-2.283-0.571l-1.942-0.685l-1.826-0.57\n          l-1.826-0.229h-1.257l-2.854-0.456l-2.169-0.229L206.867,308.939z"></path>\n      <path class="path_estado estado rio-grande-do-sul estado_ativo" id="estado_rio-grande-do-sul" fill="#ffffff" d="M170.328,345.706l1.826-0.229l1.599-1.027\n          l1.827-0.685l1.714,0.342l1.598,1.714l2.626,2.281l2.17,2.399v1.484l0.913,1.027l1.256-0.343l1.484-0.8l1.027-0.569l1.143,1.027\n          l0.685,0.799l1.028,1.369l1.484,1.257l1.713-0.343l1.483,1.484l1.714,0.799l1.256,0.914l1.484,1.713l1.142,1.484l1.713-0.114\n          l1.826,1.37l0.343,1.142l1.256,1.143l1.257,1.713c0,0,0.456-0.002,0.799,0.228s1.713,1.144,1.713,1.144l0.913,1.027l-0.115,2.625\n          l-0.911,1.256c0,0-1.485,0.8-1.485,1.142c0,0.343-0.114,4.682-0.114,4.682l1.142-0.914l1.713-1.254l2.396-1.144l1.028-1.939\n          l1.941-2.056l0.687-2.97l1.027-2.854l1.026-1.712v-2.97l1.028-1.712l1.37-1.143l0.114-2.626l2.513-0.57l1.255-0.913l0.342-2.741\n          l1.601-1.142l1.142-4.796l1.026-0.571l1.6,0.457l0.114,0.799l1.255,0.457l0.914-1.026l1.256-0.344h1.713l-0.114,2.74l-1.141,1.143\n          l-1.37,1.941l-2.399,2.168l-1.142,2.056l-1.027,1.6l-2.283,1.483l-2.513,1.599c0,0-1.484,0.685-1.826,0.912\n          c-0.344,0.229-1.257,0.802-1.257,0.802l0.115,1.369l0.912-0.115l1.257-0.113l1.941-0.914l2.282-1.713l2.171-2.056l2.17-2.055\n          l2.396-2.741l2.74-3.768l1.713-3.195l1.941-3.998l0.8-2.169l1.141-2.627l-1.027-0.685l-1.483-0.343l-0.229-2.169l0.914-2.284\n          l1.257-1.939v-0.914l-3.083,0.229l-2.513-0.572l-1.826-0.455l-2.399-2.398l-1.369-1.599l-1.826-1.713c0,0-1.94-1.142-2.398-1.484\n          c-0.457-0.342-2.627-0.914-2.627-0.914s-2.396-0.914-3.083-1.027c-0.685-0.113-2.74-0.113-3.425-0.456s-3.539-0.8-3.882-0.914\n          c-0.343-0.113-2.058-0.912-4.226-0.798c-2.169,0.113-4.908,0.113-5.709,0.113c-0.8,0-2.512,0-2.512,0l-1.713,1.256l-1.941,1.371\n          l-2.626,1.254l-2.056,1.257l-1.827,1.142l-1.826,1.027l-20.325,20.553L170.328,345.706z"></path>\n      <path class="path_estado estado tocantins" id="estado_tocantins" fill="#ffffff" d="M256.821,105.806l2.569,0.342l2.056,0.856\n          l2.568,1.028l0.857,1.712l0.856,3.425l-0.343,3.768l-0.172,3.426l-0.685,1.712l-0.685,1.713l0.17,1.884l2.056,1.371l1.199,1.712\n          l1.541,1.884l2.57,1.199h2.568l0.685,1.884l-0.856,1.541l-1.712,0.857l-1.199,1.541l-0.342,1.884l-0.343,1.884l0.855,1.37\n          l1.541,2.055l1.028,1.542l0.343,1.884l0.514,1.541l1.199,1.884l1.027,0.857l1.541,1.027l1.884,0.343l0.687,1.028l-1.199,0.856\n          l-1.541,1.712l-1.028,1.542l-1.199,2.056l-0.171,2.569v1.542l2.056,1.37c0,0,0.171,0.342,0,1.028c-0.172,0.685,0,3.597,0,3.597\n          l-0.856,1.199v2.055l0.685,1.199l-0.172,2.056l-1.369,0.172l-4.111,1.712l-2.911,0.685l-3.426,0.513l-1.884,0.343l-0.343,1.028\n          l-2.569-1.371l-1.712-0.685l-1.543-0.685l-1.712-1.027l-1.369-1.371h-1.371l-2.74,0.171l-1.884,1.371l-0.856,1.712l-2.056-0.685\n          l-1.713-0.686l-1.199-1.37l-1.541-2.74c0,0,0.342-1.371-0.343-1.371s-2.568,1.371-2.568,1.371l-0.856-3.083v-5.652l0.685-6.166\n          l1.713-4.967l1.542-2.912l0.685-3.083l0.343-3.596l1.026-2.056l2.742-2.912l1.369-1.37l1.371-2.055l1.027-2.227l0.685-2.911v-2.055\n          l-0.685-2.398l0.171-2.569l0.686-2.912l2.569-1.37l2.396-2.055l1.714-1.884l1.026-2.569l0.687-2.912v-2.569l-1.543-1.884\n          L256.821,105.806z"></path>\n      <path class="path_estado estado bahia" id="estado_bahia" fill="#ffffff" d="M277.717,164.382l0.171-2.741l1.198-2.569\n          l1.884-1.027l1.199-1.199l1.543-1.713l1.541,0.343l1.027,1.541l1.199,1.37l1.541,0.514l2.056,1.028l1.369-0.171l2.056-1.199\n          l1.542-0.686h2.74l1.028-1.198l2.397-2.056l1.541-2.569l0.515-1.37v-1.884l-0.344-0.686l-0.171-1.884l0.855-1.198h1.714\n          l1.028,0.685c0,0,1.712-0.171,2.397,0c0.685,0.171,1.199,1.028,1.199,1.028h2.396l1.885-0.514l2.398-1.028l2.911-0.685l2.227-0.856\n          l1.37-2.227l1.541-1.028l2.228-1.027l1.369,0.685l0.343,1.027l0.344,1.542l0.342,2.398l1.37,1.198l1.713,0.342l3.083-2.055\n          l1.884-1.884l1.885-0.514l1.369-2.055l1.199-1.371l1.371-0.514h1.197l1.199,0.514l1.713,0.686l1.371,0.514l2.226,1.541l1.199,1.027\n          l1.371,1.028l1.369,1.028l0.685,2.398l-0.17,1.541l0.342,1.199l1.542,0.856v0.856l-0.172,5.31l-1.37,0.685l-1.37,0.685v1.884\n          l0.342,1.37l0.856,1.713l1.199,1.884l1.884,1.712l1.713,0.856l-0.856,2.569l-2.568,3.083l-2.228,2.569l-1.884,2.228l-0.17-1.029\n          l-1.542-1.026l-1.885-0.172l-1.712,0.515c0,0-0.685,1.026-0.685,1.541c0,0.513,0.171,1.541,0.171,1.541v2.056l-0.857,1.712\n          l-1.198,2.227l0.342,3.253l0.343,1.712l0.514,1.371l-0.17,1.542l-0.344,1.026l0.172,4.624l0.342,3.598l-0.17,2.054l0.685,1.371\n          v1.712l-0.343,3.083l-0.856,1.884l-0.342,2.74l-0.687,2.397l-0.855,1.542v2.912l0.685,0.513v1.371l-2.397,2.226l-2.228,2.74\n          l-1.197,0.343l-1.714-1.028l-0.856-1.712l-0.342-1.712l-1.371-1.028l-0.855-1.541l-0.344-1.714l0.172-1.369l1.542-1.713\n          l1.198-2.227l1.714-1.712l1.026-2.227v-2.569l-2.74-2.055l-2.568-1.028l-2.228-0.856h-2.397h-2.396l-1.199-0.685l-0.515-1.371\n          l-1.885-1.884l-1.541-0.856c0,0-1.884-0.343-2.568-0.343c-0.687,0-1.884-0.513-1.884-0.513l-2.57-0.856L313,196.582l-2.056-1.028\n          l-1.199-0.513l-2.569-0.171l-1.884,0.342l-1.371,0.513l-0.685-1.369l-0.515-1.712l-1.026-1.37l-2.912-0.515l-1.542,0.172\n          l-2.568,0.685l-2.569,1.884l-3.083,1.542l-2.568,1.712l-2.399,1.198l-1.712,1.371l0.172-2.397c0,0,0.341-2.57-0.172-3.085\n          c-0.514-0.513-1.199-2.567-1.199-2.567l-1.198-1.884l-0.343-3.427l0.343-1.542l0.342-2.911v-3.768l-0.685-2.056l-0.515-3.425\n          l0.857-1.712l0.514-2.228l-0.856-2.74L277.717,164.382z"></path>\n      <polygon class="path_estado estado alagoas" id="estado_alagoas" fill="#ffffff" points="358.558,147.083 360.271,148.282 \n          362.326,148.796 364.553,150.166 366.951,151.536 369.692,154.276 370.376,154.79 369.521,155.989 366.781,159.757 \n          364.725,161.984 363.012,164.553 361.641,164.724 359.929,164.382 358.901,163.183 357.874,161.984 357.189,160.442 357.36,158.9 \n          358.901,158.729 359.757,156.502 359.929,153.249 359.757,150.851 358.901,149.48 357.874,148.282 357.874,146.912  "></polygon>\n      <polygon class="path_estado estado sergipe" fill="#ffffff" points="357.189,144.685 358.73,145.542 \n          360.614,146.74 362.498,147.426 364.553,148.453 365.752,149.31 367.293,150.166 369.177,151.536 370.718,152.563 372.261,153.078 \n          373.802,151.707 376.371,149.652 378.597,146.912 380.31,144.856 381.509,143.658 382.194,141.602 382.538,140.232 \n          379.968,139.546 377.742,139.89 376.201,140.403 375.344,142.801 373.46,143.828 371.062,144.171 368.321,144.171 365.752,144.171 \n          364.21,143.486 362.498,142.458 361.47,141.602 360.1,141.602 358.558,142.458 357.702,143.658   "></polygon>\n      <path class="path_estado estado piaui" id="estado_piaui" fill="#ffffff" d="M321.221,83.026h1.369l2.056,0.686\n          l0.515,0.856l-0.856,1.199l-0.343,1.37l0.171,1.37l1.199,1.884l0.856,2.055l1.028,1.884v1.884l0.513,2.056v3.939l0.685,5.995\n          l0.172,2.569l0.343,1.884l0.685,3.426l0.686,1.884l0.514,1.37l1.713,1.199l0.514,1.541c0,0-0.342,1.028-0.856,1.2\n          c-0.514,0.17-1.198,1.884-1.198,1.884l0.17,2.398l0.687,1.884l0.342,1.713l-0.685,2.055l-2.912,1.712l-2.912,2.227l-2.056,1.884\n          l-2.226,2.398l-2.398,1.37l-2.397,0.171L315.054,144l-1.713,0.514h-2.055l-1.37-0.171l-2.056-0.685l-2.568-0.514l-1.371,0.171\n          l-0.856,1.028l-1.199,1.37l-0.17,2.056v1.712l-0.515,2.056l-1.027,1.37l-1.37,1.37l-1.884,0.514l-1.884,1.028l-1.884,1.028\n          l-1.885,0.685c0,0-0.686-0.514-1.714-0.685c-1.026-0.171-1.026-0.171-1.026-0.171l-1.199-1.542l-0.686-1.199l-1.026-0.685h-2.228\n          l-0.171-2.569l-0.172-2.227v-2.398l-0.513-1.884l-0.344-2.74l0.856-2.227l1.027-1.884l1.2-2.74l0.685-2.74l0.515-1.884l1.027-1.028\n          l1.369-1.028l1.543-0.514l1.884-0.685l2.226-0.857l2.228-2.055l1.712-1.884l1.541-1.199l2.228-0.342l1.712-0.171l1.884,0.343h1.885\n          l2.056-0.857l1.199-2.226l0.171-2.398l-0.515-1.37l-0.855-1.542l0.343-2.227l0.342-1.712l0.686-1.37l1.026-1.371l-0.513-1.712\n          l-0.172-2.569l-0.342-3.083v-2.056l0.342-2.227l1.028-1.712l1.37-2.398l1.713-0.514l3.597-2.056l1.541-2.055L321.221,83.026z"></path>\n      <path class="path_estado estado ceara" id="estado_ceara" fill="#ffffff" d="M327.557,83.197l-0.685,1.541l-0.515,1.371\n          l0.172,1.884l0.172,0.856l0.685,1.198l0.686,1.37l0.514,1.028v1.712l0.856,1.713l0.171,1.884v2.74l0.172,1.884l0.172,2.912\n          l0.342,2.912l0.171,2.911l0.343,2.227c0,0,0.172,1.028,0.342,1.884c0.172,0.856,1.199,2.74,1.199,2.74l1.713,0.856l0.687,1.199\n          l-0.344,2.055c0,0,0.172,0.686-0.343,1.2c-0.514,0.514-0.342,1.712-0.342,1.712l1.884,0.171l2.397-0.171l2.228-0.171h1.884\n          l1.541,0.513l1.884,1.199l1.541,1.884l1.371-0.172l1.712-1.712l1.028-1.199l-0.514-1.541l-0.515-1.199v-2.227l1.028-2.226\n          l0.343-2.57l1.713-2.912l2.396-2.912l1.714-2.911l1.541-2.741l1.37-2.569l2.398-1.542l-4.453-3.939l-3.768-2.911l-1.028-1.542\n          c0,0-1.542-1.028-2.056-1.028c-0.515,0-2.227-1.028-2.227-1.028l-2.397-1.712l-2.568-1.712l-2.57-1.371l-2.569-1.37h-2.74h-3.596\n          h-1.713L327.557,83.197z"></path>\n      <path class="path_estado estado rio-grande-do-norte" id="estado_rio-grande-do-norte" fill="#ffffff" d="M362.669,102.038h1.541l2.227,0.856\n          l2.056,1.027l2.74,0.171h3.254h2.741l2.397,0.343l1.884,1.027l1.199,1.542v1.199l1.028,2.569v1.884l0.341,2.74l-0.513,1.028h-2.912\n          h-3.425l-2.227-0.856l-1.541-0.342l-1.028,0.342l-1.199,1.199l-0.171,1.371l-0.344,1.541h-1.712l-0.856-1.198l-2.226,0.171h-0.858\n          l-0.513-1.199l1.371-2.398v-1.712l-2.57-0.514l-2.397,0.342l-1.371,1.37l-2.396,1.37c0,0-1.199,0.343-1.713,0.343\n          c-0.515,0-1.714,0.171-1.714-0.343c0-0.514,1.542-2.568,1.542-2.568l1.198-2.056l2.57-3.939L362.669,102.038z"></path>\n      <path class="path_estado estado estado26 paraiba" fill="#ffffff" stroke="#ffffff" stroke-width="0.7199" stroke-miterlimit="10" d="M352.735,118.651l-0.856,2.227l0.343,1.542\n          l0.856,1.37l-0.343,2.055l-0.342,1.542l1.027,0.514l2.056,0.171l2.74-0.514l2.226-1.542l2.74-1.713l1.028-0.171l2.74,0.514\n          l0.343,1.712l-0.685,0.856l-0.856,2.912v1.199l0.514,0.685l1.542,0.343l1.198-1.542l2.227-1.542h1.541l3.255-0.514l2.74-0.685\n          l2.056-1.884l1.369-1.028l1.543-0.342h2.911v-1.713c0,0,0.171-2.055-0.343-2.226c-0.515-0.172-1.027-1.884-1.027-1.884\n          l-0.856-0.686l-4.111-0.685h-2.74l-2.397-0.171h-2.056l-0.855,1.712l-1.371,1.884l-2.056,0.343l-1.541-1.199l-1.713,0.171\n          l-1.199,0.685l-1.199-1.027l-1.197-1.713l0.855-2.568l1.198-1.713h-1.541l-1.884,1.028l-0.856,1.37l-1.541,0.686l-1.027,0.171\n          l-2.398,0.171L352.735,118.651z"></path>\n      <polygon class="path_estado estado pernambuco" id="estado_pernambuco" fill="#ffffff" stroke="#ffffff" stroke-width="0.7199" stroke-miterlimit="10" points="328.757,137.663 330.641,139.204 \n          331.326,140.574 331.498,141.773 332.353,143.144 332.353,143.828 332.868,144.685 334.066,144 335.093,142.801 336.122,141.088 \n          337.833,141.088 338.862,139.546 340.404,138.176 342.629,136.806 344.342,136.292 346.056,136.635 347.94,137.32 349.824,137.663 \n          351.537,139.033 353.762,140.232 354.961,141.773 356.845,141.602 358.73,140.232 360.1,139.375 361.641,140.403 363.526,141.602 \n          365.238,142.116 367.293,142.972 370.548,142.801 373.289,142.63 373.802,141.602 375.001,139.718 376.201,138.862 \n          377.913,138.348 379.797,138.348 381.681,138.348 383.565,138.348 384.25,137.148 384.934,135.265 385.621,133.038 \n          386.648,129.784 386.648,127.386 385.278,126.53 383.222,126.358 381.852,127.214 380.653,128.242 379.112,129.099 \n          377.742,129.784 375.514,130.126 373.802,130.126 372.261,130.812 370.376,131.668 369.521,132.867 368.321,134.237 \n          366.266,134.408 365.066,133.38 364.553,131.497 364.553,129.612 364.896,127.214 365.066,126.358 364.21,126.016 362.669,126.358 \n          361.128,127.386 359.073,128.928 357.531,129.784 354.791,129.612 353.592,129.612 352.05,129.612 349.653,129.612 \n          347.425,129.784 345.542,129.612 344,127.729 342.117,126.701 340.574,126.701 337.321,126.358 332.868,126.188 333.209,127.558 \n          333.381,128.756 334.066,130.64 334.066,131.497 333.209,133.038 332.01,134.408 330.469,135.778   "></polygon>\n      <g>\n          <path class="path_estado estado para" id="estado_para" fill="#ffffff" d="M157.739,43.204l-0.086,6.509l0.172,2.74\n              c0,0,0.514,4.282,0.514,4.71s0.514,2.226,0.514,2.226l1.541,1.114l0.857,1.028l0.428,1.969l1.113,1.456l1.455,1.713l1.37,1.456\n              l1.714,0.171l1.626,0.172l0.601,0.256l1.37-0.514l1.199,0.085l1.284,0.856l1.456,1.713l1.798,0.685l1.884,1.113l1.799,0.086\n              l0.941-0.856l1.456-0.257l1.628,0.856l-0.172,1.37l-0.172,1.456l-0.855,0.343l-0.856,2.055l-0.514,1.97l-1.285,1.456l-1.884,4.796\n              l-16.014,32.371l0.085,1.285l1.199,1.456l0.171,1.371c0,0,1.113,1.027,1.027,1.284c-0.085,0.257,0,2.227,0,2.227l1.028,1.114\n              l0.771,1.113l0.771,2.227l1.114,1.284l0.256,2.312l0.086,3.426l1.97,1.456l2.313,1.884l1.541,1.627l1.885,1.627l1.284,0.342\n              l3.597,0.257l4.796,0.513l1.284,0.514l12.161,0.514l11.389,0.085l7.536,0.6h7.622l10.362,0.428l3.083,0.086l1.113-2.826\n              l2.569-4.196c0,0,1.884-1.884,2.141-2.055c0.258-0.172,1.541-1.712,1.541-1.712l0.942-2.57l0.257-2.654l-0.343-1.798l-0.941-1.028\n              l0.257-2.655l1.027-1.456l0.428-1.969l0.515-1.884c0,0,0.685-0.429,1.113-0.685c0.428-0.257,2.655-2.142,2.655-2.142l1.712-1.027\n              l0.856-1.285l1.371-2.483l0.085-2.312l-0.085-2.227l-0.942-0.171l-1.713-0.771l-0.686-1.712l2.142-2.569l5.48-4.71l2.911-1.284\n              l2.142-2.741l4.281-6.851l2.997-4.025l0.172-2.826L274.633,79l1.114-1.969l1.199-2.826l0.427-4.282l0.856-1.113v-2.74\n              l-1.541-0.942h-2.654l-0.771-1.37c0,0-2.656-0.343-3.083-0.514c-0.429-0.171-2.142-0.342-2.142-0.342l-2.483-0.257l-2.227-0.428\n              l-1.455,0.171l-1.028,1.028l-5.311,5.737l-2.996,3.683l-2.313,1.284l-2.483,0.086l-1.37-0.857l-1.199,0.085l-0.685,1.028\n              l-0.514,1.028l-1.542-0.6l-1.456-1.199l-4.11-0.771c0,0-1.284-0.599-1.541-0.771c-0.258-0.171-1.371-1.712-1.371-1.712\n              l-1.283-2.826l-0.687-0.6h-1.97l-2.654,1.627l-2.483,1.199l-3.939,0.771l-1.027-1.028l0.515-1.884l2.226-0.428l-0.172-1.027\n              l-2.568-0.343c0,0-1.37-1.456-1.713-1.626c-0.343-0.171-1.627-2.227-1.627-2.227l-0.343-2.141l-1.285-1.627l-2.654-3.682\n              c0,0-0.428-2.227-0.856-2.912c-0.429-0.685-0.685-2.055-0.685-2.568c0-0.514-1.113-2.056-1.628-2.484\n              c-0.514-0.428-1.026-2.484-1.37-2.998c-0.343-0.513-1.712-1.712-1.712-1.712l-2.655-1.542l-2.74-1.97c0,0-2.055-0.428-2.398-0.685\n              c-0.342-0.257-2.312-1.028-2.482-1.37c-0.172-0.342-0.514-2.569-0.514-2.569l-0.258-2.398l-1.027-1.284c0,0-1.884,0-2.141,0\n              c-0.258,0-2.227,0.6-2.227,0.6l-1.027,0.771h-2.228l-1.198-0.257l-0.257,1.113l0.085,1.884v1.713l-0.257,0.771h-2.312h-1.456\n              l-4.025-0.342l-2.055,0.171c0,0-2.313-0.171-2.74-0.085c-0.429,0.085-2.912,1.712-2.912,1.712l-2.228,0.856l-2.312,1.114\n              l-3.769,1.284l-1.798,1.285L157.739,43.204z"></path>\n          <path class="path_estado estado para" id="estado_para" fill="#ffffff" d="M239.18,70.009l1.028-0.686l1.369-0.342\n              l0.856,0.342l1.027,0.514l1.199-0.686l1.028-1.027l1.199-0.685l1.197,0.514l0.856-0.514l1.542-1.37l1.885-0.172l1.541-2.226\n              l1.37-2.056l0.342-1.712l0.515-1.712l-2.74-0.172l-1.884-0.342h-2.398l-1.198,0.171h-2.398l-1.541-0.514l-2.056-0.685\n              l-1.712,0.343l-0.687,1.884l-0.17,1.542l-0.172,1.884c0,0,0.342,1.884,0,2.398c-0.343,0.514-0.515,2.74-0.515,2.74l-0.171,2.398\n              L239.18,70.009z"></path>\n          <polygon class="path_estado estado para" id="estado_para" fill="#ffffff" points="246.202,55.622 247.916,54.423 \n              247.23,52.882 245.86,53.053 244.833,54.766    "></polygon>\n          <path class="estado para" fill="#ffffff" d="M244.661,50.655l-0.856,2.227\n              l-0.171,1.198c0,0-1.028-0.342-1.541-0.342c-0.515,0-2.57-0.342-2.57-0.342l0.856-1.542l1.542-1.884L244.661,50.655z"></path>\n          <polygon class="path_estado estado para" id="estado_para" fill="#ffffff" points="234.384,56.821 232.5,58.876 \n              232.158,56.821 232.672,54.594 234.556,53.566 236.268,53.566 236.268,54.594 235.583,56.136     "></polygon>\n          <polygon class="path_estado estado para" id="estado_para" fill="#ffffff" points="229.246,62.13 227.705,63.843 \n              226.333,66.07 224.792,66.926 225.821,64.186 227.362,61.445 228.561,60.76    "></polygon>\n          <polygon class="path_estado estado para" id="estado_para" fill="#ffffff" points="235.413,61.616 234.213,61.959 \n              233.528,62.815 234.556,63.158 235.583,63.672 237.468,62.644 236.268,61.274    "></polygon>\n          <polygon class="path_estado estado para" id="estado_para" fill="#ffffff" points="236.097,58.191 237.468,58.191 \n              237.638,56.136 236.44,56.649    "></polygon>\n          <polygon class="path_estado estado para" id="estado_para" fill="#ffffff" points="236.954,66.583 236.782,67.954 \n              235.241,67.954 235.069,66.412 235.241,65.384 236.268,65.384"></polygon>\n      </g>\n  </svg>\n  '
};

exports.default = Component;

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('map', []).component('map', _component2.default);

},{"./component.js":23}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

var _geolocation = require('./factory/geolocation.js');

var _geolocation2 = _interopRequireDefault(_geolocation);

var _fixedOnScroll = require('./directive/fixedOnScroll.js');

var _fixedOnScroll2 = _interopRequireDefault(_fixedOnScroll);

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

exports.default = angular.module('common', ['file', 'map']).service('CommonService', _common2.default).controller('Header', _header2.default).controller('Footer', _footer2.default).service('CityService', _city2.default).service('CategoryService', _category2.default).service('ActivityAreaService', _activityArea2.default).factory('FacebookFactory', _facebook2.default.facebookFactory).factory('CreditCardFactory', _creditcard2.default.creditCardFactory).factory('GeoLocationFactory', _geolocation2.default.geoLocationFactory).service('FacebookService', _facebook4.default).service('StorageService', _storage2.default).service('Hydrator', _hydrator2.default).service('NotificationService', _notification2.default).directive('fixedOnScroll', _fixedOnScroll2.default.directiveFactory);

},{"./component/file/file.js":20,"./component/map/map.js":24,"./controller/footer.js":25,"./controller/header.js":26,"./directive/fixedOnScroll.js":27,"./factory/creditcard.js":28,"./factory/facebook.js":29,"./factory/geolocation.js":30,"./service/activityArea.js":32,"./service/category.js":33,"./service/city.js":34,"./service/common.js":35,"./service/facebook.js":36,"./service/hydrator.js":37,"./service/notification.js":38,"./service/storage.js":39}],32:[function(require,module,exports){
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

},{"./common.js":35}],33:[function(require,module,exports){
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

},{"./common.js":35}],34:[function(require,module,exports){
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

},{"./common.js":35}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationService = function () {
  function NotificationService(API, $http) {
    _classCallCheck(this, NotificationService);

    this.API = API;
    this.http = $http;
    this.config = {};
    this.route = 'notifications';
  }

  _createClass(NotificationService, [{
    key: 'subscribe',
    value: function subscribe(data) {
      if (!data.type) {
        this.config['headers'] = {};
        this.config.headers['token'] = this.API.token;
      }
      return this.http.post(this.API.url + this.route + '/subscribe', data, this.config);
    }
  }, {
    key: 'subscribeConfirm',
    value: function subscribeConfirm(uuid) {
      this.config['headers'] = {};
      this.config.headers['token'] = this.API.token;
      return this.http.get(this.API.url + this.route + '/subscribe/confirm/' + uuid, this.config);
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
}();

exports.default = NotificationService;


NotificationService.$inject = ['API', '$http'];

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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
      var _profile = this.profile;
      var name = _profile.name;
      var email = _profile.email;
      var type = _profile.type;

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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./config.js":40,"./controller/confirmation.profile.js":41,"./controller/confirmation.subscribe.js":42}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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
    this.donate.is_anonymous = false;
    this.logged = StorageService.getItem('token');
  }

  _createClass(DonateBillet, [{
    key: 'buildBillet',
    value: function buildBillet() {
      var _this = this;

      if (this.logged) {
        delete this.donate.name;
        delete this.donate.email;
        delete this.donate.birthdate;
        if (this.donate.document) delete this.donate.document;
      }
      var method = this.logged ? 'printLoggedBillet' : 'printPublicBillet';
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

    if (!this.stateParams.slug) {
      this.state.go('pages.explore');
    }

    this.eventService.findById(this.stateParams.slug).then(function (response) {
      return _this.uuid = response.data.uuid;
    });

    if (this.logged) {
      this.profileService.me().then(function (response) {
        // console.log(response)
        var _response$data = response.data;
        var name = _response$data.name;
        var birthdate = _response$data.birthdate;
        var email = _response$data.email;
        var document = _response$data.document;

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
        delete donate.document;
      }
      donate.card_validate = donate.card_month + '/' + donate.card_year;
      donate.card_number = donate.card_number.replace(/\-/g, '');
      var modalInstance = this.modal.open({
        templateUrl: './../src/donate/view/donate.card.html',
        controller: 'DonateCard',
        controllerAs: 'ctrl',
        resolve: {
          data: function data() {
            return {
              uuid: _this2.uuid,
              donate: donate
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
      var modalInstance = this.modal.open({
        templateUrl: './../src/donate/view/donate.billet.html',
        controller: 'DonateBillet',
        controllerAs: 'ctrl',
        resolve: {
          data: function data() {
            return {
              uuid: _this3.uuid,
              donate: donate
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
        var printBillet = _this3.window.open(billet, 'Imprimir boleto', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
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
      //5165-3011-0835-3140
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

},{}],48:[function(require,module,exports){
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

},{"./config.js":44,"./controller/donate.billet.js":45,"./controller/donate.card.js":46,"./controller/donate.event.js":47,"./service.js":49}],49:[function(require,module,exports){
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

  function DonateService(API, $http) {
    _classCallCheck(this, DonateService);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DonateService).call(this, API, $http));
  }

  _createClass(DonateService, [{
    key: 'pay',
    value: function pay(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/credit_card');
      return this.$http.post(this.url + this.route, data, this.config);
    }
  }, {
    key: 'payLogged',
    value: function payLogged(uuid, data) {
      return this.pay(uuid, data);
    }
  }, {
    key: 'payPublic',
    value: function payPublic(uuid, data) {
      this.setPublicToken();
      return this.pay(uuid, data);
    }
  }, {
    key: 'printBillet',
    value: function printBillet(uuid, data) {
      this.setRoute('payments/event/' + uuid + '/boleto');
      return this.$http.post(this.url + this.route, data, this.config);
    }
  }, {
    key: 'printLoggedBillet',
    value: function printLoggedBillet(uuid, data) {
      return this.printBillet(uuid, data);
    }
  }, {
    key: 'printPublicBillet',
    value: function printPublicBillet(uuid, data) {
      this.setPublicToken();
      return this.printBillet(uuid, data);
    }
  }]);

  return DonateService;
}(_common2.default);

exports.default = DonateService;


DonateService.$inject = ['API', '$http'];

},{"./../common/service/common.js":35}],50:[function(require,module,exports){
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
  }).state('event.explore', {
    url: '/explore',
    templateUrl: './src/event/view/event.explore.html',
    controller: 'EventExplore',
    controllerAs: 'ctrl'
  }).state('event.report', {
    url: '/:uuid/relatorio',
    templateUrl: './src/event/view/event.report.html',
    controller: 'EventReport',
    controllerAs: 'ctrl'
  }).state('event.slug', {
    url: '/:slug',
    templateUrl: './src/event/view/event.html',
    controller: 'Event',
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

  return EventExplore;
}();

EventExplore.$inject = ['ActivityAreaService', 'EventService', 'StorageService'];

exports.default = EventExplore;

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event($rootScope, $state, $stateParams, EventService) {
  var _this = this;

  _classCallCheck(this, Event);

  this.rootScope = $rootScope;
  this.$state = $state;
  this.service = EventService;
  this.event = {};
  var event = void 0;
  if ($stateParams.slug) {
    EventService.findById($stateParams.slug).then(function (response) {
      event = response.data;
      console.log(event);
      event.ends = new Date(event.ends);
      event.progress = Math.floor(event.total_receive / event.goal * 100);
      _this.event = event;
    });
  }
};

exports.default = Event;


Event.$inject = ['$rootScope', '$state', '$stateParams', 'EventService'];

},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventReport = function () {
  function EventReport($stateParams, EventService, StorageService) {
    _classCallCheck(this, EventReport);

    this.service = EventService;
    this.user = StorageService.getItem('user');
    if ($stateParams.uuid) {
      this.getReport($stateParams.uuid);
    }
    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.active = 0;
  }

  _createClass(EventReport, [{
    key: 'getRepeat',
    value: function getRepeat(num) {
      return new Array(num);
    }
  }, {
    key: 'getReport',
    value: function getReport(id) {
      var _this = this;

      this.service.getReportPublic(id).then(function (response) {
        console.log(response.data);
        _this.report = response.data;
        _this.slides = [{
          id: 0,
          image: 'assets/images/perfil/carlos.jpg'
        }, {
          id: 1,
          image: 'assets/images/perfil/fernanda.jpg'
        }, {
          id: 2,
          image: 'assets/images/perfil/pedro.png'
        }];
        console.log(_this.slides);
      }, function (error) {
        return console.error(error);
      });
    }
  }]);

  return EventReport;
}();

EventReport.$inject = ['$stateParams', 'EventService', 'StorageService'];

exports.default = EventReport;

},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventStart = function () {
  function EventStart($rootScope, $state, $window, $stateParams, $filter, CityService, EventService, CategoryService, InstitutionService) {
    var _this = this;

    _classCallCheck(this, EventStart);

    this.rootScope = $rootScope;
    this.$state = $state;
    this.window = $window;
    this.filter = $filter;
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

    this.popovers = {
      name: {
        title: 'O nome da sua campanha',
        text: 'Você deve começar sua campanha pela escolha de um título. Por exemplo: "ajudando a causa X", "correndo pela causa Y" ou “fazendo um aniversário para a causa W". Uma dica: coloque nomes que chamem a atenção de seus parentes e amigos para quando o evento do bem  for compartihado em  suas mídias sociais.'
      },
      institution: {
        title: 'A instituição que quer ajudar',
        text: 'Para garantir a legitimidade das causas financiadas, o projeto beneficiado deve ser cadastrado na nossa plataforma. Você também pode procurar projetos e instituições já cadastrados em nosso portfolio de inspiração. Caso queira sugerir uma causa de interesse, entre em contato por aqui.'
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
        title: 'Meta e data limite',
        text: 'Aqui você pode definir uma meta financeira, que é definida por duas informações: um valor e uma data-limite para a duração da campanha. Todas as nossas campanhas tem no mínimo 22 dias, pois é o tempo adequado para mobilizar seus amigos, mesmo que seu evento do bem tenha uma data específica, a maioria dos eventos batem a meta depois da data específica. Logo as datas de aniversários, casamentos entre outros não são limitantes mas motivadoras e impulsionadoras da captação de ajuda para a causa que você acredita.'
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
    key: 'getSlugByName',
    value: function getSlugByName(name) {
      var _this2 = this;

      this.service.getSlugByName(name).then(function (response) {
        return _this2.event.uri = response.data.slug;
      });
    }
  }, {
    key: 'setPopoverContent',
    value: function setPopoverContent(field) {
      this.popoverContent = this.popovers[field];
    }
  }, {
    key: 'save',
    value: function save(event) {
      var _this3 = this;

      event = angular.copy(event);
      event.institution_uuid = event.institution_uuid.uuid;
      // let end_date = event.end_date.split('/')
      // event.end_date = `${end_date[2]}-${end_date[1]}-${end_date[0]}`
      console.log(JSON.stringify(event));
      this.service.save(event).then(function (response) {
        _this3.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: 'Obrigado por criar seu evento! em breve entraremos em contato pra lhe ajudar e criar seus Eventos do Bem! :)' });
      }, function (error) {
        _this3.rootScope.$broadcast('alert', { type: 'alert-warning', icon: 'fa-exclamation', message: error.data.message });
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


EventStart.$inject = ['$rootScope', '$state', '$window', '$stateParams', '$filter', 'CityService', 'EventService', 'CategoryService', 'InstitutionService'];

},{}],55:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('event', []).config(_config2.default).controller('Event', _event2.default).controller('EventStart', _eventStart2.default).controller('EventExplore', _eventExplore2.default).controller('EventReport', _eventReport2.default).service('EventService', _service2.default);

},{"./config.js":50,"./controller/event.explore.js":51,"./controller/event.js":52,"./controller/event.report.js":53,"./controller/event.start.js":54,"./service.js":56}],56:[function(require,module,exports){
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

    _this.$http = $http;
    _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', _this).call(_this, 'events');
    return _this;
  }

  _createClass(EventService, [{
    key: 'findAll',
    value: function findAll(params) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events');
      if (params != undefined) {
        _get(Object.getPrototypeOf(EventService.prototype), 'setParams', this).call(this, params);
      }
      return _get(Object.getPrototypeOf(EventService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events');
      _get(Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      return _get(Object.getPrototypeOf(EventService.prototype), 'findById', this).call(this, id);
    }
  }, {
    key: 'search',
    value: function search(data) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events');
      _get(Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      _get(Object.getPrototypeOf(EventService.prototype), 'setParams', this).call(this, data);
      return _get(Object.getPrototypeOf(EventService.prototype), 'search', this).call(this);
    }
  }, {
    key: 'getSlugByName',
    value: function getSlugByName(name) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/create/previewSlug/' + name);
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'save',
    value: function save(data) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/create');
      return _get(Object.getPrototypeOf(EventService.prototype), 'postWithFile', this).call(this, data, progress);
    }
  }, {
    key: 'getReport',
    value: function getReport(id) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/report');
      return this.$http.get(this.url + this.route);
    }
  }, {
    key: 'getReportPublic',
    value: function getReportPublic(id) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/report');
      _get(Object.getPrototypeOf(EventService.prototype), 'setPublicToken', this).call(this);
      return this.$http.get(this.url + this.route, this.config);
    }
  }, {
    key: 'saveReport',
    value: function saveReport(id, data, progress) {
      _get(Object.getPrototypeOf(EventService.prototype), 'setRoute', this).call(this, 'events/' + id + '/report/submit');
      return _get(Object.getPrototypeOf(EventService.prototype), 'postWithFile', this).call(this, data, progress);
    }
  }]);

  return EventService;
}(_common2.default);

exports.default = EventService;


EventService.$inject = ['API', '$http'];

},{"./../common/service/common.js":35}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"./config.js":57,"./controller/faq.js":58,"./service.js":60}],60:[function(require,module,exports){
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

},{"./../common/service/common.js":35}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"./config.js":61,"./controller/home.js":62}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InstitutionConfig;
function InstitutionConfig($stateProvider) {
  $stateProvider.state('instituition', {
    url: '/instituition/:slug',
    templateUrl: './src/institution/view/page.html',
    controller: 'Page',
    controllerAs: 'ctrl'
  });
}

},{}],65:[function(require,module,exports){
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
        var _response$data = response.data;
        var name = _response$data.name;
        var birthdate = _response$data.birthdate;
        var email = _response$data.email;
        var type = _response$data.type;

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
        return _this2.institution = response.data;
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

},{}],66:[function(require,module,exports){
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

},{"./config.js":64,"./controller/page.js":65,"./service.js":67}],67:[function(require,module,exports){
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InstitutionService).call(this, API, $http));
  }

  _createClass(InstitutionService, [{
    key: 'findById',
    value: function findById(slug) {
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions');
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setPublicToken', this).call(this);
      return _get(Object.getPrototypeOf(InstitutionService.prototype), 'findById', this).call(this, slug);
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions');
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setPublicToken', this).call(this);
      return _get(Object.getPrototypeOf(InstitutionService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'savePage',
    value: function savePage(data, progress) {
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions/' + data.uuid + '/page');
      return _get(Object.getPrototypeOf(InstitutionService.prototype), 'postWithFile', this).call(this, data, progress);
    }
  }, {
    key: 'search',
    value: function search(data) {
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setRoute', this).call(this, 'institutions');
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setPublicToken', this).call(this);
      _get(Object.getPrototypeOf(InstitutionService.prototype), 'setParams', this).call(this, data);
      return _get(Object.getPrototypeOf(InstitutionService.prototype), 'search', this).call(this);
    }
  }]);

  return InstitutionService;
}(_common2.default);

exports.default = InstitutionService;


InstitutionService.$inject = ['API', '$http'];

},{"./../common/service/common.js":35}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function () {
  function Contact($rootScope, API, $http) {
    _classCallCheck(this, Contact);

    this.rootScope = $rootScope;
    this.API = API;
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

      this.http.post(this.API.url + 'contact', data, {
        headers: {
          token: this.API.token
        }
      }).then(function (response) {
        _this.rootScope.$broadcast('alert', {
          type: 'alert-success',
          icon: 'fa-check',
          message: 'Legal ter entrado em contato :) aguarde nosso retorno.'
        });
        _this.contact = angular.copy(_this.master);
        contact.$setPristine();
      });
    }
  }]);

  return Contact;
}();

exports.default = Contact;


Contact.$inject = ['$rootScope', 'API', '$http'];

},{}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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
        return _this2.institutions = response.data.values;
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

},{}],74:[function(require,module,exports){
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

},{"./config.js":68,"./controller/about.js":69,"./controller/campaign.js":70,"./controller/contact.js":71,"./controller/donate.billet.js":72,"./controller/explore.js":73}],75:[function(require,module,exports){
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
  }).state('profile.check', {
    url: '/verifique',
    templateUrl: './src/profile/view/profile.check.html'
  }).state('profile.change', {
    url: '/alterar',
    templateUrl: './src/profile/view/change.html',
    controller: 'ProfileChange',
    controllerAs: 'ctrl'
  });
}

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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
      var _profile = this.profile;
      var name = _profile.name;
      var email = _profile.email;
      var type = _profile.type;

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

},{}],78:[function(require,module,exports){
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
      var _profile$institutions = profile.institutions;
      var uuid = _profile$institutions.uuid;
      var name = _profile$institutions.name;
      var cnpj = _profile$institutions.cnpj;
      var bank_account = _profile$institutions.bank_account;
      var coords = _profile$institutions.coords;
      var address = _profile$institutions.address;
      var phone = _profile$institutions.phone;
      var areaActivity = _profile$institutions.areaActivity;
      var facebook = _profile$institutions.facebook;

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

      profile = angular.copy(profile);
      delete profile.avatar;
      console.log(profile);
      // birthdate = profile.birthdate.split('/')
      // profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
      // profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
      this.service.change(profile).then(function (response) {
        _this2.storage.setItem('token', response.data.token);
        var _response$data = response.data;
        var name = _response$data.name;
        var email = _response$data.email;
        var type = _response$data.type;

        _this2.storage.setItem('profile', { name: name, email: email, type: type });
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

},{}],79:[function(require,module,exports){
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
          message: 'Você tem ' + _this.pendings.length + ' relatórios pendentes.'
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

},{}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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
        this.state.go('auth.login');
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


ProfileRegister.$inject = ['$scope', '$stateParams', '$state', '$filter', '$timeout', 'ActivityAreaService', 'ProfileService'];

},{}],85:[function(require,module,exports){
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
    this.reader = new FileReader();
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

      this.service.change(profile, function (progress) {
        _this.progress = progress;
      }).then(function (response) {
        _this.storage.setItem('token', response.data.token);
        var _response$data = response.data;
        var name = _response$data.name;
        var email = _response$data.email;
        var type = _response$data.type;
        var avatar = _response$data.avatar;

        _this.storage.setItem('profile', { name: name, email: email, type: type, avatar: avatar });
        _this.rootScope.$broadcast('profile.change');
        _this.profile.password = '';
        _this.profile.new_password = '';
        _this.rootScope.$broadcast('alert', { type: 'alert-success', icon: 'fa-check', message: 'Dados alterados com sucesso!' });
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

},{}],86:[function(require,module,exports){
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
    this.rootScope.$broadcast('alert', { type: 'alert-info', icon: 'fa-warning', message: ' Veja nosso <a href="#">kit</a> para bombar suas campanhas!' });
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserReport = function () {
  function UserReport(EventService, ProfileService, $stateParams) {
    _classCallCheck(this, UserReport);

    this.service = EventService;
    this.profileService = ProfileService;
    if ($stateParams.uuid) {
      this.getEvent($stateParams.uuid);
    }
  }

  _createClass(UserReport, [{
    key: 'getEvent',
    value: function getEvent(id) {
      var _this = this;

      var event = void 0;
      this.service.findById(id).then(function (response) {
        event = response.data;
        event.progress = event.total_receive / event.goal * 100;
        _this.event = event;
        _this.profileService.getEventPayments(id).then(function (response) {
          _this.donors = response.data.values.map(function (donor) {
            donor.updated_at = new Date(donor.updated_at);
            return donor;
          });
        });
      });
    }
  }]);

  return UserReport;
}();

exports.default = UserReport;


UserReport.$inject = ['EventService', 'ProfileService', '$stateParams'];

},{}],90:[function(require,module,exports){
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

var _userImpacts = require('./controller/user.impacts.js');

var _userImpacts2 = _interopRequireDefault(_userImpacts);

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

exports.default = angular.module('profile', []).config(_config2.default).service('ProfileService', _service2.default).controller('ProfileRegister', _register2.default).controller('ProfileConfirmation', _confirmation2.default).controller('ProfileUser', _user2.default).controller('ProfileOng', _ong2.default).controller('UserConfigurations', _userConfigurations2.default).controller('OngConfigurations', _ongConfigurations2.default).controller('UserEvents', _userEvents2.default).controller('UserImpacts', _userImpacts2.default).controller('OngEvents', _ongEvents2.default).controller('UserReport', _userReport2.default).controller('OngPage', _ongPage2.default).controller('OngReport', _ongReport2.default).controller('OngHistory', _ongHistory2.default).controller('ProfileChange', _change2.default);

},{"./config.js":75,"./controller/change.js":76,"./controller/confirmation.js":77,"./controller/ong.configurations.js":78,"./controller/ong.events.js":79,"./controller/ong.history.js":80,"./controller/ong.js":81,"./controller/ong.page.js":82,"./controller/ong.report.js":83,"./controller/register.js":84,"./controller/user.configurations.js":85,"./controller/user.events.js":86,"./controller/user.impacts.js":87,"./controller/user.js":88,"./controller/user.report.js":89,"./service.js":91}],91:[function(require,module,exports){
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
      _get(Object.getPrototypeOf(ProfileService.prototype), 'setRoute', this).call(this, 'users/me/events');
      if (params != undefined) {
        _get(Object.getPrototypeOf(ProfileService.prototype), 'setParams', this).call(this, params);
      }
      return _get(Object.getPrototypeOf(ProfileService.prototype), 'findAll', this).call(this);
    }
  }, {
    key: 'getEventPayments',
    value: function getEventPayments(uuid) {
      _get(Object.getPrototypeOf(ProfileService.prototype), 'setRoute', this).call(this, 'users/me/events/' + uuid + '/payments');
      return _get(Object.getPrototypeOf(ProfileService.prototype), 'findAll', this).call(this);
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


ProfileService.$inject = ['API', '$http', 'FacebookService'];

},{"./../common/service/common.js":35}]},{},[1]);
