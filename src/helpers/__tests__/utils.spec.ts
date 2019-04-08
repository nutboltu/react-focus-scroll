import {
  // findFocusElement,
  getFocusIndex,
} from '../utils';

describe('Utils suite', () => {
  // describe.skip('findFocusElement', () => {
  //   beforeEach(() => {
  //     const element 
  //     const fragment = 
  //   });
  //   afterEach(() => {

  //   });

  //   it('empty children array should return -1', () => {
  //       const result = findFocusElement();
  //       expect(result).toEqual(-1);
  //   });
    // it('if window.scrollY is zero should return 0', () => {
    //   const result = findFocusElement();
    //   expect(result).toEqual(0);
    // });
    // it('if window.scrollY is greater than equal windowHeight should return last element index', () => {
    //   Object.defineProperty(window, 'scrollY', { value: 1 });
    //   const result = findFocusElement();
    //   expect(result).toEqual(mockChildrenArray.length - 1);
    // });

    // it('should return proper focused index', () => {
    //   Object.defineProperty(window, 'scrollY', { value: 100 });
    //   const result = findFocusElement();
    //   expect(result).toEqual(mockChildrenArray.length - 1);
    // });
  // });

  describe('getFocusIndex', () => {
    it('should return rfs-section-0 if no id provides', () => {
        const result = getFocusIndex(undefined);
        expect(result).toEqual('rfs-section-0');
    });
    it('should return rfs-section-0 if id is not a number', () => {
      const result = getFocusIndex('test');
      expect(result).toEqual('rfs-section-0');
    });
    it('should return rfs-section-1 if id equals 1', () => {
      const result = getFocusIndex(1);
      expect(result).toEqual('rfs-section-1');
    });
  });
});
