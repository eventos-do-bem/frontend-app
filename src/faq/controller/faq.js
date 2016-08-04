export default class Faq {
  constructor($window, $state, $stateParams, FaqService) {
    // console.log($window)
    // angular.element($window).on('scroll', e => {
    //   console.log(e.pageY)
    //   let aside = document.querySelector('aside > div')
    //   if (e.pageY > 350) {
    //     aside.style.position = 'fixed'
    //     aside.style.top = '0px'
    //   }
    //   else if (e.pageY < 350) {
    //     aside.style.top = '380px'
    //   }
    // })
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