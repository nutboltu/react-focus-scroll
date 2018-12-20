import * as React from 'react';
import * as classnames from 'classnames';
import { throttle, debounce } from 'lodash';
// import debounce from 'lodash.debounce';

import {
  DELAY_TIME_IN_MS,
  SUPPORTED_TAGS_FOR_FOCUS,
} from './config';
import {
  findFocusArea,
  findFocusElement
} from './utils';
// import * as styles from './FocusOnScroll.scss';

import {
  IFocusOnScrollProps,
  IFocusOnScrollState
} from './FocusOnScroll.d';

// const section = styled`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;
const styles = {
  section: {
    opacity: 0.5,
    transition: 'opacity 0.1s ease-in-out',
  },
  isFocused: {
    opacity: 1,
  },
  focusOnScroll: {
    display: 'block'
  },
};
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

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScrollHandler);
    window.removeEventListener('resize', this.debounceResizeHandler);
  }

  private setScrollElement = (element: HTMLDivElement) => (this.scrollElement = element);
  private debounceResizeHandler = () => debounce(this.resizeHandler, DELAY_TIME_IN_MS);
  private throttleScrollHandler = () => throttle(this.scrollHandler, DELAY_TIME_IN_MS);

  private findAndSetChildren = (callback: unknown) => {
    if (this.scrollElement && this.scrollElement.children) {
      const childrenArray = Array.from(this.scrollElement.children);
      this.setState({ childrenArray }, () => {
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  }

  public focusOnHandler = (index: string) => {
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
  public inputClickHandler = (event: any) => {
    const tagName = event.target && event.target.tagName;
    const unsuportedTag = (!tagName || !SUPPORTED_TAGS_FOR_FOCUS.includes(tagName.toLowerCase()));

    if (unsuportedTag) {
      return;
    }

    const { childrenArray, focusIndex } = this.state;
    const parentElement = childrenArray[focusIndex] as HTMLElement;
    const childElement = event.target;
    const alreadyInFocusArea = parentElement.contains(childElement);

    if (!alreadyInFocusArea) {
      childElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public resizeHandler = () => {
    const { childrenArray } = this.state;
    const focusArea = findFocusArea(childrenArray);
    this.setState({
      focusArea,
    }, this.scrollHandler);
  }

  public scrollHandler = () => {
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
    const { sectionClassName, children } = this.props;

    return React.Children.map(children, (element, index) => {
      const isFocused = this.state.focusIndex === index;
      const id = `s_${index}`;

      return (
        <section
          key={id}
          className={classnames(styles.section, sectionClassName, {
            // [styles.isFocused]: isFocused,
            [focusedClassName]: isFocused,
          })}
        >
          {element}
        </section>
      );
    });
  }

  public render(): React.ReactNode {
    const {
      focusedClassName,
      className,
    } = this.props;
    
    return (
      <div
        role="button"
        ref={this.setScrollElement}
        onClick={this.inputClickHandler}
        className={classnames(styles.focusOnScroll, className)}
      >
        {this.renderSections(focusedClassName!)}
      </div>
    );
  }
}

export default FocusOnScroll;
