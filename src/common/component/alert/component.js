let Component = {
  restrict: 'E',
  bindings: {},
  template: `
    <p data-ng-repeat="alert in $ctrl.alerts" class="alert alert-dismissible" data-ng-class="[alert.type]" data-ng-show="alert.show" role="alert">
      <button type="button" class="close" data-ng-click="alert.show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <i class="fa" data-ng-class="[alert.icon]"></i>
      <span data-ng-repeat="error in alert.message">
        <span data-ng-bind-html="error"></span>
        <br>
      </span>
    </p>
  `,
  controller: function($scope) {
    let ctrl = this
    $scope.$on('alert', (event, args) => {
      ctrl.alerts = []
      args.show = true
      let data = angular.copy(args)
      args.message = []
      if (data.message.errors) {
        for (let i in data.message.errors) {
          args.message.push(data.message.errors[i])
        }
      } else {
        args.message.push(data.message.message)
      }
      ctrl.alerts.push(args)
    })
    $scope.$on('alert-clear', (event) => {
      ctrl.alerts = []
    })
    ctrl.$onChanges = () => {
      // ctrl.alerts = []
    }
    ctrl.$onInit = () => {
      ctrl.alerts = []
    }
  }
}

export default Component