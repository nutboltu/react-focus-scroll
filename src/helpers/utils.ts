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
