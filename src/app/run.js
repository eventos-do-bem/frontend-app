export default function run($rootScope, $window, $location, $state, $timeout, $anchorScroll, LastStateUnloggedService, ProfileService, uiTourService) {
  $anchorScroll.yOffset = 50
  uiTourService.createDetachedTour('ongTour', {backdrop: false, appendToBody: true, templateUrl: 'tpl-step.html'});
  uiTourService.createDetachedTour('userTour', {backdrop: false, appendToBody: true, templateUrl: 'tpl-step.html'});
  uiTourService.createDetachedTour('ongPageTour', {backdrop: false, appendToBody: true, templateUrl: 'tpl-step.html'});
  $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
    // if (toState.templateUrl) {
    //   ga('send', 'pageview', { page: toState.templateUrl })
    // }
    $timeout.cancel($rootScope.timeout)
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
      case 'pages.not-found': $rootScope.background = 'auth-login'; break;
      default: $rootScope.background = null;
    }
    // $location.hash('body')
    $anchorScroll('body')
  })
  if ($window.localStorage.getItem('token')) {
    ProfileService.me()
  }
}

run.$inject = ['$rootScope', '$window', '$location', '$state', '$timeout', '$anchorScroll','LastStateUnloggedService','ProfileService','uiTourService']