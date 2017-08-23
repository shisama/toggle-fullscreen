var Promise = require('es6-promise').Promise;

/**
 * switch target DOMElement to fullscreen mode.
 * @param element {Element} DOMElement that you want to make fullscreen.
 */
function toggleFullscreen(element, callback) {
  if (callback) {
    if (!isFullscreen()) {
      enterFullscreen(element);
      fullScreenChange(function() {
        if (isFullscreen()) {
          callback(true);
        } else {
          callback(false);
        }
      });
    } else {
      exitFullscreen();
      callback(false);
    }
    return null;
  }
  return new Promise(function(resolve, reject) {
    if (!isFullscreen()) {
      enterFullscreen(element);
      fullScreenChange(function() {
        if (isFullscreen()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } else {
      exitFullscreen();
      resolve(false);
    }
  });

  /**
   * check whether fullscreen or not.
   * @returns {boolean}
   */
  function isFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      return false;
    }
    return true;
  }

  /**
   * enter fullscreen mode.
   * @param {Element} element
   */
  function enterFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.parentElement.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }

  /**
   * exit fullscreen mode.
   */
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  /**
   * injection function to onfullscreenchange.
   * @param callback
   */
  function fullScreenChange(callback) {
    if (document.fullscreenEnabled) {
      document.addEventListener('fullscreenchange', callback);
    } else if (document.mozFullScreenEnabled) {
      document.addEventListener('mozfullscreenchange',callback);
    } else if (document.webkitFullscreenEnabled) {
      document.addEventListener('webkitfullscreenchange', callback);
    } else if (document.msFullscreenEnabled) {
      document.addEventListener('MSFullscreenChange', callback);
    }
  }
}

module.exports = toggleFullscreen;
