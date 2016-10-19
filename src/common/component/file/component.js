let Component = {
  restrict: 'E',
  transclude: true,
  bindings: {
    model: '='
  },
  template: `
    <a>
      <div ng-transclude></div>
      <pre>{{$ctrl.model | json}}</pre>
      <input class="file" type="file" data-ng-model="$ctrl.model" >
    </a>
  `,
  controller: function($scope,$element,$timeout) {
    let ctrl = this,
        file = $element.find('input')

    $element.bind('click', (e) => {
      console.log(file[0])
      file[0].click()
    })
    // $element.bind('click', e => {
    //   console.log($element[0].querySelector('[type="file"]'))
    //   let file = $element[0].querySelector('[type="file"]')
    //   angular.element(file)[0].click()
    //   console.log()
    //   // e.target.querySelector('[type="file"]').click()
    //   // $element[0].querySelector('[type="file"]').click()
    //   // let el = $element[0].querySelector('.file')
    //   // el.click()
    // })
    // ctrl.change = () => {
    //   console.log('e')
    //   // $timeout(() => {
    //   // }, 1000)
    // }
  }
}

export default Component