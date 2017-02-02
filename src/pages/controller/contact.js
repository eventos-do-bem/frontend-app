export default class Contact {
  constructor($rootScope, $http, $uibModal, envService) {
    this.rootScope = $rootScope
    this.url = envService.read('apiUrl')
    this.token = envService.read('token')
    this.http = $http
    this.modal = $uibModal
    this.master = {
      destination: 'how-it-work'
    }
    this.contact = angular.copy(this.master)
  }
  send(contact, data) {
    if (contact.$invalid) {
      angular.forEach(contact.$error, field => {
        angular.forEach(field, errorField => {
          errorField.$setDirty()
        })
      })
    } else {
      this.http.post(
        this.url + 'contact',
        data,
        {
          headers: {
            token: this.token
          }
        }
      ).then(response => {
        let modalInstance = this.modal.open({
          templateUrl: './../src/pages/view/contact-success.html',
          size: 'md',
          controller: 'ContactSuccess',
          controllerAs: 'ctrl'
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
}

Contact.$inject = ['$rootScope','$http','$uibModal','envService']