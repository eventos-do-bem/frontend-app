let Component = {
  restrict: 'E',
  bindings: {
    show: '='
  },
  template: `
  <div class="loading" data-ng-show="$ctrl.show">
    <img src="assets/gifs/loading-evb.gif" />
    <p>Carregando...</p>
  </div>
  `
}

export default Component