export default class FaqCategory {
  constructor($scope, $stateParams, $q, $state, FaqService) {
    this.faqService = FaqService
    console.log(FaqService)
    if ($stateParams.categoryId) {
      FaqService.getCategory($stateParams.categoryId)
        .then(response => {
          console.log(response)
          this.category = response
        })
    }
  }

}

FaqCategory.$inject = ['$scope', '$stateParams', '$q', '$state', 'FaqService']