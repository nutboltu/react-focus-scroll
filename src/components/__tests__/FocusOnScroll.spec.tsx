import * as React from 'react';

import { shallow } from 'enzyme';
import { spy } from 'sinon';
import FocusOnScroll from '../FocusOnScroll';

describe('FocusOnScroll Component Suite', () => {
  const getComponent = () => shallow(<FocusOnScroll >
    <div> This is a test</div>
    <div> This is a test</div>
  </FocusOnScroll>);

  describe('FocusOnScroll Component', () => {
    test('should render with defaults', () => {
      expect(getComponent()).toMatchSnapshot();
    });

    it('should render 2 sections', () => {
      const sections = getComponent().find('section');
      expect(sections).toHaveLength(2);
    });
  });

  describe('inputClickHandler', () => {
    it('should call scrollIntoView for clicked element', () => {
      const component = getComponent();
      component.setState({
        focusIndex: 0,
        childrenArray: [{
          offsetTop: 0,
          clientHeight: 100,
          contains: () => false,
        }, {
          offsetTop: 101,
          clientHeight: 100,
          contains: () => true,
        }],
      });
      const instance = component.instance() as any;
      const mockScrollIntoView = spy();
      const event = {
        target: {
          getBoundingClientRect: () => ({ top: 102 }),
          tagName: 'INPUT',
          scrollIntoView: mockScrollIntoView,
        },
      };

      instance.inputClickHandler(event);
      expect(mockScrollIntoView.calledOnce).toBeTruthy;
    });
    it('shouldn\'t call scrollIntoView if clicks on DIV element', () => {
      const component = getComponent();
      const mockScrollIntoView = spy();
      component.setState({
        focusIndex: 0,
        childrenArray: [{
          offsetTop: 0,
          clientHeight: 100,
        }, {
          offsetTop: 101,
          clientHeight: 100,
        }],
      });
      const instance = component.instance() as any;
      const event = {
        target: {
          getBoundingClientRect: () => ({ top: 102 }),
          tagName: 'DIV',
          scrollIntoView: mockScrollIntoView,
        },
      };

      instance.inputClickHandler(event);
      expect(mockScrollIntoView.calledOnce).toBeFalsy;
    });
    it('shouldn\'t call scrollIntoView if child is already in focused area', () => {
      const component = getComponent();
      component.setState({
        focusIndex: 1,
        childrenArray: [{
          offsetTop: 0,
          clientHeight: 100,
          contains: () => false,
        }, {
          offsetTop: 101,
          clientHeight: 100,
          contains: () => true,
        }],
      });
      const instance = component.instance() as any;
      const mockScrollIntoView = spy();
      const event = {
        target: {
          getBoundingClientRect: () => ({ top: 10 }),
          tagName: 'DIV',
          scrollIntoView: mockScrollIntoView,
        },
      };

      instance.inputClickHandler(event);
      expect(mockScrollIntoView.calledOnce).toBeFalsy;
    });
  });
});
