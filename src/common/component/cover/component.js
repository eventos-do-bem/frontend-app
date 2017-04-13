let Component = {
  transclude: true,
  bindings: {
    position: '=',
    onSave: '&'
  },
  template: `
    <style>
      .arrows {
        position: absolute;
        width: 100%;
        padding: 20px;
        z-index: 999;
      }
      .arrows .btn {
        display: block;
        margin-top: 10px;
        padding: 6px 10px 6px 16px;
      }
      .arrows .btn:first-child {
        margin-top: 0px;
      }
    </style>
    <div class="arrows">
      <button class="btn btn-warning" data-ng-click="$ctrl.up()" uib-tooltip="Subir" tooltip-placement="right">
        <i class="fa fa-arrow-up"></i>
      </button>
      <button class="btn btn-warning" data-ng-click="$ctrl.down()" uib-tooltip="Descer" tooltip-placement="right">
        <i class="fa fa-arrow-down"></i>
      </button>
      <button class="btn btn-warning" data-ng-click="$ctrl.save()" uib-tooltip="Salvar" tooltip-placement="right">
        <i class="fa fa-save"></i>
      </button>
    </div>
    <div ng-transclude></div>
  `,
  controller: function($scope,$element,$attrs,$timeout,$parse) {
    let ctrl = this

    let getPosition = () => {
      ctrl.position = Number(ctrl.cover.style.backgroundPositionY.match(/[-]{0,1}[\d.]*[\d]+/g)[0])
    }
    let move = pixels => {
      ctrl.cover.style.backgroundPositionY = `${pixels}px`
      getPosition()
    }
    ctrl.up = () => {
      move(ctrl.stepUp + ctrl.position)
    }
    ctrl.down = () => {
      move(ctrl.stepDown + ctrl.position)
    }
    ctrl.save = () => {
      ctrl.onSave()
    }
    ctrl.$postLink = () => {
      ctrl.cover = $element.find($attrs.selector)[0]
      getPosition()
    }
    ctrl.$doCheck = () => {
      if (ctrl.position) move(ctrl.position)
    }
    ctrl.$onInit = () => {
      ctrl.position = null
      let step = Number($attrs.step)
      ctrl.stepUp = step * -1
      ctrl.stepDown = step 
    }
  }
}

export default Component