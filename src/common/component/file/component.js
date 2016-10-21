let Component = {
  restrict: 'E',
  transclude: true,
  require: ['ngModel'],
  bindings: {
    ngModel: '='
  },
  template: `
    <input type="file" ng-model="file" data-ng-hide="true">
    <button type="button" class="btn btn-default" data-ng-click="click()">
      <i class="fa fa-upload"></i>
      <span ng-transclude></span>
    </button>
  `,
  controller: function($scope,$element,$attrs,$timeout,$parse) {
    let ctrl = this,
        file,
        model = $parse($attrs.ngModel),
        modelSetter = model.assign

    $scope.click = () => {
      file[0].click()
    }
    $timeout(() => {
      file = $element.find('input')
      $element.bind('change', () => {
        $scope.$apply(() => {
          modelSetter($scope, file[0].files[0])
          ctrl.ngModel = file[0].files[0]
        })
      })
    })
  }
}

export default Component