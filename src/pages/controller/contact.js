export default class Contact {
  constructor($timeout) {
    $timeout(() => {
      this.fbBoxWidth = document.querySelector('.fbBox').offsetWidth
    })
  }
}

Contact.$inject = ['$timeout']