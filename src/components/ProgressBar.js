import React from 'react';

export default ({percent = 100, isRunning}) => (
  <div
    style={{
      width: '100%',
      height: 5,
      backgroundColor: '#fff',
      position: 'relative',

    }}
  >
    <div
      style={{
        width: `${percent}%`,
        height: 5,
        backgroundColor: isRunning ? '#009688' : 'rgb(233, 30, 99)',
        position: 'absolute',
        zIndex: 100,
        left: 0,
        top: 0,
        transition: 'width .1s'
      }}
    >

    </div>
  </div>
)