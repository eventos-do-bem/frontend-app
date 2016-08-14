export default function EventConfig($stateProvider) {
  $stateProvider
    .state('event', {
      url: '/evento',
      templateUrl: './src/event/view/event.html'
    })
    .state('event.start', {
      url: '/comecar',
      authenticate: true,
      templateUrl: './src/event/view/start.html',
      controller: 'EventStart',
      controllerAs: 'ctrl'
    })
}