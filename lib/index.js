"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise/auto");
/**
 * switch target DOMElement to fullscreen mode.
 * @param element {Element} DOMElement that you want to make fullscreen.
 */
function toggleFullscreen(element, callback) {
    if (callback && typeof callback === 'function') {
        if (!isFullscreen()) {
            var fn = function (e) {
                if (isFullscreen()) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            };
            fullscreenChange(fn);
            enterFullscreen(element);
        }
        else {
            exitFullscreen();
            callback(false);
        }
        return Promise.resolve();
    }
    return new Promise(function (resolve) {
        if (!isFullscreen()) {
            enterFullscreen(element);
        }
        else {
            exitFullscreen();
        }
        resolve();
    });
    /**
     * enter fullscreen mode.
     * @param {Element} element
     */
    function enterFullscreen(element) {
        var userAgent = navigator.userAgent.toLowerCase();
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.parentElement.mozRequestFullScreen();
        }
        else if (userAgent.indexOf('edge') != -1) {
            element.parentElement.webkitRequestFullscreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    /**
     * exit fullscreen mode.
     */
    function exitFullscreen() {
        var _doument = document;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (_doument.msExitFullscreen) {
            _doument.msExitFullscreen();
        }
        else if (_doument.mozCancelFullScreen) {
            _doument.mozCancelFullScreen();
        }
        else if (_doument.webkitExitFullscreen) {
            _doument.webkitExitFullscreen();
        }
    }
}
exports.default = toggleFullscreen;
/**
 * check if fullscreen or not.
 * @returns {boolean}
 */
function isFullscreen() {
    var _document = document;
    if (!_document.fullscreenElement &&
        !_document.mozFullScreenElement &&
        !_document.webkitFullscreenElement &&
        !_document.msFullscreenElement) {
        return false;
    }
    return true;
}
exports.isFullscreen = isFullscreen;
/**
 * add eventListener 'fullscreenchange'
 * @param callback
 * @return {Promise}
 */
function fullscreenChange(callback) {
    var _document = document;
    return new Promise(function (resolve, reject) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', callback);
        }
        else if (_document.mozFullScreenEnabled) {
            _document.addEventListener('mozfullscreenchange', callback);
        }
        else if (_document.webkitFullscreenEnabled) {
            _document.addEventListener('webkitfullscreenchange', callback); //Safari
            _document.addEventListener('fullscreenChange', callback); // Edge
        }
        else if (_document.msFullscreenEnabled) {
            _document.addEventListener('MSFullscreenChange', callback);
        }
        else {
            reject();
        }
        resolve();
    });
}
exports.fullscreenChange = fullscreenChange;
