import Component      from './component.js'
import ModalFileImage from './modal/controller/image.js'

export default angular
  .module('file', [])
  .controller('ModalFileImage', ModalFileImage)
  .component('file', Component)
