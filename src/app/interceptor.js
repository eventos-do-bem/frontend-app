export default function config(API, $q, $injector, $window) {
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
      return $q.reject(response)
    }
  }
}
