import * as React from 'react';

import {
  DELAY_TIME_IN_MS,
  SUPPORTED_TAGS_FOR_FOCUS,
} from '../helpers/config';
import {
  findFocusElement,
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
      focusIndex: Number(this.props.focusOn) || 0,
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
      this.focusOnHandler(prevProps.focusOn!);
    }
  }

  public componentWillUnmount() {
    console.log('will unmout');
    window.removeEventListener('scroll', this.throttleScrollHandler);
    window.removeEventListener('resize', this.debounceResizeHandler);
    this.debounceResizeHandlerRef.cancel();
    this.throttleScrollHandlerRef.cancel();
  }

  public focusOnHandler = (index: string): void => {
    const sections = Array.prototype.slice.call(document.getElementsByClassName('rfs-section'));
    const focusIndex = Number(index);
    if (isNaN(focusIndex) || focusIndex >= sections.length) {
      return ;
    }
    const { height } = sections[focusIndex].getBoundingClientRect();
    const scrollPosition = (sections[focusIndex] as any).offsetTop + height / 2 - window.innerHeight / 2;
    window.scrollTo(0, scrollPosition + 1);
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
    const str = selectedSection.id.split('-');
    const id = str[str.length - 1];
    const alreadyInFocusArea = focusIndex === id;
    if (!alreadyInFocusArea) {
      this.focusOnHandler(id);
    }
  }

  public scrollHandler = (): void => {
    const focusIndex = findFocusElement();
    if (focusIndex >= 0) {
      this.setFocusIndex(focusIndex);
    }
  }

  public setFocusIndex = (focusIndex: number): void => {
    if (this.state.focusIndex !== focusIndex) {
      const { onFocus } = this.props;
      this.setState({ focusIndex });
      if (typeof onFocus === 'function') {
        onFocus(focusIndex);
      }
    }
  }

  public renderSections = (): React.ReactNode => {
    const { children } = this.props;

    return React.Children.map(children, (element, index) => {
      const focused = this.state.focusIndex === index;
      const focusedClassName = focused ? 'focused' : '';
      const id = `rfs-section-${index}`;

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
