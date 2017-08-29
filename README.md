toggle-fullscreen
===
Simple to use [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) with [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for cross-browser.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shisama/toggle-fullscreen/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/toggle-fullscreen.svg)](https://www.npmjs.com/package/toggle-fullscreen)

## [Demo](https://shisama.github.io/react-slideshow-ui/demo/)(via [react-slideshow-ui](https://www.npmjs.com/package/react-slideshow-ui))

## Install
```
npm install --save toggle-fullscreen
```

## Usage
```jsx harmony
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen';

onChangeFullScreen = function() {
  const element = document.getElementById('something');
  toggleFullscreen(element)
    .then(() => {
      return fullscreenChange(() => {
        const isFullScreen = isFullscreen();
        if (isFullScreen) {
          // any process in fullscreen mode
          // e.g.document.addEventListener('keydown', keydownFunction);
        } else {
          // any process in non-fullscreen mode
          // e.g.document.removeEventListener('keydown', keydownFunction);
        }
      });
    })
    .then(() => {
      console.log('successed!');
    })
    .catch(() => {
      console.log('failed!');
    });
};
```

For async/await:
```jsx harmony
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen';

onChangeFullScreen = async () => {
  const element = document.getElementById('something');
  await toggleFullscreen(element);
  await fullscreenChange(() => {
    const isFullScreen = isFullscreen();
    if (isFullScreen) {
      // any process in fullscreen mode
      // e.g.document.addEventListener('keydown', keydownFunction);
    } else {
      // any process in non-fullscreen mode
      // e.g.document.removeEventListener('keydown', keydownFunction);
    }
  }).catch(() => {
    console.log('failed!');
  });
  console.log('successed!');
};
```

For callback (use if something is wrong with Promise) :
```js
const toggleFullscreen = require('toggle-fullscreen');
onChangeFullScreen = function() {
  const element = document.getElementById('something');
  toggleFullscreen(element, function(isFullScreen) {
    if (isFullScreen) {
      // any process in fullscreen mode
      // e.g.document.addEventListener('keydown', this.keydownEvent);
    } else {
      // any process in non-fullscreen mode
      // e.g.document.removeEventListener('keydown', this.keydownEvent);
    }
  });
};
```
## Support
- Chrome@latest
- Firefox@latest
- Safari@latest
- MSEdge@latest
- IE11

## License
This project is licensed under the terms of the
[MIT license](https://github.com/shisama/toggle-fullscreen/blob/master/LICENSE)
