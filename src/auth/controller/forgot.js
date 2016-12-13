export default class AuthForgot {
  constructor(AuthService) {
    this.service = AuthService
  }
  recovery(forgot) {
    this.sended = false
    this.error = false
    this.service.recovery(forgot)
      .then(
        response => {
          this.sended = true
          forgot = {}
        },
        error => {
          this.error = error.data
          forgot = {}
        }
      )
  }
}

AuthForgot.$inject = ['AuthService']