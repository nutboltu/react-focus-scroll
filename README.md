# React Focus on Scroll

[![dependencies Status](https://david-dm.org/nutboltu/react-focus-scroll/status.svg)](https://david-dm.org/nutboltu/react-focus-scroll)  [![Build Status](https://travis-ci.org/nutboltu/react-focus-scroll.svg?branch=master)](https://travis-ci.org/nutboltu/react-focus-scroll) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A react component which focuses sections while scrolling

See [Demo and Documentation](https://nutboltu.github.io/react-focus-scroll).

## Props

The component takes the followin props.

| Prop              | Type       | Description |
|-------------------|------------|-------------|
| `className`         | string  | Additional classnames for the component |
| `focusOn`  | string  | Initial focused section|
| `onFocus`        | _function_ | Callback function to invoke when a section is focues The function should contain one parameter(focusIndex). |

## Installation

```bash
npm install react-focus-scroll --save
```

## Usage

```javascript
import FocusOnScroll from "react-focus-scroll";

<FocusOnScroll
  focusOn="1"
  onFocus={onFocus}
  classNames="custom-class"
>
  <div>This is first section</div>
  <div>This is second section</div>
</FocusOnScroll>
```

## License

MIT Licensed. Copyright (c) Farhad Yasir 2019.
