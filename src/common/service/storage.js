export default class StorageService {
  constructor($window) {
    this.$window = $window
  }
  setItem(key, data) {
    this.$window.setItem(key, data)
  }
  getStorage(storage) {
    if (storage) {
      return 'localStorage'
    } else {
      return 'sessionStorage'
    }
  }
}

StorageService.$inject = ['$window']