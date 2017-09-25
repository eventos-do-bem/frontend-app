let Component = {
  restrict: 'E',
  transclude: true,
  require: ['ngModel'],
  bindings: {
    ngModel: '=',
    progress: '<?',
    disabled: '<?',
    current: '<?'
  },
  template: `
    <input type="file" ng-model="file" data-ng-hide="true">
    <div class="btn-group btn-group-justified" role="group">
      <a role="button" class="btn btn-default" data-ng-class="$ctrl.style" data-ng-click="click()" data-ng-disabled="$ctrl.disabled">
        <i class="fa fa-upload"></i>
        <span ng-transclude></span>
        <span data-ng-show="$ctrl.percent">
          <span data-ng-bind="$ctrl.percent"></span>%
        </span>
      </a>
      <a role="button" class="btn btn-default" data-ng-show="$ctrl.current" data-ng-class="$ctrl.style" data-ng-click="openCurrent($ctrl.current)" data-ng-disabled="$ctrl.disabled">
        <i class="fa fa-picture-o"></i>
      </a>
    </div>
  `,
  controller: function ($scope, $element, $attrs, $timeout, $parse, $uibModal) {
    let ctrl = this,
      file,
      model = $parse($attrs.ngModel),
      modelSetter = model.assign,
      modal = $uibModal

    ctrl.style = $attrs.class

    $scope.click = () => {
      file[0].click()
    }
    $scope.openCurrent = current => {
      modal.open({
        templateUrl: '/src/common/component/file/modal/view/image.html',
        controller: 'ModalFileImage',
        controllerAs: 'ctrl',
        size: 'sm',
        resolve: {
          image: () => {
            return current
          }
        }
      })
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
    ctrl.$onChanges = obj => {
      if (obj.progress && obj.progress.currentValue) {
        ctrl.percent = Math.round((obj.progress.currentValue.loaded / obj.progress.currentValue.total) * 100)
        if (ctrl.percent == 100) ctrl.percent = null
      }
    }
  }
}

export default Component
