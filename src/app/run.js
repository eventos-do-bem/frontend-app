export default function run($rootScope, $state, StorageService) {
  $rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
    // if (StorageService.identifyStorage()) {
    //   StorageService.setStorage(StorageService.identifyStorage())
    // }
    // console.log(StorageService.getStorage())
    switch(toState.name) {
      case 'user.register': $rootScope.background = 'auth-login.jpg'; break;
      case 'auth.login': $rootScope.background = 'auth-login.jpg'; break;
      default: $rootScope.background = null;
    }
  })
}