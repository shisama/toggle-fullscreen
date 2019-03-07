import {polyfill} from 'es6-promise';
polyfill();

/**
 * switch target DOMElement to fullscreen mode.
 * @param element {Element} DOMElement that you want to make fullscreen.
 */
export default function toggleFullscreen(element: Element, callback?: Function) {
  if (callback && typeof callback === 'function') {
    if (!isFullscreen()) {
      const fn: EventListenerOrEventListenerObject =  (e: Event) => {
        if (isFullscreen()) {
          callback(true);
        } else {
          callback(false);
        }
      }
      fullscreenChange(fn);
      enterFullscreen(element);
    } else {
      exitFullscreen();
      callback(false);
    }
    return null;
  }
  return new Promise((resolve: () => any) => {
    if (!isFullscreen()) {
      enterFullscreen(element);
    } else {
      exitFullscreen();
    }
    resolve();
  });

  /**
   * enter fullscreen mode.
   * @param {Element} element
   */
  function enterFullscreen(element: Element) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).parentElement.mozRequestFullScreen();
    } else if (userAgent.indexOf('edge') != -1) {
      (element as any).parentElement.webkitRequestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    }
  }

  /**
   * exit fullscreen mode.
   */
  function exitFullscreen() {
    const _doument: any = document;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (_doument.msExitFullscreen) {
      _doument.msExitFullscreen();
    } else if (_doument.mozCancelFullScreen) {
      _doument.mozCancelFullScreen();
    } else if (_doument.webkitExitFullscreen) {
      _doument.webkitExitFullscreen();
    }
  }
}

/**
 * check if fullscreen or not.
 * @returns {boolean}
 */
export function isFullscreen() {
  const _document: any = document;
  if (
    !_document.fullscreenElement &&
    !_document.mozFullScreenElement &&
    !_document.webkitFullscreenElement &&
    !_document.msFullscreenElement
  ) {
    return false;
  }
  return true;
}

/**
 * add eventListener 'fullscreenchange'
 * @param callback
 * @return {Promise}
 */
export function fullscreenChange(callback: EventListenerOrEventListenerObject) {
  const _document: any = document;
  return new Promise(function (resolve, reject) {
    if (document.fullscreenEnabled) {
      document.addEventListener('fullscreenchange', callback);
    } else if (_document.mozFullScreenEnabled) {
      _document.addEventListener('mozfullscreenchange', callback);
    } else if (_document.webkitFullscreenEnabled) {
      _document.addEventListener('webkitfullscreenchange', callback); //Safari
      _document.addEventListener('fullscreenChange', callback); // Edge
    } else if (_document.msFullscreenEnabled) {
      _document.addEventListener('MSFullscreenChange', callback);
    } else {
      reject();
    }
    resolve();
  });
}