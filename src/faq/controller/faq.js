export default class Faq {
  constructor($state, $stateParams, FaqService) {
    this.state = $state
    this.faqService = FaqService
    this.faqService.findAll()
      .then(response => {
        this.categories = response.data.values
      })
    if (!$stateParams.filter && !$stateParams.questionId) {
      $state.go('faq.category')
      this.filter({filter: null})
    } else if ($stateParams.filter) {
      this.filter({
        filter: $stateParams.filter
      })
    } else if ($stateParams.questionId) {
      this.find($stateParams.questionId)
    }
  }
  search(params) {
    this.state.go('faq.category', params)
  }
  filter(params) {
    this.faqService.findAll(params)
      .then(response => {
        this.category = response.data.values
      })
  }
  find(id) {
    this.faqService.findById(id)
      .then(response => {
        this.question = response.data
      })
  }
}

Faq.$inject = ['$state','$stateParams', 'FaqService']