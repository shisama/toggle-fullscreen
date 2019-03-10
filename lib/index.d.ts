import 'es6-promise/auto';
/**
 * switch target DOMElement to fullscreen mode.
 * @param element {Element} DOMElement that you want to make fullscreen.
 */
export default function toggleFullscreen(element: Element, callback?: Function): Promise<any>;
/**
 * check if fullscreen or not.
 * @returns {boolean}
 */
export declare function isFullscreen(): boolean;
/**
 * add eventListener 'fullscreenchange'
 * @param callback
 * @return {Promise}
 */
export declare function fullscreenChange(callback: EventListenerOrEventListenerObject): Promise<any>;
