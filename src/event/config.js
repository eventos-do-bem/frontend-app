export default function EventConfig($stateProvider) {
  $stateProvider
    .state('event', {
      url: '/evento',
      templateUrl: './src/event/view/index.html'
    })
    .state('event.start', {
      url: '/comecar?categoria?meta?termino?causa',
      authenticate: true,
      templateUrl: './src/event/view/start.html',
      controller: 'EventStart',
      controllerAs: 'ctrl'
    })
    .state('event.explore', {
      url: '/explore?instituicao',
      authenticate: false,
      templateUrl: './src/event/view/event.explore.html',
      controller: 'EventExplore',
      controllerAs: 'ctrl'
    })
    .state('event.report', {
      url: '/:uuid/relatorio',
      authenticate: false,
      templateUrl: './src/event/view/event.report.html',
      controller: 'EventReport',
      controllerAs: 'ctrl'
    })
    .state('event.slug', {
      url: '/:slug',
      authenticate: false,
      templateUrl: './src/event/view/event.html',
      controller: 'Event',
      controllerAs: 'ctrl'
    })
}