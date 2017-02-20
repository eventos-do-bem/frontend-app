export default class GeoLocationFactory {
  constructor($window,$http) {
    this.window = $window
    this.$http = $http
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  }
  checkSupport() {
    return this.window.navigator.geolocation
  }
  setOptions(options) {
    this.options = angular.extend({
      enableHighAccuracy: this.options.enableHighAccuracy,
      timeout: this.options.timeout,
      maximumAge: this.options.maximumAge
    }, options)
  }
  getPosition(handleSuccess, handleError) {
    return this.window.navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      this.options
    )
  }
  getAddress(coords) {
    let gmap = 'http://maps.googleapis.com/maps/api/geocode/json'
    let config = {
      params: {
        latlng: `${coords.latitude},${coords.longitude}`,
        sensor: false
      }
    }
    return this.$http.get(gmap, config)
  }
  static geoLocationFactory($window,$http) {
    return new GeoLocationFactory($window,$http)
  }
}

GeoLocationFactory.geoLocationFactory.$inject = ['$window','$http']