export default class UserConfigurations {
  constructor($filter, $rootScope, StorageService, ProfileService, profile) {
    this.filter = $filter
    this.rootScope = $rootScope
    this.storage = StorageService
    this.service = ProfileService
    this.reader = new FileReader()
    this.needpassword = true
    this.load(profile)
    // let avatar = document.querySelector('#avatar')
    // avatar.addEventListener('change', event => {
    //   this.reader.onload = file => {
    //     console.log(file)
    //   }
    //   this.reader.readAsDataURL(avatar.files[0])
    // }, false)
  }
  load(profile) {
    profile = angular.copy(profile.data)
    profile.birthdate = new Date(profile.birthdate)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
    this.profile = profile
    this.needpassword = profile.needpassword
  }
  changeAvatar(file) {
    file = new Blob()
  }
  save(profile) {
    profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    // console.log(profile)
    if (profile.avatar) {
      // console.log(document.querySelector('#avatar').files[0])      
      // profile.avatar = document.querySelector('#avatar').files[0]
      
      // console.log(avatar)
      // let fd = new FormData()
      // fd.append('file', avatar)
      // console.log(JSON.stringify(fd))
    }
    console.log('profile', profile)
    // birthdate = profile.birthdate.split('/')
    // profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    // profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
    this.service.change(profile)
      .then(
        response => {
          console.log(response.data)
          this.storage.setItem('token', response.data.token)
          let {name, email, type} = response.data
          this.storage.setItem('profile', {name: name, email: email, type: type})
          this.rootScope.$broadcast('profile.change')
          this.profile.password = '';
          this.profile.new_password = '';
          this.rootScope.$broadcast('alert', {type: 'alert-success', icon: 'fa-check', message: 'mensagem'})
        }
      )
  }
  setPassword() {
    console.log(this.profile.needpassword && this.needpassword)
    this.needpassword = !this.needpassword
  }
}

UserConfigurations.$inject = ['$filter', '$rootScope', 'StorageService', 'ProfileService', 'profile']