import CommonService from './common.js'

export default class LocationService extends CommonService {
  constructor ($http, envService) {
    super($http, envService)
    this.http = $http
    this.config = {
      headers: {
        token: this.token
      }
    }
    this.apiAddress = 'http://apps.widenet.com.br/busca-cep/api/cep/'
  }
  getStates (state) {
    let route = state ? `states/${state}` : 'states'
    return this.http.get(this.url + route, this.config)
  }
  getCities (state, city) {
    let route = city ? `cities/${state}/${city}` : `cities/${state}`
    return this.http.get(this.url + route, this.config)
  }
  getAddressByZipCode (zipcode) {
    return this.http.get(this.apiAddress + `${zipcode}.json`)
  }
}

LocationService.$inject = ['$http', 'envService']
