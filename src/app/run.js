export default function run($rootScope, $window, $state, $anchorScroll) {
  $rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
    if (toState.type) {
      console.log(toState)
    }
    if (toState.authenticate && !$window.localStorage.getItem('token')) {
      $state.go('auth.login')
    }
    switch(toState.name) {
      case 'user.register': $rootScope.background = 'auth-login'; break;
      case 'auth.login': $rootScope.background = 'auth-login'; break;
      default: $rootScope.background = null;
    }
    $anchorScroll()
  })
}

run.$inject = ['$rootScope', '$window', '$state', '$anchorScroll']