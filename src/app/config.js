export default function AppConfig($httpProvider, $injector, $urlRouterProvider, $sceDelegateProvider, $qProvider) {
  $httpProvider.interceptors.push('HttpInterceptor')
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    "http://www.youtube.com/embed/**"
  ])
  $qProvider.errorOnUnhandledRejections(false);
  $urlRouterProvider.otherwise('/#')
}