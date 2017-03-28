export default class NotFound {
  constructor($stateParams) {
    this.seeking = $stateParams.seeking
    this.message = $stateParams.message
  }
}

NotFound.$inject = ['$stateParams']