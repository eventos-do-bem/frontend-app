export default class NotificationService {
  constructor(API, $http) {
    this.API = API
    this.http = $http
    this.config = {}
    this.route = 'notifications'
  }
  subscribe(data) {
    if (!data.type) {
      this.config['headers'] = {}
      this.config.headers['token'] = this.API.token
    }
    return this.http.post(this.API.url + this.route + '/subscribe', data, this.config)
  }
  setRoute(route) {
    this.source = new EventSource(route)
    this.source.addEventListener('message', this.handleCallback, false)
  }
  handleCallback(response) {
    return JSON.parse(response.data)
  }
  handleError(response) {
    console.error(response)
  }
}

NotificationService.$inject = ['API','$http']