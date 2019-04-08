import * as React from 'react';

import {
  DELAY_TIME_IN_MS,
  SUPPORTED_TAGS_FOR_FOCUS,
} from '../helpers/config';
import {
  findFocusElement,
  getFocusIndex,
  throttle,
  debounce,
} from '../helpers/utils';

import {
  IFocusOnScrollProps,
  IFocusOnScrollState,
} from '../@types';

class FocusOnScroll extends React.Component<IFocusOnScrollProps, IFocusOnScrollState> {
  private debounceResizeHandlerRef: any;
  private throttleScrollHandlerRef: any;

  constructor(props: IFocusOnScrollProps) {
    super(props);
    this.state = {
      focusIndex: getFocusIndex(this.props.focusOn),
    };
  }
  private debounceResizeHandler = () => debounce(this.scrollHandler, DELAY_TIME_IN_MS);
  private throttleScrollHandler = () => throttle(this.scrollHandler, DELAY_TIME_IN_MS);

  private getInlineStyles = (focused: boolean) => {
    return {
      opacity: focused ? 1 : 0.5,
      transition: 'opacity 0.1s ease-in-out',
    };
  }

  public componentDidMount() {
    this.debounceResizeHandlerRef = this.debounceResizeHandler();
    this.throttleScrollHandlerRef = this.throttleScrollHandler();
    window.addEventListener('scroll', this.throttleScrollHandlerRef);
    window.addEventListener('resize', this.debounceResizeHandlerRef);
  }

  public componentDidUpdate(prevProps: IFocusOnScrollProps) {
    if (this.props.focusOn !== prevProps.focusOn) {
      this.focusOnHandler(getFocusIndex(prevProps.focusOn));
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScrollHandler);
    window.removeEventListener('resize', this.debounceResizeHandler);
    this.debounceResizeHandlerRef.cancel();
    this.throttleScrollHandlerRef.cancel();
  }

  public focusOnHandler = (focusIndex: string): void => {
    const focusElement = document.getElementById(focusIndex);
    if (!focusElement) {
      return;
    }
    const { height } = focusElement.getBoundingClientRect();
    const scrollPosition = focusElement.offsetTop + height / 2 - window.innerHeight / 2;
    window.scrollTo(0, scrollPosition - 1);
    this.setFocusIndex(focusIndex);
  }

  /**
   * If user clicks on an input field of a blur section
   *  this handler will automatically focus that section
   */
  public inputClickHandler = (event: any): void => {
    const tagName = event.target && event.target.tagName;
    const unsuportedTag = (!tagName || !SUPPORTED_TAGS_FOR_FOCUS.includes(tagName.toLowerCase()));

    if (unsuportedTag) {
      return;
    }

    const { focusIndex } = this.state;
    const childElement = event.target;
    const selectedSection = childElement.closest('section');

    const alreadyInFocusArea = focusIndex === selectedSection.id;
    if (!alreadyInFocusArea) {
      this.focusOnHandler(selectedSection.id);
    }
  }

  public scrollHandler = (): void => {
    const focusIndex = findFocusElement();
    if (focusIndex) {
      this.setFocusIndex(focusIndex);
    }
  }

  public setFocusIndex = (focusIndex: string): void => {
    if (this.state.focusIndex !== focusIndex) {
      const { onFocus } = this.props;
      this.setState({ focusIndex });
      if (typeof onFocus === 'function') {
        onFocus();
      }
    }
  }

  public renderSections = (): React.ReactNode => {
    const { children } = this.props;

    return React.Children.map(children, (element, index) => {
      const id = getFocusIndex(index);
      const focused = this.state.focusIndex === id;
      const focusedClassName = focused ? 'focused' : '';

      return (
        <section
          id={id}
          key={id}
          style={this.getInlineStyles(focused)}
          className={`rfs-section ${focusedClassName}`}
        >
          {element}
        </section>
      );
    });
  }

  public render(): React.ReactNode {
    return (
      <div
        className={this.props.className || ''}
        onClick={this.inputClickHandler}
      >
        {this.renderSections()}
      </div>
    );
  }
}

export default FocusOnScroll;
