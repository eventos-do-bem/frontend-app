export default function PagesConfig($stateProvider) {
  $stateProvider
    .state('pages', {
      url: '/paginas',
      templateUrl: './src/pages/view/pages.html'
    })
    .state('pages.terms', {
      url: '/termos-de-uso',
      templateUrl: './src/pages/view/terms.html'
    })
    .state('pages.policies', {
      url: '/politica-de-privacidade',
      templateUrl: './src/pages/view/policies.html'
    })
    .state('pages.donate', {
      url: '/doacao',
      templateUrl: './src/pages/view/donate.html',
      controller: 'Donate',
      controllerAs: 'ctrl'
    })
    .state('pages.contact', {
      url: '/contato',
      templateUrl: './src/pages/view/contact.html',
      controller: 'Contact',
      controllerAs: 'ctrl'
    })
}