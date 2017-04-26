export default function InstitutionConfig($stateProvider) {
  $stateProvider
    .state('institution', {
      url: '/instituicao',
      templateUrl: './src/institution/view/index.html'
    })
    .state('institution.page', {
      url: '/:slug',
      authenticate: false,
      templateUrl: './src/institution/view/page.html',
      controller: 'Page',
      controllerAs: 'ctrl'
    })
    .state('institution.preview', {
      url: '/visualizacao/:slug',
      authenticate: true,
      templateUrl: './src/institution/view/page.preview.html',
      controller: 'PagePreview',
      controllerAs: 'ctrl'
    })
}