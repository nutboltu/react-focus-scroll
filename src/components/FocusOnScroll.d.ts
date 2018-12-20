export interface IFocusArea {
  top: number;
  bottom: number;
}

export interface IFocusOnScrollProps {
  focusedClassName: string;
  tag: any;
  className: string;
  disableScroll: boolean;
  children: any;
  focusOn: string;
  sectionClassName: string;
}

export interface IFocusOnScrollState {
  focusIndex: number;
  focusArea: IFocusArea;
  focusOnTriggered: boolean;
  childrenArray: any[],
}