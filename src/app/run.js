export default function run($rootScope, $window, $location, $state, $anchorScroll, LastStateUnloggedService) {
  $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
    if (toState.authenticate && !$window.localStorage.getItem('token')) {
      LastStateUnloggedService.setName(toState.name)
      LastStateUnloggedService.setParams(toParams)
      $state.go('auth.login')
      event.preventDefault()
    }
  })
  $rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
    $rootScope.$broadcast('alert-clear')
    switch(toState.name) {
      case 'profile.register': $rootScope.background = 'auth-login'; break;
      case 'auth.login': $rootScope.background = 'auth-login'; break;
      case 'auth.forgot': $rootScope.background = 'auth-login'; break;
      case 'auth.recovery': $rootScope.background = 'auth-login'; break;
      default: $rootScope.background = null;
    }
    // $location.hash('body')
    $anchorScroll('body')
  })
}

run.$inject = ['$rootScope', '$window', '$location', '$state', '$anchorScroll','LastStateUnloggedService']