export default function run($rootScope, $window, $location, $state, $anchorScroll) {
  $rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
    $rootScope.$broadcast('alert-clear')
    if (toState.authenticate && !$window.localStorage.getItem('token')) {
      $state.go('auth.login')
    }
    switch(toState.name) {
      case 'profile.register': $rootScope.background = 'auth-login'; break;
      case 'auth.login': $rootScope.background = 'auth-login'; break;
      case 'auth.forgot': $rootScope.background = 'auth-login'; break;
      case 'auth.recovery': $rootScope.background = 'auth-login'; break;
      default: $rootScope.background = null;
    }
    // $location.hash('scrollArea')
    // $anchorScroll('scrollArea')
  })
}

run.$inject = ['$rootScope', '$window', '$location', '$state', '$anchorScroll']