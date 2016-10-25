export default function ConfirmationConfig($stateProvider) {
  $stateProvider
    .state('confirmation', {
      url: '/confirmacao',
      templateUrl: './src/confirmation/view/index.html'
    })
    .state('confirmation.profile', {
      url: '/perfil/:uuid/:confirmation_code',
      templateUrl: './src/confirmation/view/confirmation.profile.html',
      controller: 'ConfirmationProfile',
      controllerAs: 'ctrl'
    })
    .state('confirmation.subscribe', {
      url: '/assinatura/:uuid',
      templateUrl: './src/confirmation/view/confirmation.subscribe.html',
      controller: 'ConfirmationSubscribe',
      controllerAs: 'ctrl'
    })
}