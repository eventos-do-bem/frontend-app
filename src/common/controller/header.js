export default class Header {
  constructor($scope, $state, $window, StorageService) {
    this.brand = 'Eventos do Bem'
    this.user = StorageService.getItem('user')
    $scope.$on('user.change', () => {
      this.user = StorageService.getItem('user')
    })
    $scope.$on('auth.logout', () => {
      StorageService.removeItem('rememberme')
      StorageService.removeItem('token')
      StorageService.removeItem('user')
      this.user = null
    })
    this.dropDownMenu = {
      logged: [
        {
          label: 'Perfil',
          url: 'user.me'
        },
        {
          label: 'Logout',
          url: 'auth.logout'
        }
      ],
      nologged: [
        {
          label: 'Entrar',
          url: 'auth.login'
        },
        {
          label: 'Cadastrar',
          url: 'user.register'
        }
      ]
    }
    this.toggleDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.status.isopen = !this.status.isopen;
    };
  }
}

Header.$inject = ['$scope', '$state', '$window', 'StorageService']