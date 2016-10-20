export default class Page {
  constructor($state, $stateParams, InstitutionService, StorageService) {
    this.$state = $state
    this.service = InstitutionService
    this.storage = StorageService
    this.profile = this.storage.getItem('profile')
    if ($stateParams.slug) {
      InstitutionService.findById($stateParams.slug)
        .then(response => {
          console.log(response)
          this.institution = response.data
        })
    }
  }
}

Page.$inject = ['$state','$stateParams','InstitutionService','StorageService']