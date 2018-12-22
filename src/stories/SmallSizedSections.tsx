import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import FocusOnScroll from '../components/FocusOnScroll';

const stories = storiesOf('FocusOnScroll', module);

stories.addDecorator(withKnobs);

stories.add('Small sized sections (with options)', () => {
  return (
    <FocusOnScroll>
      <div  style={{ height: 30, background: '#00E4E4' }}>
        <div  color="white">0</div>
      </div>
      <div  style={{ height: 50, background: '#8DE2E0' }}>
        <div >1</div>
        <input
          name={text('name: ', 'testField')}
          id={text('id: ', '')}
          placeholder={text('placeholder: ', 'Enter your test field')}
        />
      </div>
      <div  style={{ height: 600, background: '#E40000' }}>
        <div  color="white">2</div>
      </div>
      <div  style={{ height: 200, background: '#009100' }}>
        <div  color="white">3</div>
      </div>
      <div  style={{ height: 200, background: '#ED710B' }}>
        <div  color="white">4</div>
      </div>
      <div  style={{ height: 30, background: '#F9F3E9' }}>
        <div >5</div>
      </div>
      <div  style={{ height: 30, background: '#A9A379' }}>
        <div >6</div>
      </div>
    </FocusOnScroll>
  );
});