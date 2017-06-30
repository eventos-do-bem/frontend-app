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
        institution: (InstitutionService, $stateParams) => {
          if ($stateParams.causa) {
            return InstitutionService.findById($stateParams.causa)
              .then(response => {
                // console.log(response.data)
                return response.data
              })
          } else {
            return {}
          }
        },        
        institutions: (InstitutionService) => {
          return InstitutionService.findAll()
            .then(response => {
              return response.data
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
        institution: (InstitutionService, $stateParams) => {
          if ($stateParams.causa) {
            return InstitutionService.findById($stateParams.causa)
              .then(response => {
                // console.log(response.data)
                return response.data
              })
          } else {
            return {}
          }
        },
        institutions: (InstitutionService) => {
          return InstitutionService.findAll()
            .then(response => {
              return response.data
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
                event.video = angular.isUndefined(event.videos.values[0]) ? '' : event.videos.values[0].url
                event.categorie_uuid = event.categories.values[0].uuid
                event.institution_uuid = event.institution.uuid
                event.temp = {
                  state: event.cities.values[0].state
                }
                event.citie = event.cities.values[0].name
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
    .state('event.preview', {
      url: '/visualizacao/:slug',
      authenticate: true,
      templateUrl: './src/event/view/event.preview.html',
      controller: 'EventPreview',
      controllerAs: 'ctrl'
    })
}