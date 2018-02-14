import React from 'react';

import './index.css';

import {
  createColorString
} from '../../utils/color';

export const createRandomColor = () => ({
  r: Math.floor(Math.random() * 255),
  g: Math.floor(Math.random() * 255),
  b: Math.floor(Math.random() * 255)
});

export default () => {
  return (
    <div className="convergent-loader">
      <div
        className="convergent-loader-outer-box"
        style={{
          backgroundColor: createColorString(createRandomColor())
        }}
      />
      <div
        className="convergent-loader-inner-box"
        style={{
          backgroundColor: createColorString(createRandomColor())
        }}
      />
    </div>
  );
}