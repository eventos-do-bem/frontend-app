export default function AuthConfig($stateProvider) {
  $stateProvider
    .state('auth', {
      url: '/autenticacao',
      templateUrl: './src/auth/view/auth.html'
    })
    .state('auth.login', {
      url: '/login',
      templateUrl: './src/auth/view/login.html',
      controller: 'AuthLogin',
      controllerAs: 'ctrl'
    })
    .state('auth.logout', {
      url: '/logout',
      templateUrl: './src/auth/view/logout.html',
      controller: 'AuthLogout',
      controllerAs: 'ctrl'
    })
    .state('auth.forgot', {
      url: '/esqueci',
      templateUrl: './src/auth/view/forgot.html',
      controller: 'AuthForgot',
      controllerAs: 'ctrl'
    })
    .state('auth.recovery', {
      url: '/recuperar/:token/:email',
      templateUrl: './src/auth/view/recovery.html',
      controller: 'AuthRecovery',
      controllerAs: 'ctrl'
    })
}