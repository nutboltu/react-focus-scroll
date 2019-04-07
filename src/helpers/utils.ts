export const findFocusElement = () => {
  const sectionNodes = document.getElementsByClassName('rfs-section');
  const sections = Array.prototype.slice.call(sectionNodes);
  const totalHeight = document.body.offsetHeight - window.innerHeight;
  if (sections.length === 0) {
    return -1;
  }
  if (window.scrollY === 0) {
    return 0;
  }
  if (window.scrollY >= totalHeight) {
    return sections.length - 1;
  }

  const focusPoint = window.innerHeight / 2;

  for (let i = 0 ; i < sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top;
    const bottom = top + sections[i].getBoundingClientRect().height;
    if (!(top > focusPoint || bottom < focusPoint)) {
      return i;
    }
  }
  return -1;
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
