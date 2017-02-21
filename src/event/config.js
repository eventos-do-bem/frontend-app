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
      url: '/explore?categoria?instituicao',
      authenticate: false,
      templateUrl: './src/event/view/event.explore.html',
      controller: 'EventExplore',
      controllerAs: 'ctrl',
      resolve: {
        categories: (CategoryService) => {
          return CategoryService.findAll()
        },
        category: (CategoryService, $stateParams) => {
          return $stateParams.categoria ? CategoryService.findById($stateParams.categoria) : null
        },
        institutions: (InstitutionService) => {
          return InstitutionService.findAll()
        },
        institution: (InstitutionService, $stateParams) => {
          return $stateParams.instituicao ? InstitutionService.findById($stateParams.instituicao) : null
        }
      }
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