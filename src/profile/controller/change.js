export default class ProfileChange {
  constructor($scope, $stateParams, $state, $filter, ProfileService) {
    this.filter = $filter
    this.service = ProfileService
    this.me = () => {
      ProfileService.me()
        .then(
          response => {
            this.me = response.data
            this.profile = response.data
          },
          error => {
            console.error('error: ',error)
          })
    }
  }
  change(profile) {
    birthdate = profile.birthdate.split('/')
    profile.birthdate = new Date(`${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`)
    profile.birthdate = this.filter('date')(profile.birthdate.setDate(profile.birthdate.getDate() + 1), 'yyyy-MM-dd')
    this.service.change(profile)
      .then(
        response => {
          console.log(response)
        }
      )
  }
}

ProfileChange.$inject = ['$scope', '$stateParams', '$state', '$filter', 'ProfileService']