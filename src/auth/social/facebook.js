export default class FacebookService {
  constructor(ezfb) {
    this.ezfb = ezfb
  }
  login(cbSuccess, cbError) {
    this.ezfb.login(response => {
      console.log(response)
      if (response.authResponse) {
        this.getMe(response => {
          cbSuccess(response)
        })
      } else {
        cbError(response)
      }
    }, { scope: 'public_profile,email' })
  }
  logout() {
    this.ezfb.logout()
  }
  getMe(callback) {
    this.ezfb.api('/me', response => {
      callback(response)
    })
  }
  getLoginStatus(callback) {
    this.ezfb.getLoginStatus(response => {
      callback(response)
    })
  }
}

FacebookService.$inject = ['ezfb']