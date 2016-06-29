export default function AppConfig($httpProvider, $injector) {
  $httpProvider.interceptors.push('HttpInterceptor')
}