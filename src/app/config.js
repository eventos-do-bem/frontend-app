export default function AppConfig($httpProvider, $injector, $urlRouterProvider) {
  $httpProvider.interceptors.push('HttpInterceptor')
  $urlRouterProvider.otherwise('/#')
}