let Component = {
  restrict: 'E',
  bindings: {
    show: '=?',
    type: '=?',
    icon: '=?',
    message: '=?'
  },
  template: `
    <p data-ng-repeat="alert in $ctrl.alerts" class="alert alert-dismissible" data-ng-class="[alert.type]" data-ng-show="$ctrl.show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <i class="fa" data-ng-class="[alert.icon]"></i>
      <span data-ng-bind-html="alert.message"></span>
    </p>
  `,
  controller: function($scope) {
    let ctrl = this
    $scope.$on('alert', (event, args) => {
      ctrl.alerts.push(args)
      // ctrl.type = args.type
      // ctrl.icon = args.icon
      // ctrl.message = args.message
      ctrl.show = true
    })
    $scope.$on('alert-clear', (event) => {
      ctrl.alerts = []
    })
    ctrl.$onInit = () => {
      ctrl.alerts = []
      ctrl.show = false
    }
  }
}

export default Component