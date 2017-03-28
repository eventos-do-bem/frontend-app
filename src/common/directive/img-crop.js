function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], { type: mimeString });
  return blob;
}


class ImageCrop {
  constructor($scope) {
    this.restrict = 'E';
    this.scope = {
      ngModel: '=',
      areaType: '@?',
      resultImageSize: '@?'
    };
    this.lastModified = null;
    this.fileName = '';
    this.template = `
    <div class="modal" tabindex="-1" role="dialog" ng-class="{'visible-md visible-sm visible-xs visible-lg': isOpen}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="close()"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Escolha a melhor parte da imagem</h4>
          </div>
          <div class="modal-body">
            <div class="cropArea">
              <img-crop image="myImage" area-type="{{areaType}}" result-image="myCroppedImage" result-image-size="resultImageSize"></img-crop>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" ng-click="crop()">
              <i class="fa fa-crop" aria-hidden="true"></i>
              Recortar
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  link($scope) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.areaType = ($scope.areaType) ? $scope.areaType : 'circle';
    $scope.resultImageSize = ($scope.resultImageSize) ? $scope.resultImageSize : '200';

    let reader = new FileReader();

    reader.onload = (evt) => {
      $scope.$apply(() => {
        $scope.myImage = evt.target.result;
      });
    };

    $scope.$watch('ngModel', (value) => {
      if (value && value.lastModified != this.lastModified) {
        this.lastModified = value.lastModified;
        this.fileName = value.name;
        reader.readAsDataURL(value);
        $scope.isOpen = true;
      } else if (value) {
        this.lastModified = null;
      }
    });

    $scope.close = () => {
      delete $scope.ngModel;
      $scope.isOpen = false;
    }

    $scope.crop = () => {
      let newFile = new File([dataURItoBlob($scope.myCroppedImage)], this.fileName);
      this.lastModified = newFile.lastModified;
      this.fileName = newFile.name;
      $scope.ngModel = newFile;
      $scope.isOpen = false;
    };
  }

  static imageCrop() {
    ImageCrop.instance = new ImageCrop();
    return ImageCrop.instance;
  }
}

export default ImageCrop
