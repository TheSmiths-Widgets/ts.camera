(function constructor(args) {

  if (!OS_IOS && !OS_ANDROID) {
    console.warn('[ts.camera] only supports iOS and Android.');
    return;
  }

  var camera = generateCameraView();

  // apply styles
  if (args) {
    camera.applyProperties(args);
  }

  $.addTopLevelView(camera);

})(arguments[0] || {});

function generateCameraView() {
    if (Ti.App.deployType === 'development' || !Ti.Media.isCameraSupported) {
        Ti.API.error('Camera is not found.');

        var width = Titanium.Platform.displayCaps.platformWidth;
        var height = Titanium.Platform.displayCaps.platformWidth;

        if (OS_ANDROID) {
            width = width + 'px';
            height = width + 'px';
        }
        return Ti.UI.createView({
            top: 0,
            left: 0,
            backgroundColor: '#000',
            width: width,
            height: height
        });
    }

    if (OS_ANDROID) {
        var androidCameraView = require('pw.custom.androidcamera');

        var cameraView = androidCameraView.createCameraView({
            top: 0,
            left: 0,
            width: Titanium.Platform.displayCaps.platformWidth + 'px',
            height: Titanium.Platform.displayCaps.platformWidth + 'px',

            pictureTimeout: 200,
            useFrontCamera: true,
            save_location: 'camera',
            resolutionNamed: androidCameraView.RESOLUTION_480
        });

        cameraView.addEventListener('picture_taken', function(e){
            return $.trigger('pictureTaken', {
                image : e.path
            })
        });

        // FIXME
        var cameraViewContainer = Ti.UI.createView({
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE
        })

        cameraViewContainer.add(cameraView);

        return cameraViewContainer;
    }
    else if (OS_IOS) {
        var iosCameraView = require('com.mfogg.squarecamera');

        var cameraView = iosCameraView.createView({
            top: 0,
            left: 0,
            height: Titanium.Platform.displayCaps.platformWidth,
            width: Titanium.Platform.displayCaps.platformWidth,

            // Since version 0.7 : optional boolean to activate 2d code detection.
            // Dection fires 'code' event contaning e.codeType and e.value -All codes types are supported
            detectCodes:true,
            backgroundColor: '#fff',
            // Optional Defaults to QUALITY_HIGH
            frontQuality: iosCameraView.QUALITY_HIGH,
            // Optional Defaults to QUALITY_HD
            backQuality: iosCameraView.QUALITY_HD,
            // Optional 'back' or 'front'
            camera: 'back',
        });

        cameraView.addEventListener('success', function(e){
            return $.trigger('pictureTaken', _.extend(e, {
                image : e.media
            }))
        });

        return cameraView;
    }
}

function snapPicture(e) {
    var cameraView = $.getTopLevelViews()[0];

    if (OS_ANDROID) {
        cameraView = cameraView.children[0];
        cameraView.snapPicture();
    }
    OS_IOS && cameraView.takePhoto();
}

function switchCamera(e) {
    var cameraView = $.getTopLevelViews()[0];

    if (Ti.App.deployType === 'development') {
        Ti.API.error('Switching Camera is not supported.');
        return false;
    }

    OS_IOS && cameraView.setCamera(cameraView.camera === 'back' ? 'front' : 'back');

    if (OS_ANDROID) {
        if (OS_ANDROID) {
            cameraView = cameraView.children[0];
        }
        var currentUseFrontCamera = cameraView.useFrontCamera;
        console.log(currentUseFrontCamera);

        var androidCameraView = require('pw.custom.androidcamera');

        var _cameraView = androidCameraView.createCameraView({
            top: 0,
            left: 0,
            width: Titanium.Platform.displayCaps.platformWidth + 'px',
            height: Titanium.Platform.displayCaps.platformWidth + 'px',

            pictureTimeout: 200,
            useFrontCamera: !currentUseFrontCamera,
            save_location: 'camera',
            resolutionNamed: androidCameraView.RESOLUTION_480
        });

        _cameraView.addEventListener('picture_taken', function(e){
            return $.trigger('pictureTaken', {
                image : e.path
            })
        });

        $.getTopLevelViews()[0].removeAllChildren();

        $.getTopLevelViews()[0].add(_cameraView);
    }
}

function switchFlash(e) {
    var cameraView = $.getTopLevelViews()[0];
    var flashBtn = e.source;

    if (Ti.App.deployType === 'development') {
        Ti.API.error('Switching Flash is not supported.');
        return false;
    }

    if (OS_IOS) {
        if (flashBtn.state === 'OFF') {
            cameraView.turnFlashOn();
            flashBtn.state = 'ON';
            flashBtn.text = '\uf136';

        }
        else if (flashBtn.state === 'ON') {
            cameraView.turnFlashOff();
            flashBtn.state = 'OFF';
            flashBtn.text = '\uf137';
        }
    }
    else {
        cameraView = cameraView.children[0];

        cameraView.switchFlashlight();
        flashBtn.text = flashBtn.text === '\uf137' ? '\uf136' : '\uf137';
    }
}

exports.snapPicture = snapPicture;
exports.switchCamera = switchCamera;
exports.switchFlash = switchFlash;
