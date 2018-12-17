import * as React from 'react';
import * as classnames from 'classnames';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isNaN from 'lodash/isNaN';

import { config, defaults } from './FocusOnScroll.config';
import * as styles from './FocusOnScroll.scss';
import {
  IFocusOnScrollProps,
  IFocusOnScrollState
} from 'FocusOnScroll';

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
    if (this.props.disableScroll) return;
    this.findAndSetChildren(this.resizeHandler);
    window.addEventListener('scroll', this.throttleScrollHandler());
    window.addEventListener('resize', this.debounceResizeHandler());
  }

  public componentWillReceiveProps(nextProps) {
    if (this.props.disableScroll) return;
    if (this.props.focusOn !== nextProps.focusOn) {
      this.focusOnHandler(nextProps.focusOn);
    }
  }

  public componentWillUnmount() {
    if (this.props.disableScroll) return;
    window.removeEventListener('scroll', this.throttleScrollHandler);
    window.removeEventListener('resize', this.debounceResizeHandler);
  }

  private setScrollElement = element => (this.scrollElement = element);
  private debounceResizeHandler = () => debounce(this.resizeHandler, config.delayTimeInMS);
  private throttleScrollHandler = () => throttle(this.scrollHandler, config.delayTimeInMS);

  private findAndSetChildren = (cb) => {
    if (this.scrollElement && this.scrollElement.children) {
      const childrenArray = Array.from(this.scrollElement.children);
      this.setState({ childrenArray }, () => {
        if (isFunction(cb)) {
          cb();
        }
      });
    }
  }

  public findFocusArea = () => {
    const { childrenArray } = this.state;
    if (!childrenArray.length) {
      return { top: 0, bottom: 0 };
    }

    const bottom = window.innerHeight * config.halfSize;
    const minHeight = childrenArray.reduce((acc, cur) =>
      Math.min(cur.clientHeight, acc), bottom);

    return {
      top: bottom - (minHeight * config.halfSize),
      bottom,
    };
  }

  findFocusElement = () => {
    const { focusArea, childrenArray } = this.state;
    const windowHeight = document.body.offsetHeight - window.innerHeight;

    if (!childrenArray.length) return -1;

    if (window.scrollY === 0) return 0;

    if (window.scrollY >= windowHeight) {
      return childrenArray.length - 1;
    }

    const focusTop = focusArea.top + window.scrollY;
    const focusBottom = focusArea.bottom + window.scrollY;

    return childrenArray.reduce((acc, element, index) => {
      const top = element.getBoundingClientRect().top + window.pageYOffset;

      const bottom = top + element.clientHeight;
      const isInfocusArea = !(top > focusBottom || bottom < focusTop);
      return isInfocusArea ? index : acc;
    }, 0);
  }

  focusOnHandler = (index) => {
    const { focusArea, childrenArray } = this.state;
    const focusIndex = Number(index);
    if (isNaN(index) || focusIndex > childrenArray.length) return;

    const element = childrenArray[focusIndex];
    const scrollPosition = (element.getBoundingClientRect().top + window.pageYOffset) - focusArea.top;
    this.setState({
      focusIndex,
      focusOnTriggered: true,
    }, () => {
      window.scrollTo(0, scrollPosition + 1);
      setTimeout(() => {
        this.setState({ focusOnTriggered: false });
      }, config.delayTimeInMS);
    });
  }

  /**
   * If user clicks on an input field of a blur section
   *  this handler will automatically focus that section
   */
  inputClickHandler = (event) => {
    const tagName = get(event, 'target.tagName');
    const unsuportedTag = (!tagName || !config.supportedTagForFocus.includes(tagName.toLowerCase()));

    if (unsuportedTag) {
      return;
    }

    const { childrenArray, focusIndex } = this.state;
    const parentElement = childrenArray[focusIndex];
    const childElement = get(event, 'target');
    const alreadyInFocusArea = parentElement.contains(childElement);

    if (!alreadyInFocusArea) {
      childElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  resizeHandler = () => {
    const focusArea = this.findFocusArea();
    this.setState({
      focusArea,
    }, this.scrollHandler);
  }

  scrollHandler = () => {
    if (this.state.focusOnTriggered) return;
    const focusIndex = this.findFocusElement();
    if (focusIndex >= 0) {
      this.setState({
        focusIndex,
      });
    }
  }

  renderSections = (focusedClassName) => {
    const { sectionClassName, children } = this.props;

    return React.Children.map(children, (element, index) => {
      const isFocused = this.state.focusIndex === index;
      const id = `s_${index}`;

      return (
        <section
          key={id}
          className={classnames(styles.section, sectionClassName, {
            [styles.isFocused]: isFocused,
            [focusedClassName]: isFocused,
          })}
        >
          {element}
        </section>
      );
    });
  }

  render() {
    const {
      focusedClassName,
      tag: Tag,
      className,
      disableScroll,
    } = this.props;
    const props = disableScroll ? null : {
      ref: this.setScrollElement,
      onClick: this.inputClickHandler,
      className: classnames(styles.focusOnScroll, className),
    };
    return (
      <Tag {...props}>
        {this.renderSections(focusedClassName)}
      </Tag>
    );
  }
}

// FocusOnScroll.propTypes = {
//   children: PropTypes.arrayOf(PropTypes.element).isRequired,
//   focusedClassName: PropTypes.string,
//   focusOn: PropTypes.string,
//   tag: PropTypes.string,
//   className: PropTypes.string,
//   sectionClassName: PropTypes.string,
//   disableScroll: PropTypes.bool,
// };

// FocusOnScroll.defaultProps = {
//   ...defaults,
// };

export default FocusOnScroll;
