export default function FaqConfig($stateProvider) {
  $stateProvider
    .state('faq', {
      // abstract: true,
      // redirectTo: 'faq.category',
      url: '/perguntas-frequentes',
      templateUrl: './src/faq/view/faq.html',
      controller: 'Faq',
      controllerAs: 'ctrl'
    })
    .state('faq.category', {
      url: '/category/:filter?',
      templateUrl: './src/faq/view/faq.category.html',
      controller: 'Faq',
      controllerAs: 'ctrl'
    })
    .state('faq.question', {
      url: '/question/:questionId',
      templateUrl: './src/faq/view/faq.question.html',
      controller: 'Faq',
      controllerAs: 'ctrl'
    })
}