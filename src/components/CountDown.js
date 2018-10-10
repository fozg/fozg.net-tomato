import React from 'react';

export default ({seconds}) => (
  <div
    style={{margin: 'auto', textAlign: 'center'}}
  >
    <h3 style={{margin: 0, padding: 0, color: '#fff'}}>
      {`0${Math.floor(seconds/60)}`.slice(-2)}:{`0${seconds%60}`.slice(-2)}
    </h3>
  </div>
)