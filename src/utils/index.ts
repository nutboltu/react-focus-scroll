
export const findFocusArea = () => {
  const { childrenArray } = this.state;
  if (!childrenArray.length) {
    return { top: 0, bottom: 0 };
  }

  const bottom = window.innerHeight * config.halfSize;
  const minHeight = childrenArray.reduce((acc, cur) =>
    Math.min(cur.clientHeight, acc), bottom);

  return {
    top: bottom - (minHeight * config.halfSize),
    bottom,
  };
}

export const findFocusElement = () => {
  const { focusArea, childrenArray } = this.state;
  const windowHeight = document.body.offsetHeight - window.innerHeight;

  if (!childrenArray.length) return -1;

  if (window.scrollY === 0) return 0;

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
}
