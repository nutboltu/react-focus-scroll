
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
  focusArea: IFocusArea;
  focusOnTriggered: boolean;
  childrenArray: ChildrenArray;
}

export type ChildrenArray = any[];
