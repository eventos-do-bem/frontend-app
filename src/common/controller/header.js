export default class Header {
  constructor($scope, $state, $window, StorageService) {
    this.brand = 'Eventos do Bem'
    this.profile = StorageService.getItem('profile')
    this.navbarCollapsed = true
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
      this.addMenuLogged()
    })
    $scope.$on('auth.logout', () => {
      StorageService.removeItem('rememberme')
      StorageService.removeItem('token')
      StorageService.removeItem('profile')
      this.profile = null
    })

    this.dropDownMenu = {
      logged: [
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
          url: 'profile.register'
        }
      ]
    }
    this.addMenuLogged()
    this.toggleDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.status.isopen = !this.status.isopen;
    };
  }
  addMenuLogged() {
    let item = {
      label: 'Perfil'
    }
    if (this.profile) {
      switch(this.profile.type) {
        case 'user': item.url = 'profile.user'; break;
        case 'ong': item.url = 'profile.ong'; break;
      }
      if (this.dropDownMenu.logged[0].label == 'Perfil') {
        this.dropDownMenu.logged[0] = item
      } else {
        this.dropDownMenu.logged.unshift(item)
      }
    }
  }
}

Header.$inject = ['$scope', '$state', '$window', 'StorageService']