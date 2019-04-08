
export interface IFocusArea {
  top: number;
  bottom: number;
}

export interface IFocusOnScrollProps {
  children: ChildrenArray;
  className?: string;
  focusOn?: string;
  onFocus?: () => void;
}

export interface IFocusOnScrollState {
  focusIndex: string;
}

export type ChildrenArray = any[];

declare global {
  // tslint:disable-next-line
  interface Element {
    msMatchesSelector(selectors: string): boolean;
  }
}
