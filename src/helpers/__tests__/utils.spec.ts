// import {
//   // findFocusArea,
//   findFocusElement,
// } from '../utils';

// describe('Utils suite', () => {
//   const mockChildrenArray = [{
//     clientHeight: 400,
//   }, {
//     clientHeight: 450,
//   }, {
//     clientHeight: 500,
//   }, {
//     clientHeight: 550,
//   }];
//   // describe('findFocusArea', () => {
//   //   it('empty children array should return an area with top 0 and bottom 0', () => {
//   //       const result = findFocusArea([]);
//   //       const expected = {
//   //         top: 0,
//   //         bottom: 0,
//   //       };
//   //       expect(result).toEqual(expected);
//   //   });
//   //   it('mock children array should return a minimum area measuring each children height', () => {
//   //     const result = findFocusArea(mockChildrenArray);
//   //     const expected = {
//   //       top: 192,
//   //       bottom: 384,
//   //     };
//   //     expect(result).toEqual(expected);
//   // });
//   // });
//   // describe('findFocusElement', () => {
//   //   const mockFocusArea = {
//   //     top: 400,
//   //     bottom: 500,
//   //   };
//   //   it('empty children array should return -1', () => {
//   //       const result = findFocusElement(mockFocusArea, []);
//   //       expect(result).toEqual(-1);
//   //   });
//   //   it('if window.scrollY is zero should return 0', () => {
//   //     const result = findFocusElement(mockFocusArea, mockChildrenArray);
//   //     expect(result).toEqual(0);
//   //   });
//   //   it('if window.scrollY is greater than equal windowHeight should return last element index', () => {
//   //     Object.defineProperty(window, 'scrollY', { value: 1 });
//   //     const result = findFocusElement(mockFocusArea, mockChildrenArray);
//   //     expect(result).toEqual(mockChildrenArray.length - 1);
//   //   });

//   //   it('should return proper focused index', () => {
//   //     Object.defineProperty(window, 'scrollY', { value: 100 });
//   //     const result = findFocusElement(mockFocusArea, mockChildrenArray);
//   //     expect(result).toEqual(mockChildrenArray.length - 1);
//   //   });
//   // });
// });
