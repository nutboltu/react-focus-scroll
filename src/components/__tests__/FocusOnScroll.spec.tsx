import React from 'react';

import { shallow } from 'enzyme';
import FocusOnScroll from '../FocusOnScroll';

describe('<FocusOnScroll />', () => {
  const getComponent = () => shallow(<FocusOnScroll >
    <div> This is a test</div>
    <div> This is a test</div>
  </FocusOnScroll>); // eslint-disable-line

  describe('FocusOnScroll Component', () => {
    test('should render with defaults', () => {
      expect(getComponent()).toMatchSnapshot();
    });

    // it('should render 2 sections', () => {
    //   const sections = getComponent().find('section');
    //   expect(sections).to.have.length(2);
    // });

    // it('should render a custom HTML tag', () => {
    //   const scrollComponent = getComponent({ tag: 'span' });
    //   expect(scrollComponent.type()).to.equal('span');
    // });
  });

  // describe('findFocusElement', () => {
  //   let state = {};
  //   let scrollElm = {};

  //   beforeEach(() => {
  //     state = {
  //       focusArea: {
  //         top: 100,
  //         bottom: 200,
  //       },
  //       childrenArray: [{
  //         offsetTop: 0,
  //         clientHeight: 100,
  //       }, {
  //         offsetTop: 101,
  //         clientHeight: 100,
  //       }],
  //     };
  //   });

  //   afterEach(() => {
  //     state = {};
  //     scrollElm = {};
  //   });

  //   it('should return index 1 if scroll position is 101', () => {
  //     global.window.scrollY = 101;
  //     const component = getComponent();
  //     component.setState(state);
  //     const instance = component.instance();
  //     const focusIndex = instance.findFocusElement();
  //     expect(focusIndex).to.eql(1);
  //   });

  //   it('should return first index as scroll position is 0', () => {
  //     global.window.scrollY = 0;
  //     const component = getComponent();
  //     component.setState(state);
  //     const instance = component.instance();
  //     const focusIndex = instance.findFocusElement();
  //     expect(focusIndex).to.eql(0);
  //   });

  //   it('should return first index as scroll position > windowHeight', () => {
  //     global.window.scrollY = 800;
  //     const component = getComponent();
  //     component.setState(state);
  //     const instance = component.instance();
  //     instance.scrollElement = scrollElm;
  //     const focusIndex = instance.findFocusElement();
  //     expect(focusIndex).to.eql(1);
  //     global.window.scrollY = 0;
  //   });
  // });

  // describe('findArea', () => {
  //   it('should return top 0 and bottom 0 if no child exists', () => {
  //     const component = getComponent();
  //     component.setState({
  //       childrenArray: [],
  //     });
  //     const instance = component.instance();
  //     const focusArea = instance.findFocusArea();
  //     const expected = { top: 0, bottom: 0 };
  //     expect(focusArea).to.eql(expected);
  //   });

  //   it('should return  minheight', () => {
  //     const component = getComponent();
  //     component.setState({
  //       childrenArray: [{
  //         offsetTop: 0,
  //         clientHeight: 100,
  //       }, {
  //         offsetTop: 101,
  //         clientHeight: 100,
  //       }],
  //     });
  //     const instance = component.instance();
  //     const focusArea = instance.findFocusArea();
  //     const expected = { top: 334, bottom: 384 };
  //     expect(focusArea).to.eql(expected);
  //   });
  // });

  // describe('inputClickHandler', () => {
  //   it('should call scrollIntoView for clicked element', () => {
  //     const component = getComponent();
  //     component.setState({
  //       focusIndex: 0,
  //       childrenArray: [{
  //         offsetTop: 0,
  //         clientHeight: 100,
  //         contains: () => false,
  //       }, {
  //         offsetTop: 101,
  //         clientHeight: 100,
  //         contains: () => true,
  //       }],
  //     });
  //     const instance = component.instance();
  //     const mockScrollIntoView = spy();
  //     const event = {
  //       target: {
  //         getBoundingClientRect: () => ({ top: 102 }),
  //         tagName: 'INPUT',
  //         scrollIntoView: mockScrollIntoView,
  //       },
  //     };

  //     instance.inputClickHandler(event);
  //     expect(mockScrollIntoView.calledOnce).to.equal(true);
  //   });
  //   it('shouldn\'t call scrollIntoView if clicks on DIV element', () => {
  //     const component = getComponent();
  //     const mockScrollIntoView = spy();
  //     component.setState({
  //       focusIndex: 0,
  //       childrenArray: [{
  //         offsetTop: 0,
  //         clientHeight: 100,
  //       }, {
  //         offsetTop: 101,
  //         clientHeight: 100,
  //       }],
  //     });
  //     const instance = component.instance();
  //     const event = {
  //       target: {
  //         getBoundingClientRect: () => ({ top: 102 }),
  //         tagName: 'DIV',
  //         scrollIntoView: mockScrollIntoView,
  //       },
  //     };

  //     instance.inputClickHandler(event);
  //     expect(mockScrollIntoView.calledOnce).to.equal(false);
  //   });
  //   it('shouldn\'t call scrollIntoView if child is already in focused area', () => {
  //     const component = getComponent();
  //     component.setState({
  //       focusIndex: 1,
  //       childrenArray: [{
  //         offsetTop: 0,
  //         clientHeight: 100,
  //         contains: () => false,
  //       }, {
  //         offsetTop: 101,
  //         clientHeight: 100,
  //         contains: () => true,
  //       }],
  //     });
  //     const instance = component.instance();
  //     const mockScrollIntoView = spy();
  //     const event = {
  //       target: {
  //         getBoundingClientRect: () => ({ top: 10 }),
  //         tagName: 'DIV',
  //         scrollIntoView: mockScrollIntoView,
  //       },
  //     };

  //     instance.inputClickHandler(event);
  //     expect(mockScrollIntoView.calledOnce).to.equal(false);
  //   });
  // });

  // describe('disableScroll', () => {
  //   it('should not have attached resize and scroll handlers', () => {
  //     const component = shallow(<FocusOnScroll disableScroll><div /><div /></FocusOnScroll>);
  //     const instance = component.instance();
  //     instance.throttleScrollHandler = spy();
  //     instance.debounceResizeHandler = spy();
  //     instance.componentDidMount();
  //     expect(instance.throttleScrollHandler.calledOnce).to.equal(false);
  //     expect(instance.debounceResizeHandler.calledOnce).to.equal(false);
  //   });
  // });
});
