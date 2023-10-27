(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jstools = {}));
})(this, (function (exports) { 'use strict';

  /**
   * 判断是浏览器环境还是其他
   */
  var isBrowser = function isBrowser() {
    return typeof window === "undefined" ? false : true;
  };
  console.log(isBrowser());

  /**
   * 延迟函数
   * @param {*} duration  毫秒数
   */
  var sleep = function sleep(duration) {
    var start = Date.now();
    while (Date.now() - start < duration) {
      if (Date.now() - start > 100) return;
    }
  };

  /**
   * 输入时间范围
   * @param {*} min  范围最小值
   * @param {*} max  范围最大值
   * @returns
   */
  var randomRange = function randomRange(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  var scrollEle = function scrollEle(position, element) {
    // 只有不是浏览器，或者element不是dom元素就直接返回
    if (!isBrowser || element instanceof HTMLElement) {
      return;
    }
    element.scrollIntoView({
      behavior: "smooth",
      // 平滑滚动
      bolck: position || "center" // 滚动到可视范围中间
    });
  };

  exports.isBrowser = isBrowser;
  exports.randomRange = randomRange;
  exports.scrollEle = scrollEle;
  exports.sleep = sleep;

}));
