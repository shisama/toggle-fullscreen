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

## API
### toggleFullscreen(target) ⇒ <code>Promise<></code>
Requests Fullscreen API.
Request to exit fullscreen mode if target is already fullscreen.
 
| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| target  | <code>Element</code> | target element to change fullscreen|

Usage:
```js
var target = document.querySelector('#target');
toggleFullscreen(target);
```
For jQuery:
```js
$('#target').on('click', event => {
	toggleFullscreen(event.target);
});
```

### fullscreenChange(callback) ⇒ <code>Promise<></code>
Add a listener for when the browser switches in and out of fullscreen. 
 
| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callback  | <code>function</code> | function to be called when the browser switches in and out of fullscreen|

Usage:
```js
fullscreenChange(function() {
  console.log('switch fullscreen');
});
```
### isFullscreen() ⇒ <code>Boolean</code>
Check whether fullscreen is active.
Usage:
```js
if (isFullscreen()) {
  console.log('fullscreen is active');
} else {
  console.log('fullscreen is not active');
} 
```

## Example
```jsx harmony
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen';

onChangeFullScreen = () => {
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

Or use Promise.all()

```jsx harmony
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen';

onChangeFullScreen = () => {
  // target element
  const element = document.getElementById('something');
  // callback function when fullscreen change is detected.
  const callback = () => {
    const isFullScreen = isFullscreen();
    this.setState({isFullScreen: isFullScreen});
    if (isFullScreen) {
      document.addEventListener('keydown', this.keydownEvent);
      element.style.width = '70%';
    } else {
      document.removeEventListener('keydown', this.keydownEvent);
      element.style.width = '100%';
    }
  };
  // execute toggle-fullscreen and add listener when fullscreen change detected asynchronously
  Promise.all([toggleFullscreen(element), fullscreenChange(callback)]);
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
