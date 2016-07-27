import Faq  from './faq.js'

export default class FaqQuestion extends Faq {
  constructor($scope, $stateParams, $q, $state) {
    super($scope, $stateParams, $q, $state)
    if ($stateParams.questionId) {
      this.getQuestions($stateParams.questionId)
        .then(response => {
          console.log(response)
          // this.questions = response
        })
    }
  }
}

FaqQuestion.$inject = ['$scope', '$stateParams', '$q', '$state']