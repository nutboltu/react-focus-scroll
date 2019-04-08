import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

function testConfig() {
  const jsdom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
  const { window } = jsdom;
  (global as any).window = window;
  (global as any).document = window.document;
  configure({ adapter: new EnzymeAdapter() });
}

module.exports = testConfig();
