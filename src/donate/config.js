export default function DonateConfig($stateProvider) {
  $stateProvider
    .state('donate', {
      url: '/doacao',
      templateUrl: './src/donate/view/index.html'
    })
    .state('donate.event', {
      url: '/evento/:slug/',
      templateUrl: './src/donate/view/event.html',
      controller: 'DonateEvent',
      controllerAs: 'ctrl'
    })
}