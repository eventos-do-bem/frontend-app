let Component = {
  restrict: 'E',
  bindings: {
    highlighted: '<'
  },
  controller: function ($element) {
    let ctrl = this
    ctrl.$onChanges = () => {
      if (ctrl.highlighted) {
        ctrl.highlighted = ctrl.highlighted.toLowerCase().replace(/\s/g, '');
        let state = $element[0].querySelector(`.${ctrl.highlighted}`)
        if (state) {
          state.style.fill = '#0074DB'
        }
      }
    }
  },
  templateUrl: './map.svg'
}

export default Component