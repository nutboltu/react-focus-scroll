# React Focus on Scroll

[![dependencies Status](https://david-dm.org/nutboltu/react-focus-scroll/status.svg)](https://david-dm.org/nutboltu/react-focus-scroll)  [![Build Status](https://travis-ci.org/nutboltu/react-focus-scroll.svg?branch=master)](https://travis-ci.org/nutboltu/react-focus-scroll)

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
/>

## License

MIT Licensed. Copyright (c) Farhad Yasir 2019.
