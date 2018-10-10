import React from 'react';
import TomatoContext, {tomato} from './TomatoContext';
import moment from 'moment';

import {Default_Seconds_To_Run} from '../CONST';
import api from '../api';

import TomatoTaskLog from '../models/TomatoTaskLog';

export default class UserProvider extends React.Component {
  state = tomato;
 
  componentDidMount () {
    api.getTomatoTasksLog().then(res => {
      this.setState({tasksList: res.map(o => ({...o, id: o._id}))});  

      let someTaskNotDone = res.find((item) => moment(item.timeStop).diff(moment(), 'milliseconds') > 0);
      if (someTaskNotDone !== undefined) {
        console.log(someTaskNotDone)
        let secondsRemain = moment(someTaskNotDone.timeStop).diff(moment(), 'seconds');
        let tasksList = [...this.state.tasksList]; 
        tasksList.shift();
        this.setState({
          tasksList: tasksList,
          isRunning: true,
          taskRunning: new TomatoTaskLog({...someTaskNotDone, id: someTaskNotDone._id}),
          secondsRemain
        });
        this.startTimmer(secondsRemain)
      }
    }).catch(e => {
      
    })
  }

  _updateTaskRunning = ({taskName, subTasks}) => {
    let runningTomato = this.state.taskRunning;    
    if (taskName !== undefined) {
      if (taskName === '') {
        if (!this.state.isRunning) {
          runningTomato.taskName = ''
        } else {
          runningTomato.taskName = `Unnamed task start at ${moment().format('hh:mm')}`;
        }
      } else {
        runningTomato.taskName = taskName;
      }
    };

    if (subTasks !== undefined) runningTomato.subTasks = subTasks;  
    this.setState({taskRunning: runningTomato})
    this.delayUpdateToServer();
  }

  /**
   * Delay send update to server 500ms
   */
  delayUpdateToServer = () => {
    clearTimeout(this.delay);
    this.delay = setTimeout(() => {
      this.state.taskRunning.update().then(res => {
        console.log('UPDATEDD!!!!')
        clearTimeout(this.delay);
      });
    }, 500)
  }

  _startRun = taskName => {
    if (this.state.isRunning) return;

    if (this.state.taskRunning.taskName === '') {
      this.state.taskRunning.taskName = `Unnamed task start at ${moment().format('hh:mm')}`;
    }
    this.state.taskRunning.timeStart = new Date();
    this.state.taskRunning.timeStop = moment().add(Default_Seconds_To_Run, 'seconds')
    
    this.state.taskRunning.save().then(() => {
      this.startTimmer();
      this.setState({taskRunning: this.state.taskRunning})
    })
  }
  
  startTimmer = (secondsToRun = Default_Seconds_To_Run) => {
    if (secondsToRun < 0) {
      clearTimeout(this.loop);
      this.setState({isRunning: false});
      // do something Run out of time
      this.setState({tasksList: [this.state.taskRunning, ...this.state.tasksList]}, () => {
        this.setState({taskRunning: new TomatoTaskLog({taskName: ''})})
      })
      return;
    }
    this.setState({isRunning: true})
    this.loop = setTimeout(() => {
      this.setState({secondsRemain: secondsToRun});
      this.startTimmer(secondsToRun - 1);
    }, 1000)
  }

  stopTimmer = () => {
    this.setState({isRunning: false})
    clearTimeout(this.loop);
  }

  _stopRun = () => {
    this.state.taskRunning.stop().then(() => {
      this.setState({tasksList: [this.state.taskRunning, ...this.state.tasksList]}, () => {
        this.setState({taskRunning: new TomatoTaskLog({taskName: ''})})
      })
    });
   
    this.stopTimmer();
  }

  render () {
   return (
      <TomatoContext.Provider
        value={{
          ...this.state,
          startRun: this._startRun,
          stopRun: this._stopRun,
          updateTaskRunning: this._updateTaskRunning
        }}
      >
        {this.props.children}
      </TomatoContext.Provider>
    )
  }
}