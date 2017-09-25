export default class ModalFileImage {
  constructor ($uibModalInstance, image) {
    this.instance = $uibModalInstance
    this.image = image
  }
  cancel () {
    this.instance.dismiss('cancel')
  }
}

ModalFileImage.$inject = ['$uibModalInstance', 'image']
