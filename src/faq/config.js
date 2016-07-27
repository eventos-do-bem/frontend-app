export default function FaqConfig($stateProvider) {
  $stateProvider
    .state('faq', {
      url: '/perguntas-frequentes',
      templateUrl: './src/faq/view/faq.html',
      controller: 'Faq',
      controllerAs: 'ctrl'
    })
    .state('faq.category', {
      url: '/category/:categoryId',
      templateUrl: './src/faq/view/category.html',
      controller: 'FaqCategory',
      controllerAs: 'ctrl'
    })
    .state('faq.question', {
      url: '/question/:questionId',
      templateUrl: './src/faq/view/question.html',
      controller: 'FaqQuestion',
      controllerAs: 'ctrl'
    })
}