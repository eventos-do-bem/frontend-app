let Component = {
  restrict: 'E',
  bindings: {
    show: '='
  },
  template: `
    <div class="loading" data-ng-show="$ctrl.show">
      <svg width="120px" height="120px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-dashinfinity">
        <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
        <path d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z" fill="none" stroke="#f00" stroke-width="3" stroke-dasharray="10.691190083821615 10.691190083821615" stroke-dashoffset="0">
          <animate attributeName="stroke-dashoffset" from="0" to="21.38238016764323" begin="0" dur="1s" repeatCount="indefinite" fill="freeze"></animate>
        </path>
      </svg>
    </div>
  `
}

export default Component