export default function EventConfig($stateProvider) {
  $stateProvider
    .state('event', {
      url: '/evento',
      templateUrl: './src/event/view/index.html'
    })
    .state('event.start', {
      url: '/comecar',
      authenticate: true,
      templateUrl: './src/event/view/start.html',
      controller: 'EventStart',
      controllerAs: 'ctrl'
    })
    .state('event.slug', {
      url: '/:slug',
      templateUrl: './src/event/view/event.html',
      controller: 'Event',
      controllerAs: 'ctrl'
    })
    .state('event.donate', {
      url: '/:slug/doacao',
      templateUrl: './src/event/view/donate.html',
      controller: 'EventDonate',
      controllerAs: 'ctrl'
    })
}