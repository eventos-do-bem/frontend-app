export default class CommonService {
  constructor(API, $http) {
    this.url = API.url
    this.token = API.token
    this.config = {}
    this.$http = $http
  }
  setRoute(route) {
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
    return this.$http.get(this.url + this.route + '/' + id)
  }
  create(data) {
    return this.$http.post(this.url + this.route, data)
  }
  update(data) {
    return this.$http.put(this.url + this.route + '/' + data._id, data)
  }
  remove(id) {
    return this.$http.delete(this.url + this.route + '/' + id)
  }
  search() {
    return this.$http.get(this.url + this.route + '/search', this.config)
  }
}