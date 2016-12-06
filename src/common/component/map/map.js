import Component  from './component.js'

export default angular
  .module('map', [])
  .component('map', Component)
  .run(function($http, $templateCache) {
    $http.get('src/common/component/map/map.svg')
      .then(response => {
        $templateCache.put('./map.svg', response.data)
      })
  })
