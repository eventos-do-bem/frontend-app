export default class ProfileRegister {
  constructor($stateParams, $state, $filter, $timeout, $uibModal, Regex, ActivityAreaService, ProfileService, ValidationFactory, LastStateUnloggedService) {
    this.activityAreaService = ActivityAreaService
    this.service = ProfileService
    this.timeout = $timeout
    this.modal = $uibModal
    this.validation = ValidationFactory
    this.lastStateUnloggedService = LastStateUnloggedService
    // this.rootScope = $rootScope
    this.state = $state
    this.filter = $filter
    this.masterProfile = {
      gender: 'Feminino',
    }
    if ($stateParams.tab === 'ong') this.activeForm = 1
    this.step = 0
    this.showPassword = false
    this.typeInputPassword = 'password'
    this.getActivityAreas()
    this.fbRegister = false;
    // this.urlPattern =  /^(((http)s?):\/\/)?(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i
    this.urlPattern = Regex.URL
    // $http.get('data/area_activities.json')
    //   .then(response => this.area_activities = response.data) 
  }
  getActivityAreas() {
    this.activityAreaService.findAll()
      .then(response => this.area_activities = response.data.values)
  }
  resetProfile() {
    this.profile = angular.copy(this.masterProfile)
  }
  toggleShowPassword() {
    this.typeInputPassword = this.showPassword ? 'text' : 'password'
  }
  validateDate(field, date) {
    if (!field.$error.mask && date) {
      date = date.split('/')
      date = new Date(`${date[2]}-${date[1]}-${date[0]}`)
      let valid = this.validation.dateMinByYears(date, 18)
      field.$setValidity('birthdate', valid)
    } else {
      field.$setValidity('birthdate', false)
    }
  }
  changeTab(active) {
    this.error = null
    this.resetProfile()
    this.changeStep()
    switch (active) {
      case 0: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="name_organization"]').focus(), 300); break;
      case 1: this.timeout(() => document.querySelector('form[name="registerUser"] input[name="name"]').focus(), 300); break;
    }
  }
  validateStep(form) {
    let validated
    switch (this.step) {
      case 0: validated = (form.name_organization.$invalid || form.mission.$invalid || form.area_activity_uuid.$invalid) ? true : false; break;
      case 1: validated = (form.phone.$invalid || form.facebook.$invalid) ? true : false; break;
      case 2: validated = (form.name.$invalid || form.email.$invalid || form.password.$invalid) ? true : false; break;
    }
    return validated
  }
  changeStep(direction) {
    switch (direction) {
      case 'next': this.step++; break;
      case 'prev': this.step--; break;
      default: this.step = 0
    }
    switch (this.step) {
      case 0: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="name_organization"]').focus(), 300); break;
      case 1: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="phone"]').focus(), 300); break;
      case 2: this.timeout(() => document.querySelector('form[name="registerOng"] input[name="name"]').focus(), 300); break;
    }
  }
  registerFacebook() {
    this.service.registerFacebook(response => {
      this.registerFacebookEmail(response)
    })
  }
  registerFacebookEmail(data) {
    let modalInstance = this.modal.open({
      templateUrl: './../src/profile/view/register.facebook.email.html',
      controller: 'RegisterFacebookEmail',
      controllerAs: 'ctrl',
      windowClass: 'modal-facebook-email',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        user: data
      }
    })
    modalInstance.result.then(user => {
      this.registerUser(user)
    })
  } 
  checkOfAge(age) {
    let date = new Date(),
      timeDiff = date - age,
      diffDays = timeDiff / (1000 * 3600 * 24 * 365)
    return (diffDays < 18) ? false : true

  }
  registerUser(profile) {
    this.error = null
    profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    let birthdate
    if (profile.facebook_token) {
      this.fbRegister = true
      profile.gender = (profile.gender == 'male') ? 'Masculino' : 'Feminino'
      birthdate = profile.birthday.split('/')
      profile.birthdate = new Date(`${birthdate[2]}-${birthdate[0]}-${birthdate[1]}`)
    } else {
      birthdate = profile.birthdate.split('/')
      profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    }
    if (!this.checkOfAge(profile.birthdate)) {
      this.error = {
        errors: {
          birthdate: ['Desculpe, não podemos aceitar usuários menores de idade.']
        }
      }
    } else {
      profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'dd/MM/yyyy')
      this.service.register(profile)
        .then(
          response => this.registerSuccess(response),
          response => this.registerError(response)
        )
    }
  }
  registerOng(profile) {
    this.error = null
    profile = angular.copy(profile)
    // profile = (profile) ? angular.copy(profile) : angular.copy(this.profile)
    if (profile.facebook.trim().indexOf('http') != 0) {
      profile.facebook = 'http://' + profile.facebook
    }
    if (profile.website.trim().indexOf('http') != 0) {
      profile.website = 'http://' + profile.website
    }
    if (profile.area_activity_uuid) {
      profile.area_activity_uuid = profile.area_activity_uuid.uuid
    }
    profile.phone = profile.phone.replace(/\s/g, '');
    this.service.register(profile)
      .then(
        response => this.registerSuccess(response),
        response => this.registerError(response)
      )
  }
  registerSuccess(response) {
    if (this.fbRegister) {
      // this.storage.setItem('token', response.data.token)
      // let {name, email, type, avatar, permissions} = response.data
      // this.storage.setItem('profile', {name: name, email: email, type: type, avatar: avatar, permissions: permissions})
      // this.$rootScope.$broadcast('profile.change')
      this.service.setProfile(response.data)
      if (this.lastStateUnloggedService.getName()) {
        let name = this.lastStateUnloggedService.getName()
        let params = this.lastStateUnloggedService.getParams()
        this.lastStateUnloggedService.clear()
        this.state.go(name, params)
      } else {
        this.state.go('profile.user.events')
      }
    } else {
      this.state.go('profile.check')
    }
  }
  registerError(response) {
    this.error = response.data
    console.error(JSON.stringify(response.data))
  }
}

ProfileRegister.$inject = ['$stateParams', '$state', '$filter', '$timeout', '$uibModal', 'Regex', 'ActivityAreaService', 'ProfileService', 'ValidationFactory', 'LastStateUnloggedService']