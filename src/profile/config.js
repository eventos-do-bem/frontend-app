export default function ProfileConfig($stateProvider) {
  $stateProvider
    .state('profile', {
      url: '/perfil',
      templateUrl: './src/profile/view/profile.html'
    })
    .state('profile.user', {
      url: '/usuario',
      authenticate: true,
      templateUrl: './src/profile/view/user.html',
      controller: 'ProfileUser',
      controllerAs: 'ctrl',
      resolve: {
        profile: (ProfileService) => {
          return ProfileService.me()
        }
      }
    })
    .state('profile.user.configurations', {
      url: '/configuracoes',
      authenticate: true,
      templateUrl: './src/profile/view/user.configurations.html',
      controller: 'UserConfigurations',
      controllerAs: 'ctrl',
      resolve: {
        profile: (ProfileService) => {
          return ProfileService.me()
        }
      }
    })
    .state('profile.user.impacts', {
      url: '/impactos',
      authenticate: true,
      templateUrl: './src/profile/view/user.impacts.html',
      controller: 'UserImpacts',
      controllerAs: 'ctrl',
      resolve: {
        // profile: (ProfileService) => {
        //   return ProfileService.me()
        // }
      }
    })
    .state('profile.user.events', {
      url: '/eventos',
      authenticate: true,
      templateUrl: './src/profile/view/user.events.html',
      controller: 'UserEvents',
      controllerAs: 'ctrl',
      resolve: {
        // profile: (ProfileService) => {
        //   return ProfileService.me()
        // }
      }
    })
    .state('profile.user.donors', {
      url: '/eventos/:uuid/doacoes',
      authenticate: true,
      templateUrl: './src/profile/view/event.donors.html',
      controller: 'EventDonors',
      controllerAs: 'ctrl',
      resolve: {
      }
    })
    // .state('profile.user.report', {
    //   url: '/eventos/:uuid/relatorio',
    //   authenticate: true,
    //   templateUrl: './src/profile/view/event.report.html',
    //   controller: 'UserReport',
    //   controllerAs: 'ctrl',
    //   resolve: {
    //   }
    // })
    .state('profile.ong', {
      url: '/ong',
      authenticate: true,
      templateUrl: './src/profile/view/ong.html',
      controller: 'ProfileOng',
      controllerAs: 'ctrl'
      // resolve: {
      //   profile: (ProfileService) => {
      //     return ProfileService.me()
      //   }
      // }
    })
    .state('profile.ong.donors', {
      url: '/eventos/:uuid/doacoes',
      authenticate: true,
      templateUrl: './src/profile/view/event.donors.html',
      controller: 'EventDonors',
      controllerAs: 'ctrl',
      resolve: {
      }
    })
    .state('profile.ong.configurations', {
      url: '/configuracoes',
      authenticate: true,
      templateUrl: './src/profile/view/ong.configurations.html',
      controller: 'OngConfigurations',
      controllerAs: 'ctrl',
      resolve: {
        profile: (ProfileService) => {
          return ProfileService.me()
        }
      }
    })
    .state('profile.ong.events', {
      url: '/eventos',
      authenticate: true,
      templateUrl: './src/profile/view/ong.events.html',
      controller: 'OngEvents',
      controllerAs: 'ctrl',
      resolve: {
      }
    })
    .state('profile.ong.page', {
      url: '/:uuid/pagina',
      authenticate: true,
      templateUrl: './src/profile/view/ong.page.html',
      controller: 'OngPage',
      controllerAs: 'ctrl',
      resolve: {
        profile: (ProfileService) => {
          return ProfileService.me()
        }
      }
    })
    .state('profile.ong.history', {
      url: '/eventos/historico',
      authenticate: true,
      templateUrl: './src/profile/view/ong.history.html',
      controller: 'OngHistory',
      controllerAs: 'ctrl',
      resolve: {
        // profile: (ProfileService) => {
        //   return ProfileService.me()
        // }
      }
    })
    .state('profile.ong.report', {
      url: '/eventos/:uuid/relatorio',
      authenticate: true,
      templateUrl: './src/profile/view/ong.report.html',
      controller: 'OngReport',
      controllerAs: 'ctrl',
      resolve: {
      }
    })
    .state('profile.register', {
      url: '/cadastro/:tab',
      authenticate: false,
      templateUrl: './src/profile/view/register.html',
      controller: 'ProfileRegister',
      controllerAs: 'ctrl'
    })
    .state('profile.confirmation', {
      url: '/confirmacao/:uuid/:confirmation_code',
      authenticate: false,
      templateUrl: './src/profile/view/confirmation.html',
      controller: 'ProfileConfirmation',
      controllerAs: 'ctrl'
    })
    .state('profile.check', {
      url: '/verifique',
      authenticate: false,
      templateUrl: './src/profile/view/profile.check.html'
    })
    .state('profile.change', {
      url: '/alterar',
      templateUrl: './src/profile/view/change.html',
      controller: 'ProfileChange',
      controllerAs: 'ctrl'
    })
}