import CommonService  from './common.js'

export default class NotificationService extends CommonService {
  constructor($http, envService) {
    super($http, envService)
    this.http = $http
    this.config = {}
    this.route = 'notifications'
  }
  subscribe(data) {
    if (!data.type) {
      this.config['headers'] = {}
      this.config.headers['token'] = this.token
    }
    return this.http.post(this.url + this.route + '/subscribe', data, this.config)
  }
  subscribeConfirm(uuid) {
    this.config['headers'] = {}
    this.config.headers['token'] = this.token
    return this.http.get(this.url + this.route + '/subscribe/confirm/' + uuid, this.config)
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

NotificationService.$inject = ['$http','envService']