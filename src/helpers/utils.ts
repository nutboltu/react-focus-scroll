import {
  ID_PREFIX,
} from './config';

export const findFocusElement = () => {
  const sectionNodes = document.getElementsByClassName('rfs-section');
  const sections = Array.prototype.slice.call(sectionNodes);
  const totalHeight = document.body.offsetHeight - window.innerHeight;
  if (sections.length === 0) {
    return '';
  }
  if (window.scrollY === 0) {
    return getFocusIndex(0);
  }
  if (window.scrollY >= totalHeight) {
    return getFocusIndex(sections.length - 1);
  }

  const focusPoint = window.innerHeight / 2;

  for (const section of sections) {
    const top = section.getBoundingClientRect().top;
    const bottom = top + section.getBoundingClientRect().height;
    if (!(top > focusPoint || bottom < focusPoint)) {
      return section.id;
    }
  }
  return '';
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
  resolver.cancel = function cancel() {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return resolver;
};

export const throttle = (fn: any, wait: number) => {
  let throttled = false;
  let context: any;
  let args: any;
  let timeout: any;

  const resolver = function() {
    if (throttled) {
      args = arguments;
      context = this;
      return;
    }
    throttled = true;
    fn.apply(this, arguments);
    timeout = setTimeout(() => {
      throttled = false;
      if (args) {
        resolver.apply(context, args);
        args = context = null;
      }
    }, wait);
  };
  resolver.cancel = function cancel() {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return resolver;
};

export const getFocusIndex = (index: string | number | undefined): string => {
  const id = Number(index) || 0;
  const focusIndex = `${ID_PREFIX}${id}`;
  return focusIndex;
};

export const getClosest = (element: any, selector: any) => {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!document.documentElement.contains(element)) {
    return null;
  }
  let ancestor = element;
  do {
    if (ancestor.matches(selector)) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  } while (ancestor !== null);
  return null;
};
