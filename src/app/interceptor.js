export default function config($q, $window, $rootScope, $injector) {
  let xhrCreations = 0,
      xhrResolutions = 0
  
  function isLoading() {
    return xhrResolutions < xhrCreations
  }
  function updateLoading() {
    $rootScope.loading = isLoading()
  }
  return {
    'request': (config) => {
      xhrCreations++
      updateLoading()
      let envService = $injector.get('envService')
      // if (config.url.indexOf('.html') === -1) 
      // $rootScope.loading = true
      config.headers = config.headers || {}
      config['headers']['Accept'] = envService.accept
      // console.log($window.localStorage.getItem('token'))
      if (!config.headers.token && config.url.indexOf('googleapis') === -1 &&  config.url.indexOf('apps.widenet') === -1) {
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
      xhrResolutions++
      updateLoading()
      // $rootScope.loading = false
      return $q.reject(rejection)
    },
    'response': (response) => {
      xhrResolutions++
      updateLoading()
      // $rootScope.loading = false
      return $q.resolve(response)
    },
    'responseError': (response) => {
      xhrResolutions++
      updateLoading()
      // $rootScope.loading = false
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
