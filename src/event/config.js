export default function EventConfig($stateProvider) {
  $stateProvider
    .state('start', {
      url: '/evento/comecar',
      authenticate: true,
      templateUrl: './src/event/view/start.html',
      controller: 'EventStart',
      controllerAs: 'ctrl'
    })
}