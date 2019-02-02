import { IFocusArea, ChildrenArray } from '../@types';

export const findFocusArea = (childrenArray: any[]): IFocusArea => {
  if (!childrenArray.length) {
    return { top: 0, bottom: 0 };
  }

  const bottom = window.innerHeight * 0.50;
  const minHeight = childrenArray.reduce((acc, cur) =>
    Math.min(cur.clientHeight, acc), bottom);

  return {
    top: bottom - (minHeight * 0.50),
    bottom,
  };
};

export const findFocusElement = (focusArea: IFocusArea, childrenArray: ChildrenArray) => {
  const windowHeight = document.body.offsetHeight - window.innerHeight;

  if (childrenArray.length === 0) {
    return -1;
  }
  if (window.scrollY === 0) {
    return 0;
  }
  if (window.scrollY >= windowHeight) {
    return childrenArray.length - 1;
  }

  const focusTop = focusArea.top + window.scrollY;
  const focusBottom = focusArea.bottom + window.scrollY;

  return childrenArray.reduce((acc, element, index) => {
    const top = element.getBoundingClientRect().top + window.pageYOffset;

    const bottom = top + element.clientHeight;
    const isInfocusArea = !(top > focusBottom || bottom < focusTop);
    return isInfocusArea ? index : acc;
  }, 0);
};

export const debounce = (fn: any, wait: number) => {
  let timeout: any;
  const resolver = function() {
    const context = this;
    const args = arguments;
    const later = () => {
      fn.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

  };
  return resolver;
};

export const throttle = (fn: any, wait: number) => {
  let throttled = false;
  // tslint:disable-next-line:one-variable-per-declaration
  let context: any, args: any;
  const resolver = function() {
    if (throttled) {
      args = arguments;
      context = this;
      return;
    }
    throttled = true;
    fn.apply(this, arguments);
    setTimeout(() => {
      throttled = false;
      if (args) {
        resolver.apply(context, args);
        args = context = null;
      }
    }, wait);
  };
  return resolver;
};
