export default function config($q, $window, $rootScope, $injector) {
  return {
    'request': (config) => {
      let envService = $injector.get('envService')
      // if (config.url.indexOf('.html') === -1) 
      $rootScope.loading = true
      config.headers = config.headers || {}
      config['headers']['Accept'] = envService.accept
      // console.log($window.localStorage.getItem('token'))
      if (!config.headers.token && config.url.indexOf('googleapis') === -1) {
        if ($window.localStorage.getItem('token')) {
          config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token')
        }
      }
      if (config.headers.token && config.url.indexOf('googleapis') > -1) {
        delete config['headers']['Authorization']
      }
      return config || $q.when(config)
    },
    'requestError': (rejection) => {
      $rootScope.loading = false
      return $q.reject(rejection)
    },
    'response': (response) => {
      $rootScope.loading = false
      return $q.resolve(response)
    },
    'responseError': (response) => {
      $rootScope.loading = false
      if (response.status === 401) {
        $window.localStorage.removeItem('token')
        $window.localStorage.removeItem('user')
        $rootScope.$broadcast('auth.logout')
        $injector.get('$state').transitionTo('auth.login')
      }
      return $q.reject(response)
    }
  }
}
