import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import FocusOnScroll from '../components/FocusOnScroll';

const stories = storiesOf('FocusOnScroll', module);

stories.addDecorator(withKnobs);

stories.add('Default (with options)', withInfo()(() => {
  return (
    <FocusOnScroll
    >
      <div  style={{ height: 500, background: '#00E4E4' }}>
        <div  color="white">0</div>
      </div>
      <div  style={{ height: 500, background: '#8DE2E0' }}>
        <div >1</div>
        <input
          name="testField1"
          placeholder="Enter your test field for 1"
        />
      </div>
      <div  style={{ height: 600, background: '#E40000' }}>
        <div  color="white">2</div>
        <input
          name="testField2"
          placeholder="Enter your test field for 2"
        />
      </div>
      <div  style={{ height: 200, background: '#009100' }}>
        <div  color="white">3</div>
      </div>
      <div  style={{ height: 200, background: '#ED710B' }}>
        <div  color="white">4</div>
      </div>
      <div  style={{ height: 500, background: '#F9F3E9' }}>
        <div >5</div>
      </div>
      <div  style={{ height: 500, background: '#A9A379' }}>
        <div >6</div>
      </div>
    </FocusOnScroll>
  );
}));




