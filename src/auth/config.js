export default function AuthConfig($stateProvider) {
  $stateProvider
    .state('auth-login', {
      url: '/usuario/login',
      templateUrl: './src/auth/view/login.html',
      controller: 'AuthLogin',
      controllerAs: 'ctrl'
    })
}