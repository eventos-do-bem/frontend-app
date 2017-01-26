export default class FormatCurrency {
  constructor() {
    this.require = '?ngModel'
    this.restrict = 'A'
    this.scope = {
      formatCurrency: '=',
      variableOptions: '='
    }
    this.compile = this.compile
  }
  compile(tElem, tAttrs) {
  	let isInputText = tElem.is('input:text')
		return function(scope, elem, attrs, controller) {
			let updateElement = newVal => {
			  elem.autoNumeric('set', newVal)
			}
			
			elem.autoNumeric('init', scope.formatCurrency)
			if (scope.variableOptions === true) {
				scope.$watch('formatCurrency', newValue => {
					elem.autoNumeric('update', newValue)
				})
			}

			if (controller && isInputText) {
				scope.$watch(tAttrs.ngModel, () => {
					controller.$render()
				})

				controller.$render = () => {
					updateElement(controller.$viewValue)
				}

				elem.on('keyup', () => {
					scope.$applyAsync(() => {
						controller.$setViewValue(elem.autoNumeric('get'))
					})
				})
				elem.on('change', () => {
					scope.$applyAsync(() => {
						controller.$setViewValue(elem.autoNumeric('get'))
					})
				})
			} else {
				if (isInputText) {
					attrs.$observe('value', val => {
						updateElement(val)
					})
				}
			}
		}
  }
  static directiveFactory($window) {
    FormatCurrency.instance = new FormatCurrency()
    return FormatCurrency.instance
  }
}

FormatCurrency.directiveFactory.$inject = []