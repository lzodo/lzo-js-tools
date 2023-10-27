/**
 * 判断是浏览器环境还是其他
 */
export const isBrowser = () => {
  return typeof window === "undefined" ? false : true;
};
