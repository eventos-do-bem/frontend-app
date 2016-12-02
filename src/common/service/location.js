export default class LocationService {
  constructor(API, $http) {
    this.API = API
    this.http = $http
    this.config = {
      headers: {
        token: API.token
      }
    }
  }
  getStates(state) {
    let route = state ? `states/${state}` : 'states'
    return this.http.get(this.API.url + route, this.config)
  }
  getCities(state, city) {
    let route = city ? `cities/${state}/${city}` : `cities/${state}`
    return this.http.get(this.API.url + route, this.config)
  }
}

LocationService.$inject = ['API','$http']