export default class OngConfigurations {
  constructor($filter, $rootScope, StorageService, ProfileService, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = ProfileService
    this.load(profile)
  }
  load(profile) {
    profile = angular.copy(profile.data)
    console.log(profile)
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.profile = profile
  }
  save(profile) {
    profile = angular.copy(profile)
    profile.avatar = null
    // birthdate = profile.birthdate.split('/')
    // profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    // profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
    this.service.change(profile)
      .then(
        response => {
          this.storage.setItem('token', response.data.token)
          let {name, email, type} = response.data
          this.storage.setItem('profile', {name: name, email: email, type: type})
          this.rootScope.$broadcast('profile.change')
          this.profile.password = '';
          this.profile.new_password = '';
        }
      )
  }
}

OngConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'profile']