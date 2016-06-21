export default function config(API, $q, $window) {
  return {
    'request': (config) => {
      config['headers']['Accept'] = API.accept
      config['headers']['Content-Type'] = API.contenttype
      if ($window.localStorage.getItem('token')) {
        config['headers']['Authorization'] = 'Bearer ' + $window.localStorage.getItem('token')
      }
      return $q.resolve(config)
    },
    'requestError': (rejection) => {
      return $q.reject(rejection)
    },
    'response': (response) => {
      return $q.resolve(response)
    },
    'responseError': (rejection) => {
      return $q.reject(rejection)
    }
  }
}