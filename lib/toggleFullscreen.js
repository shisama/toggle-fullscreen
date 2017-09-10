(function(_window, _document, _navigator) {
  require('es6-promise').polyfill();

  /**
   * switch target DOMElement to fullscreen mode.
   * @param element {Element} DOMElement that you want to make fullscreen.
   */
  function toggleFullscreen(element, callback) {
    if (callback && typeof callback === 'function') {
      if (!isFullscreen()) {
        fullscreenChange(function () {
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
    return new Promise(function (resolve, reject) {
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
      var userAgent = _navigator.userAgent.toLowerCase();
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
      if (_document.exitFullscreen) {
        _document.exitFullscreen();
      } else if (_document.msExitFullscreen) {
        _document.msExitFullscreen();
      } else if (_document.mozCancelFullScreen) {
        _document.mozCancelFullScreen();
      } else if (_document.webkitExitFullscreen) {
        _document.webkitExitFullscreen();
      }
    }
  }

  /**
   * check if fullscreen or not.
   * @returns {boolean}
   */
  function isFullscreen() {
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
  function fullscreenChange(callback) {
    return new Promise(function (resolve, reject) {
      if (_document.fullscreenEnabled) {
        _document.addEventListener('fullscreenchange', callback);
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

  module.exports = toggleFullscreen;
  module.exports.fullscreenChange = fullscreenChange;
  module.exports.isFullscreen = isFullscreen;
})(window, document, navigator);