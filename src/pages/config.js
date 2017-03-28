export default function PagesConfig($stateProvider) {
  $stateProvider
    .state('pages', {
      url: '/paginas',
      authenticate: false,
      templateUrl: './src/pages/view/pages.html'
    })
    .state('pages.not-found', {
      url: '/nao-encontrada',
      params: {
        seeking: null,
        message: null
      },
      authenticate: false,
      templateUrl: './src/pages/view/not-found.html',
      controller: 'NotFound',
      controllerAs: 'ctrl'
    })
    .state('pages.about', {
      url: '/quem-somos',
      authenticate: false,
      templateUrl: './src/pages/view/about.html',
      controller: 'About',
      controllerAs: 'ctrl'
    })
    .state('pages.how-it-works', {
      url: '/como-funciona',
      authenticate: false,
      templateUrl: './src/pages/view/how-it-works.html'
    })
    .state('pages.explore', {
      url: '/explore-novas-causas',
      authenticate: false,
      templateUrl: './src/pages/view/explore.html',
      controller: 'Explore',
      controllerAs: 'ctrl'
    })
    .state('pages.campaign', {
      url: '/campanha',
      templateUrl: './src/pages/view/campaign.html',
      controller: 'Campaign',
      controllerAs: 'ctrl'
    })
    .state('pages.terms', {
      url: '/termos-de-uso',
      authenticate: false,
      templateUrl: './src/pages/view/terms.html'
    })
    .state('pages.policies', {
      url: '/politica-de-privacidade',
      authenticate: false,
      templateUrl: './src/pages/view/policies.html'
    })
    .state('pages.contact', {
      url: '/contato',
      authenticate: false,
      templateUrl: './src/pages/view/contact.html',
      controller: 'Contact',
      controllerAs: 'ctrl'
    })
}