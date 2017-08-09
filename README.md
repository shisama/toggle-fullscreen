toggle-fullscreen
===
Simple to use [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) with [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for cross-browser.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shisama/react-slideshow/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/toggle-fullscreen.svg)](https://www.npmjs.com/package/toggle-fullscreen)

## [Demo](https://shisama.github.io/react-slideshow-ui/demo/)(via [react-slideshow-ui](https://www.npmjs.com/package/react-slideshow-ui))

## Install
```
npm install --save toggle-fullscreen
```

## Usage
```js
onChangeFullScreen = function() {
  const element = document.getElementById('something');
  toggleFullscreen(element).then(function(isFullScreen) {
    if (isFullScreen) {
      // any process in fullscreen mode
      // e.g.document.addEventListener('keydown', this.keydownEvent);
    } else {
      // any process in fullscreen mode
      // e.g.document.removeEventListener('keydown', this.keydownEvent);
    }
  });
};
```

For async/await:
```js
onChangeFullScreen = async () => {
  const element = document.getElementById('something');
  const isFullScreen = await toggleFullscreen(element);
  if (isFullScreen) {
    // any process in fullscreen mode
    // e.g.document.addEventListener('keydown', this.keydownEvent);
  } else {
    // any process in fullscreen mode
    // e.g.document.removeEventListener('keydown', this.keydownEvent);
  }
};
```

## Support
- Chrome@latest
- Firefox@latest
- Safari@latest
- MSEdge@latest

## License
This project is licensed under the terms of the
[MIT license](https://github.com/shisama/react-slideshow/blob/master/LICENSE)
