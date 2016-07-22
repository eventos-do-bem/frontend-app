export default class Header {
  constructor($scope, $state, $window, StorageService) {
    this.brand = 'Eventos do Bem'
    this.user = JSON.parse($window.localStorage.getItem('user'))
    $scope.$on('auth.login', () => {
      this.user = JSON.parse($window.localStorage.getItem('user'))
      $state.go('user.me')
    })
    $scope.$on('auth.logout', () => {
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