export default function config(API, $q, $window) {
  return {
    'request': (config) => {
      config.headers = config.headers || {}
      config['headers']['Accept'] = API.accept
      config['headers']['Content-Type'] = API.contenttype
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
      }
      return $q.reject(response)
    }
  }
}
