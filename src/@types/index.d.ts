
export interface IFocusArea {
  top: number;
  bottom: number;
}

export interface IFocusOnScrollProps {
  children: ChildrenArray;
  className?: string;
  focusOn?: string;
  onFocus?: (focusIndex: number) => void;
}

export interface IFocusOnScrollState {
  focusIndex: number;
  focusOnTriggered: boolean;
}

export type ChildrenArray = any[];
