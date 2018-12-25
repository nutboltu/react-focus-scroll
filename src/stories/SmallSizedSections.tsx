import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import FocusOnScroll from '../components/FocusOnScroll';
import { centeredStyles, inputStyles } from './styles';

const stories = storiesOf('ReactFocusOnscroll', module);

stories.addDecorator(withKnobs);

stories.add('Small Sized Sections', withInfo({
  source: false,
  inline: true,
})(() => {
  return (
    <FocusOnScroll>
      <div  style={{ height: 70, background: '#00E4E4' }}>
        <div style={centeredStyles}>0</div>
      </div>
      <div  style={{ height: 100, background: '#8DE2E0' }}>
        <div style={centeredStyles}>1</div>
        <input
          style={inputStyles}
          name='input1'
          placeholder='Enter your input'
        />
      </div>
      <div  style={{ height: 600, background: '#E40000' }}>
        <div  style={centeredStyles}>2</div>
      </div>
      <div  style={{ height: 200, background: '#009100' }}>
        <div  style={centeredStyles}>3</div>
      </div>
      <div  style={{ height: 200, background: '#ED710B' }}>
        <div style={centeredStyles}>4</div>
      </div>
      <div  style={{ height: 70, background: '#F9F3E9' }}>
        <div style={centeredStyles}>5</div>
      </div>
      <div style={{ height: 80, background: '#A9A379' }}>
        <div style={centeredStyles}>6</div>
      </div>
    </FocusOnScroll>
  );
}));
