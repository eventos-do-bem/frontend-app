export default class FixedOnScroll {
  constructor($window) {
    this.restrict = 'A'
    this.window = $window
  }
  link(scope, elem, attrs) {
    let e = elem[0],
        offset = attrs.offset || 0,
        top = attrs.top || 0

    e.style.position = 'static'
    e.style.top = 'auto'
    e.style.right = 'auto'
    e.style.bottom = 'auto'
    e.style.left = 'auto'
    
    angular.element(this.window).on('scroll', ev => {
      if (ev.pageY > offset) {
        e.style.position = 'sticky'
        e.style.top = top + 'px'
      }
      else if (ev.pageY < offset) {
        e.style.position = 'static'
        e.style.top = 'auto'
      }
    })
  }
  static directiveFactory($window) {
    FixedOnScroll.instance = new FixedOnScroll($window)
    return FixedOnScroll.instance
  }
}

FixedOnScroll.directiveFactory.$inject = ['$window']