export default function UserConfig($stateProvider) {
  $stateProvider
    .state('user-register', {
      url: '/usuario/cadastro',
      templateUrl: './src/user/view/register.html',
      controller: 'UserRegisterController',
      controllerAs: 'ctrl'
    })
    .state('user-me', {
      url: '/usuario/eu',
      templateUrl: './src/user/view/me.html',
      controller: 'UserMeController',
      controllerAs: 'ctrl'
    })
    .state('user-change', {
      url: '/usuario/eu/change',
      templateUrl: './src/user/view/change.html',
      controller: 'UserChangeController',
      controllerAs: 'ctrl'
    })
}