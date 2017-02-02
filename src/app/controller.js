export default class AppController {
  constructor(envService, FacebookFactory) {
    FacebookFactory.init({
      appId: envService.read('fbAppId'),
      version: envService.read('fbVersion'),
      xfbml: true
    })
  }
}

AppController.$inject = ['envService','FacebookFactory']