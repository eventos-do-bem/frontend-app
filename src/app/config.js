export default function AppConfig($httpProvider, $injector, $urlRouterProvider, ezfbProvider) {
  $httpProvider.interceptors.push('HttpInterceptor')
  $urlRouterProvider.otherwise('/#')
  ezfbProvider.setLocale('pt_BR')
  ezfbProvider.setInitParams({
    appId: '813381015395246',
    version: 'v2.2'
  })
}