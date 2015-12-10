(function constructor(args) {
    // setup image view
    $.img.top = $.navbar.height;
    if (OS_ANDROID) {
        $.img.width = Titanium.Platform.displayCaps.platformWidth + 'px';
        $.img.height = Titanium.Platform.displayCaps.platformWidth + 'px';
    }
    else {
        $.img.width = Titanium.Platform.displayCaps.platformWidth;
        $.img.height = Titanium.Platform.displayCaps.platformWidth;

    }

    $.img.image = args.image;
})(arguments[0] || {});

function  close(e) {
    $.container.close();
}
