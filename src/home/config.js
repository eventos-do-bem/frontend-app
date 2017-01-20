export default function HomeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      authenticate: false,
      templateUrl: './src/home/view/home.html',
      controller: 'Home',
      controllerAs: 'ctrl'
    })
}