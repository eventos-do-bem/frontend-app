export default class AppController {
  constructor(envService, FacebookFactory) {
    FacebookFactory.init({
      appId: envService.read('fbAppId'),
      xfbml: true
    })
  }
}

AppController.$inject = ['envService','FacebookFactory']