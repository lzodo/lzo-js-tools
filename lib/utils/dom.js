import { isBrowser } from "./determine";

export const scrollEle = (position, element) => {
  // 只有不是浏览器，或者element不是dom元素就直接返回
  if (!isBrowser || element instanceof HTMLElement) {
    return;
  }
  element.scrollIntoView({
    behavior: "smooth", // 平滑滚动
    bolck: position || "center", // 滚动到可视范围中间
  });
};
