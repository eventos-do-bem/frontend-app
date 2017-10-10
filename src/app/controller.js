export default class AppController {
  constructor(envService, FacebookFactory, StorageService, ZendeskWidget) {
//    console.log(demoTour)
//    TourService.createDetachedTour('detachedDemoTour');
    if (StorageService.getItem('profile')) {
      let profile = StorageService.getItem('profile')
      ZendeskWidget.identify({
        name: profile.name,
        email: profile.email
      })
    }

    // @https://trello.com/c/JHHTznNj/299-desabilitar-widget-zendesk
    // @Carlos Eduardo
    ZendeskWidget.hide()

    FacebookFactory.init({
      appId: envService.read('fbAppId'),
      version: envService.read('fbVersion'),
      xfbml: true
    })
  }
}

AppController.$inject = ['envService','FacebookFactory','StorageService','ZendeskWidget']