export default class Faq {
  constructor($scope, $stateParams, $q, $timeout, FaqService) {
    this.$q = $q
    this.faqService = FaqService
    this.questions
    this.faqService.getCategories()
      .then(response => {
        this.categories = response
      })
  }
}

Faq.$inject = ['$scope', '$stateParams', '$q', '$timeout', 'FaqService']