import { configure } from '@storybook/react';
// import '../.storybook/styles/base.scss';

const req = require.context('../src/stories', true, /.stories.ts*/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
