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
      controllerAs: 'ctrl',
      resolve: {
        profile: (ProfileService) => {
          return ProfileService.me()
        },
        institutions: (InstitutionService) => {
          return InstitutionService.findAll()
            .then(response => {
              return response.data.values
            })
        },
        categories: (CategoryService) => {
          return CategoryService.findAll()
            .then(response => {
              return response.data.values
            })
        },
        event: () => {
          return {}
        }
      }
    })
    .state('event.edit', {
      url: '/alterar/:slug',
      authenticate: true,
      templateUrl: './src/event/view/start.html',
      controller: 'EventStart',
      controllerAs: 'ctrl',
      resolve: {
        profile: (ProfileService) => {
          return ProfileService.me()
        },
        institutions: (InstitutionService) => {
          return InstitutionService.findAll()
            .then(response => {
              return response.data.values
            })
        },
        categories: (CategoryService) => {
          return CategoryService.findAll()
            .then(response => {
              return response.data.values
            })
        },
        event: (EventService, $stateParams, $filter) => {
          if ($stateParams.slug) {
            return EventService.findById($stateParams.slug)
              .then(response => {
                let event = angular.copy(response.data)
                delete event.slug
                delete event.cover
                event.end_date = $filter('date')(new Date(event.ends), 'dd/MM/yyyy')
                event.goal_amount = event.goal
                event.video = event.videos.values[0].url
                event.categorie_uuid = event.categories.values[0]
                event.institution_uuid = event.institution.uuid
                event.temp = {
                  state: event.cities.values[0].state
                }
                event.citie = event.cities.values[0]
                return event
              })
          }
        }
      }
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
        categorie: (CategoryService, $stateParams) => {
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