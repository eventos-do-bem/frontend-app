export default class Page {
  constructor($state, $stateParams, InstitutionService) {
    this.$state = $state
    this.service = InstitutionService
    if ($stateParams.slug) {
      InstitutionService.findById($stateParams.slug)
        .then(response => {
          console.log(response)
          this.institution = response.data
        })
    }
  }
}

Page.$inject = ['$state','$stateParams','InstitutionService']