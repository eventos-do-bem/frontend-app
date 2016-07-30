export default class StorageService {
  constructor($window) {
    this.$window = $window
  }
  setItem(key, data) {
    this.$window.localStorage.setItem(key, JSON.stringify(data))
  }
  getItem(key) {
    return JSON.parse(this.$window.localStorage.getItem(key))
  }
  removeItem(key) {
    this.$window.localStorage.removeItem(key)
  }
  setByRememberMe(rememberme) {
    if (rememberme) {
      this.setStorage('localStorage')
    } else {
      this.setStorage('sessionStorage')
    }
  }
  identifyStorage() {
    if (this.$window.localStorage.getItem('token')) {
      return 'localStorage'
    } else if (this.$window.sessionStorage.getItem('token')) {
      return 'sessionStorage'
    }
  }
  clearStorage() {
    this.$window[this.storage].clear()
  }
}

StorageService.$inject = ['$window']