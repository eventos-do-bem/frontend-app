export default function run($rootScope, $window, $location, $state, $timeout, $anchorScroll, $templateCache, LastStateUnloggedService, ProfileService, uiTourService) {
  $anchorScroll.yOffset = 50
  $templateCache.put('tour-tpl.html',`
    <p class="tour-step-content" data-ng-bind-html="tourStep.trustedContent"></p>
    <div class="popover-navigation tour-step-navigation">
      <div class="btn-group btn-group-justified">
        <div class="btn-group" role="group" data-ng-if="tourStep.isPrev()">
          <button class="btn btn-default" data-ng-click="tour.prev()" tooltip-placement="top" uib-tooltip="Anterior">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
        </div>
        <div class="btn-group" role="group" data-ng-if="tourStep.isNext()">
          <button class="btn btn-default" data-ng-click="tour.next()" tooltip-placement="top" uib-tooltip="Próxima">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
        <div class="btn-group" role="group">
          <button class="btn btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume" data-ng-click="tour.pause()"
            tooltip-placement="top" uib-tooltip="Pausar">
              <i class="fa fa-pause" aria-hidden="true"></i>
            </button>
        </div>
        <div class="btn-group" role="group">
          <button class="btn btn-primary" data-role="end" data-ng-click="tour.end()" tooltip-placement="top" uib-tooltip="Fechar">
              <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
        </div>
      </div>
    </div>
  `)
  uiTourService.createDetachedTour('ongTour', {backdrop: true, backdropZIndex: 999999999, appendToBody: true, useUiRouter: true, useHotkeys: true, templateUrl: 'tour-tpl.html'});
  uiTourService.createDetachedTour('userTour', {backdrop: true, backdropZIndex: 999999999, appendToBody: true, useUiRouter: true, useHotkeys: true, templateUrl: 'tour-tpl.html'});
  uiTourService.createDetachedTour('ongPageTour', {backdrop: true, backdropZIndex: 999999999, appendToBody: true, useUiRouter: true, useHotkeys: true, templateUrl: 'tour-tpl.html'});
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

run.$inject = ['$rootScope', '$window', '$location', '$state', '$timeout', '$anchorScroll','$templateCache','LastStateUnloggedService','ProfileService','uiTourService']