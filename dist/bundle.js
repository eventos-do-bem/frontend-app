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
function AppConfig($httpProvider, $injector, $urlRouterProvider, ezfbProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
  $urlRouterProvider.otherwise('/#');
  ezfbProvider.setLocale('pt_BR');
  ezfbProvider.setInitParams({
    appId: '813381015395246',
    version: 'v2.2'
  });
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function AppController($location, $window) {
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

  _classCallCheck(this, AppController);
};

exports.default = AppController;


AppController.$inject = ['$location', '$window'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function config(API, $q, $state, $window) {
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
      // console.log(response)
      // // if (response.status === 401) $state.go('auth-login')
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

var _angularEasyfb = require('angular-easyfb');

var _angularEasyfb2 = _interopRequireDefault(_angularEasyfb);

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

var _module5 = require('./../auth/module.js');

var _module6 = _interopRequireDefault(_module5);

var _module7 = require('./../user/module.js');

var _module8 = _interopRequireDefault(_module7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ui.bootstrap', 'ngMask', 'ezfb', _angularUiRouter2.default, 'ngMessages', 'common', 'home', 'auth', 'user']).config(_config2.default).constant('API', _api2.default).factory('HttpInterceptor', ['API', '$q', '$injector', '$window', _interceptor2.default]).controller('AppController', _controller2.default).run(_run2.default);

},{"./../auth/module.js":11,"./../common/module.js":15,"./../home/module.js":20,"./../user/module.js":26,"./api.json":2,"./config.js":3,"./controller.js":4,"./interceptor.js":5,"./run.js":7,"angular-easyfb":"angular-easyfb","angular-messages":"angular-messages","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router","ng-mask":"ng-mask"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;
function run($rootScope, $state) {
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    switch (toState.name) {
      case 'user.register':
        $rootScope.background = 'auth-login.jpg';break;
      case 'auth.login':
        $rootScope.background = 'auth-login.jpg';break;
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthLogin = function () {
  function AuthLogin($rootScope, $stateParams, $state, $window, $q, AuthService, StorageService, FbService) {
    _classCallCheck(this, AuthLogin);

    this.service = AuthService;
    this.fbService = FbService;
    this.storage = StorageService;
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.rememberme = true;
    this.showPassword = false;
    this.typeInputPassword = 'password';
    this.validate = {
      email: "{'has-error':login.email.$error.email || login.email.$error.required}",
      password: "{'has-error':login.password.$error.required || login.password.$error.minlength}"
    };
  }

  _createClass(AuthLogin, [{
    key: "toggleShowPassword",
    value: function toggleShowPassword() {
      this.showPassword = !this.showPassword;
      this.typeInputPassword = this.showPassword ? 'text' : 'password';
    }
  }, {
    key: "loginFb",
    value: function loginFb() {
      this.fbService.login(function (response) {
        console.log(response);
      }, function (error) {
        console.error(error);
      });
    }
  }, {
    key: "login",
    value: function login() {
      var _this = this;

      this.service.login(this.user).then(function (response) {
        return _this.loginSuccess(response);
      }, function (response) {
        return _this.loginError(response);
      });
    }
  }, {
    key: "loginSuccess",
    value: function loginSuccess(response) {
      var storage = this.storage.getStorage(this.user.rememberme);
      this.$window[storage].setItem('token', response.data.token);
      var _response$data = response.data;
      var email = _response$data.email;
      var name = _response$data.name;

      this.$window[storage].setItem('user', JSON.stringify({ name: name, email: email }));
      this.$rootScope.$broadcast('auth.login');
    }
  }, {
    key: "loginError",
    value: function loginError(response) {
      this.error = response.data;
    }
  }]);

  return AuthLogin;
}();

exports.default = AuthLogin;


AuthLogin.$inject = ['$rootScope', '$stateParams', '$state', '$window', '$q', 'AuthService', 'StorageService', 'FbService'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthLogout = function AuthLogout($rootScope, $stateParams, $state, $window, AuthService) {
  _classCallCheck(this, AuthLogout);

  this.logout = function () {
    AuthService.logout().then(function (response) {
      $window.localStorage.clear();
      $rootScope.$broadcast('auth.logout');
    }, function (error) {
      console.error('error', error);
    });
  };
  this.logout();
};

exports.default = AuthLogout;


AuthLogout.$inject = ['$rootScope', '$stateParams', '$state', '$window', 'AuthService'];

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

var _facebook = require('./social/facebook.js');

var _facebook2 = _interopRequireDefault(_facebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('auth', []).config(_config2.default).controller('AuthLogin', _login2.default).controller('AuthLogout', _logout2.default).service('AuthService', _service2.default).service('FbService', _facebook2.default);

},{"./config.js":8,"./controller/login.js":9,"./controller/logout.js":10,"./service.js":12,"./social/facebook.js":13}],12:[function(require,module,exports){
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

  function AuthService(API, $http) {
    _classCallCheck(this, AuthService);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AuthService).call(this, API, $http));
  }

  _createClass(AuthService, [{
    key: 'login',
    value: function login(data) {
      data = this.setDataToken(data);
      this.setRoute('auth/login');
      return this.$http.post(this.url + this.route, data);
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


AuthService.$inject = ['API', '$http'];

},{"./../common/service/common.js":16}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookService = function () {
  function FacebookService(ezfb) {
    _classCallCheck(this, FacebookService);

    this.ezfb = ezfb;
  }

  _createClass(FacebookService, [{
    key: 'login',
    value: function login(cbSuccess, cbError) {
      var _this = this;

      this.ezfb.login(function (response) {
        console.log(response);
        if (response.authResponse) {
          _this.getMe(function (response) {
            cbSuccess(response);
          });
        } else {
          cbError(response);
        }
      }, { scope: 'public_profile,email' });
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.ezfb.logout();
    }
  }, {
    key: 'getMe',
    value: function getMe(callback) {
      this.ezfb.api('/me', function (response) {
        callback(response);
      });
    }
  }, {
    key: 'getLoginStatus',
    value: function getLoginStatus(callback) {
      this.ezfb.getLoginStatus(function (response) {
        callback(response);
      });
    }
  }]);

  return FacebookService;
}();

exports.default = FacebookService;


FacebookService.$inject = ['ezfb'];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function Header($scope, $state, $window) {
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


Header.$inject = ['$scope', '$state', '$window'];

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./service/common.js');

var _common2 = _interopRequireDefault(_common);

var _header = require('./controller/header.js');

var _header2 = _interopRequireDefault(_header);

var _storage = require('./service/storage.js');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('common', []).service('CommonService', _common2.default).service('StorageService', _storage2.default).controller('Header', _header2.default);

},{"./controller/header.js":14,"./service/common.js":16,"./service/storage.js":17}],16:[function(require,module,exports){
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

var StorageService = function () {
  function StorageService($window) {
    _classCallCheck(this, StorageService);

    this.$window = $window;
  }

  _createClass(StorageService, [{
    key: 'setItem',
    value: function setItem(key, data) {
      this.$window.setItem(key, data);
    }
  }, {
    key: 'getStorage',
    value: function getStorage(storage) {
      if (storage) {
        return 'localStorage';
      } else {
        return 'sessionStorage';
      }
    }
  }]);

  return StorageService;
}();

exports.default = StorageService;


StorageService.$inject = ['$window'];

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./config.js":18,"./controller/home.js":19}],21:[function(require,module,exports){
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
    templateUrl: './src/user/view/me.html',
    controller: 'UserMe',
    controllerAs: 'ctrl'
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

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserChange = function UserChange($scope, $stateParams, $state, UserService) {
  var _this = this;

  _classCallCheck(this, UserChange);

  this.me = function () {
    UserService.me().then(function (response) {
      _this.me = response.data;
    }, function (error) {
      console.error('error: ', error);
    });
  };
};

exports.default = UserChange;


UserChange.$inject = ['$scope', '$stateParams', '$state', 'UserService'];

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserMe = function UserMe($scope, $stateParams, $state, UserService) {
  var _this = this;

  _classCallCheck(this, UserMe);

  this.me = function () {
    UserService.me().then(function (response) {
      _this.me = response.data;
    }, function (error) {
      console.error('error: ', error);
    });
  };
};

exports.default = UserMe;


UserMe.$inject = ['$scope', '$stateParams', '$state', 'UserService'];

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRegister = function () {
  function UserRegister($scope, $stateParams, $state, UserService, FbService) {
    _classCallCheck(this, UserRegister);

    this.service = UserService;
    this.fbService = FbService;
    this.state = $state;
    this.user = {
      gender: 'Feminino'
    };
    this.showPassword = false;
    this.typeInputPassword = 'password';
    this.validate = {
      email: "{'has-error':register.email.$error.email || register.email.$error.required}",
      password: "{'has-error':register.password.$error.required || register.password.$error.minlength}"
    };
  }

  _createClass(UserRegister, [{
    key: 'toggleShowPassword',
    value: function toggleShowPassword() {
      this.showPassword = !this.showPassword;
      this.typeInputPassword = this.showPassword ? 'text' : 'password';
    }
  }, {
    key: 'registerFb',
    value: function registerFb() {
      var _this = this;

      this.fbService.login(function (response) {
        var name = response.name;
        var email = response.email;
        var gender = response.gender;

        gender = gender == 'male' ? 'Masculino' : 'Feminino';
        _this.user = { name: name, email: email, gender: gender };
        _this.register();
      }, function (error) {
        console.error(error);
      });
    }
  }, {
    key: 'register',
    value: function register() {
      var _this2 = this;

      var user = angular.copy(this.user);
      if (user.birthdate) {
        var birthdate = user.birthdate.split('/');
        user.birthdate = birthdate[2] + '-' + birthdate[1] + '-' + birthdate[0];
      }
      this.service.register(user).then(function (response) {
        return _this2.registerSuccess(response);
      }, function (response) {
        return _this2.registerError(response);
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
      console.error(response);
    }
  }]);

  return UserRegister;
}();

exports.default = UserRegister;


UserRegister.$inject = ['$scope', '$stateParams', '$state', 'UserService', 'FbService'];

},{}],26:[function(require,module,exports){
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

var _change = require('./controller/change.js');

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('user', []).config(_config2.default).controller('UserMe', _me2.default).controller('UserChange', _change2.default).controller('UserConfirmation', _confirmation2.default).controller('UserRegister', _register2.default).service('UserService', _service2.default);

},{"./config.js":21,"./controller/change.js":22,"./controller/confirmation.js":23,"./controller/me.js":24,"./controller/register.js":25,"./service.js":27}],27:[function(require,module,exports){
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

  function UserService(API, $http) {
    _classCallCheck(this, UserService);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserService).call(this, API, $http));
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
  }]);

  return UserService;
}(_common2.default);

exports.default = UserService;


UserService.$inject = ['API', '$http'];

},{"./../common/service/common.js":16}]},{},[1]);
