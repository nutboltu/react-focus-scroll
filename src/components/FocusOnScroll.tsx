import * as React from 'react';
import { throttle, debounce } from 'lodash';

import {
  DELAY_TIME_IN_MS,
  SUPPORTED_TAGS_FOR_FOCUS,
} from '../helpers/config';
import {
  findFocusArea,
  findFocusElement
} from '../helpers/utils';

import {
  IFocusOnScrollProps,
  IFocusOnScrollState,
  ChildrenArray,
} from '../@types';

class FocusOnScroll extends React.Component<IFocusOnScrollProps, IFocusOnScrollState> {
  private scrollElement: HTMLElement;
  public state = {
    focusIndex: 0,
    focusArea: {
      top: 0,
      bottom: 0,
    },
    focusOnTriggered: false,
    childrenArray: [],
  };

  public componentDidMount() {
    this.findAndSetChildren(this.resizeHandler);
    window.addEventListener('scroll', this.throttleScrollHandler());
    window.addEventListener('resize', this.debounceResizeHandler());
  }

  public componentWillReceiveProps(nextProps: IFocusOnScrollProps) {
    if (this.props.focusOn !== nextProps.focusOn) {
      this.focusOnHandler(nextProps.focusOn!);
    }
  }

  public getInlineStyles = (focused: boolean) => {
    return {
      opacity: focused ? 1: 0.5,
      transition: 'opacity 0.1s ease-in-out',
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScrollHandler);
    window.removeEventListener('resize', this.debounceResizeHandler);
  }

  private setScrollElement = (element: HTMLDivElement) => (this.scrollElement = element);
  private debounceResizeHandler = () => debounce(this.resizeHandler, DELAY_TIME_IN_MS);
  private throttleScrollHandler = () => throttle(this.scrollHandler, DELAY_TIME_IN_MS);

  private findAndSetChildren = (callback: unknown): void => {
    if (this.scrollElement && this.scrollElement.children) {
      const childrenArray = Array.from(this.scrollElement.children) as ChildrenArray;
      this.setState({ childrenArray }, () => {
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  }

  public focusOnHandler = (index: string): void => {
    const { focusArea, childrenArray } = this.state;
    const focusIndex = Number(index);
    if (isNaN(Number(index)) || focusIndex > childrenArray.length) return;

    const element = childrenArray[focusIndex] as HTMLElement;
    const scrollPosition = (element.getBoundingClientRect().top + window.pageYOffset) - focusArea.top;
    this.setState({
      focusIndex,
      focusOnTriggered: true,
    }, () => {
      window.scrollTo(0, scrollPosition + 1);
      setTimeout(() => {
        this.setState({ focusOnTriggered: false });
      }, DELAY_TIME_IN_MS);
    });
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

    const { childrenArray, focusIndex } = this.state;
    const parentElement = childrenArray[focusIndex] as HTMLElement;
    const childElement = event.target;
    const alreadyInFocusArea = parentElement.contains(childElement);
    console.log(alreadyInFocusArea);
    if (!alreadyInFocusArea) {
      childElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public resizeHandler = (): void => {
    const { childrenArray } = this.state;
    const focusArea = findFocusArea(childrenArray);
    this.setState({
      focusArea,
    }, this.scrollHandler);
  }

  public scrollHandler = (): void => {
    const { focusArea, childrenArray, focusOnTriggered } = this.state;
    if (focusOnTriggered) return;
    const focusIndex = findFocusElement(focusArea, childrenArray);
    if (focusIndex >= 0) {
      this.setState({
        focusIndex,
      });
    }
  }

  public renderSections = (focusedClassName: string): React.ReactNode => {
    const {
      children,
    } = this.props;

    return React.Children.map(children, (element, index) => {
      const focused = this.state.focusIndex === index;
      const id = `focus-on-scroll-section-${index}`;

      return (
        <section
          key={id}
          style={this.getInlineStyles(focused)}
        >
          {element}
        </section>
      );
    });
  }

  public render(): React.ReactNode {
    const {
      focusedClassName,
    } = this.props;
    
    return (
      <div
        role="button"
        ref={this.setScrollElement}
        onClick={this.inputClickHandler}
      >
        {this.renderSections(focusedClassName!)}
      </div>
    );
  }
}

export default FocusOnScroll;
