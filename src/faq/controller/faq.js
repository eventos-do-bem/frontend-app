export default class Faq {
  constructor($window, $state, $stateParams, FaqService) {
    let aside = document.querySelector('aside')
    angular.element($window).on('scroll', e => {
      if (e.pageY > 350) {
        aside.style.position = 'sticky'
        aside.style.top = '30px'
      }
      else if (e.pageY < 350) {
        aside.style.position = 'static'
        aside.style.top = 'auto'
      }
    })
    this.$state = $state
    this.faqService = FaqService
    this.faqService.getCategories()
      .then(response => this.categories = response)
    if ($stateParams.categoryId) {
      this.faqService.getCategory($stateParams.categoryId)
        .then(response => this.category = response)
    } else if ($stateParams.questionId) {
      this.faqService.getQuestion($stateParams.questionId)
        .then(response => this.question = response)
    } else {
      $state.go('faq.category', { categoryId: 1 })
    }
  }
}

Faq.$inject = ['$window','$state','$stateParams', 'FaqService']