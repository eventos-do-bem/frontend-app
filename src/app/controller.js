export default class AppController {
  constructor($state, $window) {
    this.brand = 'Eventos do Bem'
    this.logout = () => {
      $window.localStorage.clear()
      $state.go('auth-login')
    }
    this.user = JSON.parse($window.localStorage.getItem('user'))
    this.dropDownMenu = [
      {
        label: 'Perfil',
        url: 'user-me'
      }
    ]
    this.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.status.isopen = !this.status.isopen;
    };
  }
}

AppController.$inject = ['$state','$window']