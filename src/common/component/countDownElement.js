let countDownElement = {
  restrict: 'E',
  transclude: true,
  bindings: {
    model: '=',
    max: '@'
  },
  template: `
    <div class="input-countdown">
      <div ng-transclude></div>
      <span class="input-countdown-chars">{{$ctrl.model.length || 0}}/{{$ctrl.max || 0}}</span>
    </div>
  `
}

export default countDownElement