import React from 'react';
import TomatoContext, {tomato as tomatoInitialState} from './TomatoContext';
import moment from 'moment';

import {Default_Seconds_To_Run} from '../CONST';
import api from '../api';
import {notifyMe} from '../helper';

import TomatoTaskLog from '../models/TomatoTaskLog';
var Sound = require('react-sound').default;

export default class UserProvider extends React.Component {
  state = {...tomatoInitialState, soundStatus: Sound.status.STOPPED};
 
  componentDidMount () {
    console.log('tomato provier did mount')
    api.getTomatoTasksLog({
      startTime: moment().startOf('day').toISOString(),
      endTime: moment().endOf('day').toISOString(),
    }).then(res => {
      console.log('tomato provier get worklog')

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
      console.log('tomato provier get worklog ERRRR', e)
      
    })
  }

  _getTomatoTasksLogByDate = (date) => {
    api.getTomatoTasksLog({
      startTime: moment(date).startOf('day').toString(),
      endTime: moment(date).endOf('day').toString(),
    }).then((res) => {
      this.setState({tasksList: res.map(o => ({...o, id: o._id}))});  
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
    this.setState({taskRunning: runningTomato, soundStatus: Sound.status.STOPPED})
    if (this.state.isRunning) { 
      this.delayUpdateToServer();
    }
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
    this.state.taskRunning.timeStart = moment().toISOString();
    this.state.taskRunning.timeStop = moment().add(Default_Seconds_To_Run, 'seconds')
    
    
    this.state.taskRunning.save().then(() => {
      this.startTimmer();
      this.setState({taskRunning: this.state.taskRunning})
    })
  }
  
  startTimmer = () => {
    let stopTime = moment(this.state.taskRunning.timeStop);
    let secondsToRun = moment(stopTime).diff(moment(), 'seconds');

    if (secondsToRun < 0) {
      clearTimeout(this.loop);
      this.setState({isRunning: false});
      // do something Run out of time
      this.playSound();
      notifyMe(`Task "${this.state.taskRunning.taskName}" has end`, () => {
        this.stopSound();
      });
      this.setState({tasksList: [this.state.taskRunning, ...this.state.tasksList]}, () => {
        this.setState({
          taskRunning: new TomatoTaskLog({taskName: ''}),
          secondsRemain: Default_Seconds_To_Run
        });
        document.title = `TomatoWorks`;
      })
      return;
    }
    this.setState({isRunning: true})
    this.loop = setTimeout(() => {
      this.setState({secondsRemain: secondsToRun});
      this.startTimmer(secondsToRun - 1);
      document.title = `(${`0${Math.floor(secondsToRun/60)}`.slice(-2)}:${`0${secondsToRun%60}`.slice(-2)}) TomatoWorks`
    }, 500)
  }

  stopTimmer = () => {
    this.setState({isRunning: false, secondsRemain: Default_Seconds_To_Run})
    document.title = `TomatoWorks`;
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

  playSound = () => {
    this.setState({soundStatus: Sound.status.PLAYING})
    console.log('playing song: EmmE-Em-Toi-Dat-G-DuUyen.mp3')
  }
  stopSound = () => {
    this.setState({soundStatus: Sound.status.STOPPED})
  }

  render () {
   return (
      <TomatoContext.Provider
        value={{
          ...this.state,
          startRun: this._startRun,
          stopRun: this._stopRun,
          updateTaskRunning: this._updateTaskRunning,
          playSound: this.playSound,
          stopSound: this.stopSound,
          getTomatoTasksLogByDate: this._getTomatoTasksLogByDate
        }}
      >
        {this.props.children}
        <Sound
            url="mp3/ido.mp3"
            playStatus={this.state.soundStatus}
            playFromPosition={0 /* in milliseconds */}
            // onLoading={this.handleSongLoading}
            // onPlaying={this.handleSongPlaying}
            // onFinishedPlaying={this.handleSongFinishedPlaying}
          />
      </TomatoContext.Provider>
    )
  }
}