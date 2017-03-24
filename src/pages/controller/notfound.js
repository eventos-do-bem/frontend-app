export default class NotFound {
  constructor($stateParams) {
    this.seeking = $stateParams.seeking
  }
}

NotFound.$inject = ['$stateParams']