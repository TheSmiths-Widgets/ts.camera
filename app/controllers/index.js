(function constructor(args) {
    $.container.orientationModes = [Ti.UI.PORTRAIT];

})(arguments[0] || {});

function clickedOnSnapBtn(e) {
    if (Ti.App.deployType === 'development') {
        return require('alloy/animation').flash($.snapBtn, 0, function finishCallback() {
            Alloy.createController('show', {
                image : Ti.UI.createView({
                    backgroundColor: '#4090DB',
                    width: Titanium.Platform.displayCaps.platformWidth,
                    height: Titanium.Platform.displayCaps.platformWidth,
                }).toImage()
            }).getView().open();
        });
    }

    require('alloy/animation').flash($.snapBtn, 0, function finishCallback() {
        $.camera.snapPicture();
    });
}

function clickedOnSwitchBtn(e) {
    $.camera.switchCamera();
}

function clickedOnFlashBtn(e) {
    $.camera.switchFlash(e);
}

function onPictureTaken(e) {
    console.log(e);
    return Alloy.createController('show', {
        image : e.image
    }).getView().open();
}

$.container.open();
