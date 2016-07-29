export default class UserMe {
  constructor($scope, $stateParams, $state, UserService, me) {
    console.log(me)
    this.me = me.data
    // this.me = () => {
    //   UserService.me()
    //     .then(
    //       response => {
    //         this.me = response.data
    //       },
    //       error => {
    //         console.error('error: ',error)
    //       })
    // }
  }
}

UserMe.$inject = ['$scope', '$stateParams', '$state', 'UserService', 'me']