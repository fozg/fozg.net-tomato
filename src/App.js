import React, { Component } from 'react';

import RightPanel from './components/RightPanel';
import NavigateBar from './components/NavigateBar';
import Header from './components/Header'

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
    if (Notification.permission !== "denied") {
      Notification.requestPermission()
    }
    
  }


  _continueThisTask = ({id, taskName}) => {
    // this.refs.taskRun.startRun(id);
    // this.setState({isRunning: true});
  }


  render() {

    return (
      <div className="container-fluid" style={{alignItems: 'stretch', overflow: 'hidden' }}>
        <Header />
        <div className="row" style={{height: 'calc(100vh - 44px)'}} >
          <div  style={{backgroundColor: '#eee', height: '100%', padding: 0, width: 250}}>
            <NavigateBar />
          </div>
          <div className="col-sm" style={{padding: 0}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <Tomato />
            </div>
          </div>
          {/* <div style={{backgroundColor: '#eee', height: '100%', borderLeft: '1px solid #e6e6e6', padding: 0, width: 400}}>
            <RightPanel />
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;
