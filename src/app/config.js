export default function AppConfig($httpProvider, $injector, $urlRouterProvider, $sceDelegateProvider) {
  $httpProvider.interceptors.push('HttpInterceptor')
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    "http://www.youtube.com/embed/**",
    "https://www.youtube.com/embed/**"
  ])
  $urlRouterProvider.otherwise('/#')
}