let Component = {
  restrict: 'E',
  bindings: {},
  template: `
    <p data-ng-repeat="alert in $ctrl.alerts" class="alert alert-dismissible" data-ng-class="[alert.type]" data-ng-show="alert.show" role="alert">
      <button type="button" class="close" data-ng-click="alert.show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <i class="fa" data-ng-class="[alert.icon]"></i>
      <span data-ng-bind-html="alert.message"></span>
    </p>
  `,
  controller: function($scope) {
    let ctrl = this
    $scope.$on('alert', (event, args) => {
      args.show = true
      ctrl.alerts.push(args)
    })
    $scope.$on('alert-clear', (event) => {
      ctrl.alerts = []
    })
    ctrl.$onInit = () => {
      ctrl.alerts = []
    }
  }
}

export default Component