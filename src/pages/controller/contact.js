export default class Contact {
  constructor($timeout) {
    $timeout(() => {
      // console.log(document.querySelector('.fb-page > span'))
      // document.querySelector('.fb-page > span').style.width = '100%'
      // this.fbBoxWidth = document.querySelector('.fbBox').offsetWidth
    }, 2000)
  }
}

Contact.$inject = ['$timeout']