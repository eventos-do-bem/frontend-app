export default class AppController {
  constructor($location, $window, FacebookService) {
    FacebookService.init({
      appId: '922781867788493'
    })
    // switch($location.path()) {
    //   case '/usuario/cadastro': {
    //     this.background = 'auth-login.jpg'
    //   }
    // }
    // this.brand = 'Eventos do Bem'
    // this.logout = () => {
    //   $window.localStorage.clear()
    //   $state.go('auth-login')
    // }
    // this.user = JSON.parse($window.localStorage.getItem('user'))
    // this.dropDownMenu = [
    //   {
    //     label: 'Perfil',
    //     url: 'user-me'
    //   },
    //   {
    //     label: 'Logout',
    //     url: 'auth-logout'
    //   }
    // ]
    // this.toggleDropdown = function($event) {
    //   $event.preventDefault();
    //   $event.stopPropagation();
    //   this.status.isopen = !this.status.isopen;
    // };
  }
}

AppController.$inject = ['$location','$window','FacebookService']