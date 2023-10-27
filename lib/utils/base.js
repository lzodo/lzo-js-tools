/**
 * 延迟函数
 * @param {*} duration  毫秒数
 */
export const sleep = (duration) => {
  var start = Date.now();
  while (Date.now() - start < duration) {
    if (Date.now() - start > 40000) return;
  }
};

/**
 * 输入时间范围
 * @param {*} min  范围最小值
 * @param {*} max  范围最大值
 * @returns
 */
export const randomRange = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};
