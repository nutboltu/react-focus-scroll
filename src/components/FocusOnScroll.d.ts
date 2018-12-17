export interface IFocusArea {
  top: number;
  bottom: number;
}

export interface IFocusOnScrollProps {

}

export interface IFocusOnScrollState {
  focusIndex: number;
  focusArea: IFocusArea;
  focusOnTriggered: boolean;
  childrenArray: [any],
}