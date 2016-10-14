export default class FileUpload {
  constructor($parse,$timeout) {
    this.restrict = 'A'
    this.parse = $parse
    this.timeout = $timeout
    this.reader = new FileReader()
  }
  link(scope, element, attrs) {
    let model = this.parse(attrs.fileUpload)
    let modelSetter = model.assign

    // this.timeout(() => {
      element.bind('change', () => {
        this.reader.onload = function() {
          scope.$apply(() => {
            modelSetter(scope, element[0].files[0])
            console.log(scope)
          })
        }
        this.reader.readAsDataURL(element[0].files[0])
      })
    // })
  }
  static factory($parse,$timeout) {
    FileUpload.instance = new FileUpload($parse,$timeout)
    return FileUpload.instance
  }
}

FileUpload.factory.$inject = ['$parse','$timeout']