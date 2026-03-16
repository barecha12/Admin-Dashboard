import React from 'react';

const Skeleton = ({ height = 16, width = '100%', radius = 8, style = {} }) => (
  <div
    className="skeleton"
    style={{
      height,
      width,
      borderRadius: radius,
      ...style
    }}
  />
);

export default Skeleton;
