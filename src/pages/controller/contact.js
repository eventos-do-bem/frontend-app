export default class Contact {
  constructor($rootScope, $http, envService) {
    this.rootScope = $rootScope
    this.url = envService.read('apiUrl')
    this.token = envService.read('token')
    this.http = $http
    this.master = {
      destination: 'how-it-work'
    }
    this.contact = angular.copy(this.master)
  }
  send(contact, data) {
    this.http.post(
      this.url + 'contact',
      data,
      {
        headers: {
          token: this.token
        }
      }
    ).then(response => {
      this.rootScope.$broadcast('alert', {
        type: 'alert-success',
        icon: 'fa-check',
        message: {
          message: 'Legal ter entrado em contato :) aguarde nosso retorno.'
        }
      })
      this.contact = angular.copy(this.master)
      contact.$setPristine()
    }, error => {
      this.rootScope.$broadcast('alert', {
        type: 'alert-warning',
        icon: 'fa-exclamation',
        message: error.data
      })
    })
  }
}

Contact.$inject = ['$rootScope','$http','envService']