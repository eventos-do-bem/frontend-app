export default function HomeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './src/home/view/home.html',
      controller: 'Home',
      controllerAs: 'ctrl'
    })
}