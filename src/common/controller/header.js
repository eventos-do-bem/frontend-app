export default class Header {
  constructor($rootScope, $scope, $state, $window, StorageService, ProfileService) {
    this.rootScope = $rootScope
    this.state = $state
    this.storage = StorageService
    this.profileService = ProfileService
    this.brand = 'Eventos do Bem'
    this.profile = StorageService.getItem('profile')
    this.navbarCollapsed = true
    this.toggleLoggedAnotherUser()
    $scope.$on('profile.change', () => {
      this.profile = StorageService.getItem('profile')
      this.toggleLoggedAnotherUser()
      this.addMenuLogged()
    })
    $scope.$on('auth.logout', () => {
      this.storage.removeItem('rememberme')
      this.storage.removeItem('token')
      this.storage.removeItem('original_token')
      this.storage.removeItem('profile')
      this.storage.removeItem('original_profile')
      this.profile = null
      this.toggleLoggedAnotherUser()
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
        case 'user': item.url = 'profile.user.events'; break;
        case 'ong': item.url = 'profile.ong.events'; break;
      }
      if (this.dropDownMenu.logged[0].label == 'Perfil') {
        this.dropDownMenu.logged[0] = item
      } else {
        this.dropDownMenu.logged.unshift(item)
      }
    }
  }
  toggleLoggedAnotherUser() {
    this.loggedAsAnotherUser = this.storage.getItem('original_profile')
  }
  logoutAsAnotherUser() {
    let originalToken = this.storage.getItem('original_token'),
        originalProfile = this.storage.getItem('original_profile')
    this.storage.setItem('token', originalToken)
    this.storage.setItem('profile', originalProfile)
    this.rootScope.$broadcast('profile.change')
    this.storage.removeItem('original_token')
    this.storage.removeItem('original_profile')
    this.toggleLoggedAnotherUser()
    this.state.go('home')
  }
}

Header.$inject = ['$rootScope','$scope', '$state', '$window', 'StorageService', 'ProfileService']