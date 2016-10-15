export default class UserConfigurations {
  constructor($filter, $rootScope, StorageService, ProfileService, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = ProfileService
    this.reader = new FileReader()
    this.needpassword = true
    this.load(profile)
  }
  load(profile) {
    profile = angular.copy(profile.data)
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.profile = profile
    this.needpassword = profile.needpassword
  }
  save(profile) {
    this.service.change(profile)
      .then(
        response => {
          console.log(response.data)
          this.storage.setItem('token', response.data.token)
          let {name, email, type, avatar} = response.data
          this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar})
          this.rootScope.$broadcast('profile.change')
          this.profile.password = '';
          this.profile.new_password = '';
          this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: 'Dados alterados com sucesso!'})
        }
      )
  }
  setPassword() {
    console.log(this.profile.needpassword && this.needpassword)
    this.needpassword = !this.needpassword
  }
}

UserConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'profile']