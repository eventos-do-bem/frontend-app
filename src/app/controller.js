export default class AppController {
  constructor(envService, FacebookFactory, StorageService, ZendeskWidget) {
    if (StorageService.getItem('profile')) {
      let profile = StorageService.getItem('profile')
      ZendeskWidget.identify({
        name: profile.name,
        email: profile.email
      })
    }
    FacebookFactory.init({
      appId: envService.read('fbAppId'),
      version: envService.read('fbVersion'),
      xfbml: true
    })
  }
}

AppController.$inject = ['envService','FacebookFactory','StorageService','ZendeskWidget']