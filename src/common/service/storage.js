export default class StorageService {
  constructor($window) {
    this.$window = $window
    this.storage = undefined
  }
  setItem(key, data) {
    this.$window[this.storage].setItem(key, data)
  }
  getItem(key) {
    return this.$window[this.storage].getItem(key)
  }
  setStorage(storage) {
    this.storage = storage
  }
  getStorage() {
    return this.storage
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