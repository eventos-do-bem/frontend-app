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
  "url": "http://dev.eventosdobem.com/api/",
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
function AppConfig($httpProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function AppController($state, $window) {
  _classCallCheck(this, AppController);

  this.brand = 'Eventos do Bem';
  this.logout = function () {
    $window.localStorage.clear();
    $state.go('auth-login');
  };
  this.user = JSON.parse($window.localStorage.getItem('user'));
  this.dropDownMenu = [{
    label: 'Perfil',
    url: 'user-me'
  }];
  this.toggleDropdown = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  };
};

exports.default = AppController;


AppController.$inject = ['$state', '$window'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function config(API, $q, $window) {
  return {
    'request': function request(config) {
      config['headers']['Accept'] = API.accept;
      config['headers']['Content-Type'] = API.contenttype;
      if ($window.localStorage.getItem('token')) {
        config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token');
      }
      return $q.resolve(config);
    },
    'requestError': function requestError(rejection) {
      return $q.reject(rejection);
    },
    'response': function response(_response) {
      return $q.resolve(_response);
    },
    'responseError': function responseError(rejection) {
      return $q.reject(rejection);
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

var _angularMessages = require('angular-messages');

var _angularMessages2 = _interopRequireDefault(_angularMessages);

var _api = require('./api.json');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _interceptor = require('./interceptor.js');

var _interceptor2 = _interopRequireDefault(_interceptor);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

var _module = require('./../common/module.js');

var _module2 = _interopRequireDefault(_module);

var _module3 = require('./../auth/module.js');

var _module4 = _interopRequireDefault(_module3);

var _module5 = require('./../user/module.js');

var _module6 = _interopRequireDefault(_module5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ui.bootstrap', _angularUiRouter2.default, 'ngMessages', 'common', 'auth', 'user']).config(_config2.default).constant('API', _api2.default).factory('HttpInterceptor', _interceptor2.default).controller('AppController', _controller2.default);

},{"./../auth/module.js":9,"./../common/module.js":11,"./../user/module.js":17,"./api.json":2,"./config.js":3,"./controller.js":4,"./interceptor.js":5,"angular-messages":"angular-messages","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AuthConfig;
function AuthConfig($stateProvider) {
  $stateProvider.state('auth-login', {
    url: '/usuario/login',
    templateUrl: './src/auth/view/login.html',
    controller: 'AuthLogin',
    controllerAs: 'ctrl'
  });
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthLogin = function AuthLogin($scope, $stateParams, $state, $window, AuthService) {
  var _this = this;

  _classCallCheck(this, AuthLogin);

  this.rememberme = true;
  this.login = function () {
    AuthService.login(_this.user).then(function (response) {
      $window.localStorage.setItem('token', response.data.token);
      delete response.data.token;
      $window.localStorage.setItem('user', JSON.stringify(response.data));
    }, function (error) {
      console.error('error', error);
      _this.error = error;
    });
  };
};

exports.default = AuthLogin;


AuthLogin.$inject = ['$scope', '$stateParams', '$state', '$window', 'AuthService'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _login = require('./controller/login.js');

var _login2 = _interopRequireDefault(_login);

var _service = require('./service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('auth', []).config(_config2.default).controller('AuthLogin', _login2.default).service('AuthService', _service2.default);

},{"./config.js":7,"./controller/login.js":8,"./service.js":10}],10:[function(require,module,exports){
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
  }]);

  return AuthService;
}(_common2.default);

exports.default = AuthService;


AuthService.$inject = ['API', '$http'];

},{"./../common/service/common.js":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./service/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('common', []).service('CommonService', _common2.default);

},{"./service/common.js":12}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserConfig;
function UserConfig($stateProvider) {
  $stateProvider.state('user-register', {
    url: '/usuario/cadastro',
    templateUrl: './src/user/view/register.html',
    controller: 'UserRegisterController',
    controllerAs: 'ctrl'
  }).state('user-me', {
    url: '/usuario/eu',
    templateUrl: './src/user/view/me.html',
    controller: 'UserMeController',
    controllerAs: 'ctrl'
  }).state('user-change', {
    url: '/usuario/eu/change',
    templateUrl: './src/user/view/change.html',
    controller: 'UserChangeController',
    controllerAs: 'ctrl'
  });
}

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRegister = function UserRegister($scope, $stateParams, $state, UserService) {
  var _this = this;

  _classCallCheck(this, UserRegister);

  this.register = function () {
    UserService.register(_this.user).then(function (response) {
      console.log(response);
    }, function (error) {
      console.error(error);
    });
  };
};

exports.default = UserRegister;


UserRegister.$inject = ['$scope', '$stateParams', '$state', 'UserService'];

},{}],17:[function(require,module,exports){
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

var _me = require('./controller/me.js');

var _me2 = _interopRequireDefault(_me);

var _change = require('./controller/change.js');

var _change2 = _interopRequireDefault(_change);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('user', []).config(_config2.default).controller('UserMeController', _me2.default).controller('UserChangeController', _change2.default).controller('UserRegisterController', _register2.default).service('UserService', _service2.default);

},{"./config.js":13,"./controller/change.js":14,"./controller/me.js":15,"./controller/register.js":16,"./service.js":18}],18:[function(require,module,exports){
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

},{"./../common/service/common.js":12}]},{},[1]);
