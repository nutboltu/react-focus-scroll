import * as React from 'react';
import { throttle, debounce } from 'lodash';

import {
  DELAY_TIME_IN_MS,
  SUPPORTED_TAGS_FOR_FOCUS,
} from '../helpers/config';
import {
  findFocusArea,
  findFocusElement,
} from '../helpers/utils';

import {
  IFocusOnScrollProps,
  IFocusOnScrollState,
  ChildrenArray,
} from '../@types';

class FocusOnScroll extends React.Component<IFocusOnScrollProps, IFocusOnScrollState> {
  private scrollElement: HTMLElement;

  constructor(props: IFocusOnScrollProps) {
    super(props);
    this.state = {
      focusIndex: Number(this.props.focusOn) || 0,
      focusArea: {
        top: 0,
        bottom: 0,
      },
      focusOnTriggered: false,
      childrenArray: [],
    };
  }
  private setScrollElement = (element: HTMLDivElement): void => {
    this.scrollElement = element;
  }
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

  private getInlineStyles = (focused: boolean) => {
    return {
      opacity: focused ? 1 : 0.5,
      transition: 'opacity 0.1s ease-in-out',
    };
  }

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

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScrollHandler);
    window.removeEventListener('resize', this.debounceResizeHandler);
  }

  public focusOnHandler = (index: string): void => {
    const { focusArea, childrenArray } = this.state;
    const focusIndex = Number(index);
    if (isNaN(focusIndex) || focusIndex > childrenArray.length) {
      return ;
    }

    const element = childrenArray[focusIndex] as HTMLElement;
    const scrollPosition = (element.getBoundingClientRect().top + window.pageYOffset) - focusArea.top;
    this.setState({
      focusOnTriggered: true,
    }, () => {
      window.scrollTo(0, scrollPosition + 1);
      setTimeout(() => {
        this.setState({ focusOnTriggered: false });
      }, DELAY_TIME_IN_MS);
      this.setFocusIndex(focusIndex);
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
    const childElement = event.target;
    const targetIndex = childrenArray.findIndex((parentElement: HTMLElement) => parentElement.contains(childElement));
    const alreadyInFocusArea = focusIndex === targetIndex;
    if (!alreadyInFocusArea) {
      childElement.scrollIntoView({ behavior: 'smooth' });
      this.setFocusIndex(targetIndex || focusIndex);
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
    if (focusOnTriggered) {
      return;
    }
    const focusIndex = findFocusElement(focusArea, childrenArray);
    if (focusIndex >= 0) {
      this.setFocusIndex(focusIndex);
    }
  }

  public setFocusIndex = (focusIndex: number): void => {
    if (this.state.focusIndex !== focusIndex) {
      const { onFocus } = this.props;
      this.setState({
        focusIndex,
      });
      if (typeof onFocus === 'function') {
        onFocus(focusIndex);
      }
    }
  }

  public renderSections = (): React.ReactNode => {
    const {
      children,
    } = this.props;

    return React.Children.map(children, (element, index) => {
      const focused = this.state.focusIndex === index;
      const focusedClassName = focused ? 'focused' : '';
      const id = `rfs-section-${index}`;

      return (
        <section
          key={id}
          style={this.getInlineStyles(focused)}
          className={focusedClassName}
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
        role='button'
        ref={this.setScrollElement}
        onClick={this.inputClickHandler}
      >
        {this.renderSections()}
      </div>
    );
  }
}

export default FocusOnScroll;
