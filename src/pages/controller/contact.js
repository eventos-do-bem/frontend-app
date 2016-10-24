export default class Contact {
  constructor($rootScope, API, $http) {
    this.rootScope = $rootScope
    this.API = API
    this.http = $http
    this.master = {
      destination: 'how-it-work'
    }
    this.contact = angular.copy(this.master)
  }
  send(contact, data) {
    this.http.post(
      this.API.url + 'contact',
      data,
      {
        headers: {
          token: this.API.token
        }
      }
    ).then(response => {
      this.rootScope.$broadcast('alert', {
        type: 'alert-success',
        icon: 'fa-check',
        message: 'Legal ter entrado em contato :) aguarde nosso retorno.'
      })
      this.contact = angular.copy(this.master)
      contact.$setPristine()
    })
  }
}

Contact.$inject = ['$rootScope','API','$http']