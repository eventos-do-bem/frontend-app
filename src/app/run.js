export default function run($rootScope, $state) {
  $rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
    switch(toState.name) {
      case 'user.register': $rootScope.background = 'auth-login.jpg'; break;
      default: $rootScope.background = null;
    }
  })
}