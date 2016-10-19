export default function InstitutionConfig($stateProvider) {
  $stateProvider
    .state('instituition', {
      url: '/instituition/:slug',
      templateUrl: './src/institution/view/page.html',
      controller: 'Page',
      controllerAs: 'ctrl'
    })
}