import Config       from './config.js'
import Pages        from './controller/pages.js'

export default angular
  .module('pages', [])
  .config(Config)
  .controller('Pages', Pages)
