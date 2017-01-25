export default class CommonService {
  constructor($http, envService) {
    if (envService) {
      this.url = envService.read('apiUrl')
      this.token = envService.read('token')
    }
    this.config = {}
    this.$http = $http
  }
  setRoute(route) {
    this.config = {}
    this.route = route
  }
  setDataToken(data) {
    data['token'] = this.token
    return data
  }
  setPublicToken() {
    this.config['headers'] = {}
    this.config.headers['token'] = this.token
  }
  setParams(data) {
    this.config['params'] = {}
    for (let key in data) {
      this.config.params[key] = data[key]
    }
  }
  findAll() {
    return this.$http.get(this.url + this.route, this.config)
  }
  findById(id) {
    return this.$http.get(this.url + this.route + '/' + id, this.config)
  }
  postWithFile(data, progress) {
    let fd = new FormData()
    angular.forEach(data, (value, key) => {
      fd.append(key, value)
    })
    return this.$http({
      method: 'POST',
      url: this.url + this.route,
      data: fd,
      headers: {'Content-Type': undefined},
      uploadEventHandlers: {
        progress: e => progress(e)
      }
    })
  }
  create(data) {
    return this.$http.post(this.url + this.route, data)
  }
  update(data) {
    return this.$http.put(this.url + this.route + '/' + data.uuid, data)
  }
  remove(id) {
    return this.$http.delete(this.url + this.route + '/' + id)
  }
  search() {
    return this.$http.get(this.url + this.route + '/search', this.config)
  }
}

CommonService.$inject = ['$http','envService']