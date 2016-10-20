let Component = {
  bindings: {
    href: '@'
  },
  controller: function($window,$timeout,$element) {
    let ctrl = this
    $element.html(`<div class="fb-page" data-href="${ctrl.href}" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="${ctrl.href}" class="fb-xfbml-parse-ignore"><a href="${ctrl.href}">Eventos do Bem</a></blockquote></div>`)
    $timeout(() => {
      if (typeof FB != 'undefined') {
        FB.XFBML.parse($element[0]);
      }
    })
  }
}

export default Component