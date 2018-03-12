import _ from 'lodash';
import React from 'react';

import './index.css';

const Path = props => {
  const {
    id,
    pathPoints
  } = props;

  let pathDString = '';

  _.each(pathPoints, point => {
    pathDString += `${point.type} `;
    if (point.type === 'C') {
      const cp = point.cp;
      pathDString += `${cp[0].x} ${cp[0].y} ${cp[1].x} ${cp[1].y} `;
    } else if (point.type === 'S') {
      const cp = point.cp;
      pathDString += `${cp[1].x} ${cp[1].y} `;
    }
    pathDString += `${point.x} ${point.y} `;
  });

  return (
    <g id={id}>
      <path
        className={`step-path path-${id}`}
        d={pathDString}
        // style={style}
      />
    </g>
  );
};

export default Path;
