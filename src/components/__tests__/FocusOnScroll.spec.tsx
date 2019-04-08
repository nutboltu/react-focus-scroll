import * as React from 'react';

import { shallow } from 'enzyme';
import { stub, SinonStub } from 'sinon';
import FocusOnScroll from '../FocusOnScroll';
import * as utils from '../../helpers/utils';

describe.only('FocusOnScroll Component Suite', () => {
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
    let getClosestStub: SinonStub;
    beforeEach(() => {
      getClosestStub = stub(utils, 'getClosest');
    });
    afterEach(() => {
      getClosestStub.restore();
    });

    it('should call focusOnHandler for clicked element', () => {
      const component = getComponent();
      component.setState({
        focusIndex: 'rfs-scetion-0',
      });
      const instance = component.instance() as any;
      getClosestStub.returns({
        id: 'rfs-scetion-1',
      });
      const event = {
        target: {
          getBoundingClientRect: () => ({ top: 102 }),
          tagName: 'INPUT',
        },
      };

      instance.inputClickHandler(event);
      expect(instance.focusOnHandler.calledOnce).toBeTruthy;
    });
    it('shouldn\'t call focusOnHandler if clicks on DIV element', () => {
      const component = getComponent();
      component.setState({
        focusIndex: 'rfs-section-0',
      });
      const instance = component.instance() as any;
      const event = {
        target: {
          getBoundingClientRect: () => ({ top: 102 }),
          tagName: 'DIV',
        },
      };

      instance.inputClickHandler(event);
      expect(instance.focusOnHandler.calledOnce).toBeFalsy;
    });
    it('shouldn\'t call focusOnHandler if child is already in focused area', () => {
      const component = getComponent();
      component.setState({
        focusIndex: 'rfs-section-1',
      });
      const instance = component.instance() as any;
      const event = {
        target: {
          getBoundingClientRect: () => ({ top: 10 }),
          tagName: 'DIV',
        },
      };

      instance.inputClickHandler(event);
      expect(instance.focusOnHandler.calledOnce).toBeFalsy;
    });
  });
});
