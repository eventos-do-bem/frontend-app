let Component = {
  restrict: 'E',
  transclude: true,
  bindings: {
    model: '<',
    max: '@'
  },
  template: `
    <div class="input-countdown">
      <div ng-transclude></div>
      <span class="input-countdown-chars">{{$ctrl.model.length || 0}}/{{$ctrl.max || 0}}</span>
    </div>
  `
  // controller: function($element) {
  //   let ctrl = this,
  //       elem,
  //       prevMaxLen
  //   ctrl.count = 0
  //   ctrl.$onChanges = (obj) => {
  //     if (obj.model.currentValue) {
  //       let newLines = obj.model.currentValue.match(/(\r\n|\n|\r)/g)
  //       let addition = 0
  //       if (newLines != null) {
  //         addition = newLines.length
  //       }
  //       ctrl.count = obj.model.currentValue.length + addition
  //       if ((obj.model.currentValue.length + addition) >= prevMaxLen) {
  //         ctrl.count = obj.model.currentValue.length + addition
  //         elem.maxLength = prevMaxLen - addition
  //       }
  //     }
  //   }
  //   ctrl.$postLink = () => {
  //     elem = $element[0].querySelector('textarea')
  //     prevMaxLen = elem.maxLength
  //   }
  // }
}

export default Component