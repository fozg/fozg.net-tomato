import React, { Component } from 'react';

import RightPanel from './components/RightPanel';
import Navigation from './components/Navigation';

// navigation
import Tomato from './navigation/Tomato'

class App extends Component {
  state = {
    isRunning: false,
    percent: 0,
    tasks: [],
    subTasksRunning: []
  }

  componentDidMount () {
 
  }


  _continueThisTask = ({id, taskName}) => {
    // this.refs.taskRun.startRun(id);
    // this.setState({isRunning: true});
  }


  render() {

    return (
      <div className="container-fluid" style={{alignItems: 'stretch', overflow: 'hidden' }}>
        <div className="row" >
          <div className="col-lg-1" style={{backgroundColor: '#eee', height: '100vh', padding: 0}}>
            <Navigation />
          </div>
          <div className="col-lg-8" style={{padding: 0}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <Tomato />
            </div>
          </div>
          <div className="col-lg-3" style={{backgroundColor: '#eee', height: '100vh', borderLeft: '1px solid #ddd', padding: 0}}>
            <RightPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
