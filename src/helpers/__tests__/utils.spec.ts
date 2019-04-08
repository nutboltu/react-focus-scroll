import {
  findFocusElement,
  getFocusIndex,
} from '../utils';

describe('Utils suite', () => {
  describe('findFocusElement', () => {
    it('should return empty string if no section presents', () => {
      const result = findFocusElement();
      expect(result).toEqual('');
    });
    describe('With Dom Element', () => {
      let element: any;
      beforeEach(() => {
        element = document.createElement('div');
        element.innerHTML = `
          <section class="rfs-section" id="rfs-section=0"> This is first section </section>
          <section class="rfs-section" id="rfs-section=1"> This is second section </section>
        `;
        document.body.appendChild(element);
      });
      afterEach(() => {
        document.body.removeChild(element);
      });
      it('if window.scrollY is zero should return rfs-section-0', () => {
        const result = findFocusElement();
        expect(result).toEqual('rfs-section-0');
      });
      it('if window.scrollY > totalHeight should return rfs-section-1', () => {
        Object.defineProperty(window, 'scrollY', { value: 1 });
        const result = findFocusElement();
        expect(result).toEqual('rfs-section-1');
      });
    });
  });

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
