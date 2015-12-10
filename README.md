[![Appcelerator
Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/)
[![Appcelerator
Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)
[![License](http://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](http://choosealicense.com/licenses/apache-2.0/)

## ts.camera
Uniform wrapper for iOS com.mfogg.squarecamera and Android pw.custom.androidcamera modules. All icons are provided by [Ionicons](https://github.com/driftyco/ionicons) font; Refer to their documentation to find which icon is available.

## Previews 

![screenshot]()

## How to use

**index.xml**

```xml

<Alloy>
    <Window id="container">
        <Widget id="camera" src="ts.camera" onPictureTaken="onPictureTaken" />
    </Window>
</Alloy>


```

**index.tss**
```javascript
"#camera": { // styles for the camera
    top: 52
},
```

[![wearesmiths](http://wearesmiths.com/media/logoGitHub.png)](http://wearesmiths.com)
