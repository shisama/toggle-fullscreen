require('es6-promise').polyfill();

/**
 * switch target DOMElement to fullscreen mode.
 * @param element {Element} DOMElement that you want to make fullscreen.
 */
function toggleFullscreen(element, callback) {
  if (callback && typeof callback === 'function') {
    if (!isFullscreen()) {
      fullScreenChange(function() {
        if (isFullscreen()) {
          callback(true);
        } else {
          callback(false);
        }
      });
      enterFullscreen(element);
    } else {
      exitFullscreen();
      callback(false);
    }
    return null;
  }
  return new Promise(function(resolve, reject) {
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
  function enterFullscreen(element) {
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.parentElement.mozRequestFullScreen();
    } else if (userAgent.indexOf('edge') != -1) {
      element.parentElement.webkitRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
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
}

/**
 * check if fullscreen or not.
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
 * add eventListener 'fullscreenchange'
 * @param callback
 * @return {Promise}
 */
function fullscreenChange(callback) {
  return new Promise(function(resolve, reject) {
    if (document.fullscreenEnabled) {
      document.addEventListener('fullscreenchange', callback);
    } else if (document.mozFullScreenEnabled) {
      document.addEventListener('mozfullscreenchange', callback);
    } else if (document.webkitFullscreenEnabled) {
      document.addEventListener('webkitfullscreenchange', callback); //Safari
      document.addEventListener('fullscreenChange', callback); // Edge
    } else if (document.msFullscreenEnabled) {
      document.addEventListener('MSFullscreenChange', callback);
    } else {
      reject();
    }
    resolve();
  });
}

module.exports = toggleFullscreen;
module.exports.fullscreenChange = fullscreenChange;
module.exports.isFullscreen = isFullscreen;