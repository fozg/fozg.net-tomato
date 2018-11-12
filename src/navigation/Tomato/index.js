import React from 'react';

import TomatoRunning from './TomatoRunning';
import TomatoTaskList from './TomatoTaskList';

export default () => (
  <div className="row" style={{height: '100%', margin: 0}}>
    <div 
      className="col-sm"
      style={{height: '100%', display: 'flex', flexDirection: 'column', padding: 0, }}
    >
      <div>
        <TomatoRunning />
      </div>
      <div style={{height: '100%'}}>
        <TomatoTaskList />
      </div>
    </div>
    <div style={{backgroundColor: '#fafafa', height: '100%', borderLeft: '1px solid #e6e6e6', padding: 0, width: 400}}>
      {/* tomato right panel */}
    </div>
  </div>
)