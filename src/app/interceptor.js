export default function config(API, $q, $window, $rootScope, $injector) {
  return {
    'request': (config) => {
      config.headers = config.headers || {}
      config['headers']['Accept'] = API.accept
      config['headers']['Content-Type'] = API.contenttype
      console.log($window.localStorage.getItem('token'))
      if ($window.localStorage.getItem('token')) {
        config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token')
      }
      return config || $q.when(config)
    },
    'requestError': (rejection) => {
      return $q.reject(rejection)
    },
    'response': (response) => {
      return $q.resolve(response)
    },
    'responseError': (response) => {
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
