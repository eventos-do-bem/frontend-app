export default function AuthConfig($stateProvider) {
  $stateProvider
    .state('auth', {
      url: '/autenticacao',
      templateUrl: './src/auth/view/auth.html'
    })
    .state('auth.login', {
      url: '/login',
      authenticate: false,
      templateUrl: './src/auth/view/login.html',
      controller: 'AuthLogin',
      controllerAs: 'ctrl'
    })
    .state('auth.logout', {
      url: '/logout',
      authenticate: true,
      templateUrl: './src/auth/view/logout.html',
      controller: 'AuthLogout',
      controllerAs: 'ctrl'
    })
    .state('auth.forgot', {
      url: '/esqueci',
      authenticate: false,
      templateUrl: './src/auth/view/forgot.html',
      controller: 'AuthForgot',
      controllerAs: 'ctrl'
    })
    .state('auth.recovery', {
      url: '/recuperar/:token/:email',
      authenticate: false,
      templateUrl: './src/auth/view/recovery.html',
      controller: 'AuthRecovery',
      controllerAs: 'ctrl'
    })
}