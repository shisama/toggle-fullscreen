"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
es6_promise_1.polyfill();
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
        return null;
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
        var requestFullscreen = element.requestFullscreen ||
            element.msRequestFullscreen ||
            element.parentElement.mozRequestFullScreen ||
            element.webkitRequestFullscreen ||
            element.parentElement.webkitRequestFullscreen;
        requestFullscreen();
    }
    /**
     * exit fullscreen mode.
     */
    function exitFullscreen() {
        var exitFullscreen = document.exitFullscreen ||
            document.msExitFullscreen ||
            document.mozCancelFullScreen ||
            document.webkitExitFullscreen;
        exitFullscreen();
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
