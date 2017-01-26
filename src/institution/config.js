export default function InstitutionConfig($stateProvider) {
  $stateProvider
    .state('institution', {
      url: '/instituicao/:slug',
      authenticate: false,
      templateUrl: './src/institution/view/page.html',
      controller: 'Page',
      controllerAs: 'ctrl'
    })
}