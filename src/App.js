import React, { Component } from 'react';
import moment from 'moment';
import Input from './components/Input';
import TaskGroup from './components/TaskGroup';
import TaskRun from './components/TaskRun';
import ProgressBar from './components/ProgressBar';
import WelcomeMess from './components/WelcomeMess';
import { isMoment }from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import RightPanel from './components/RightPanel';
import Navigation from './components/Navigation';
import SubTomatoTasksInput from './components/SubTomatoTasksInput';

// models
import TomatoTaskLog from './models/TomatoTaskLog';
// api
import api from './api'

class App extends Component {
  state = {
    isRunning: false,
    percent: 0,
    tasks: [],
    subTasksRunning: []
  }

  componentDidMount () {
    api.getTomatoTasksLog().then(res => {
      this.setState({tasks: res.map(o => ({...o, id: o._id}))});  

      let someTaskNotDone = res.find((item) => moment(item.timeStop).diff(moment(), 'milliseconds') > 0);
      if (someTaskNotDone !== undefined) {
        console.log(someTaskNotDone)
        this.setState({isRunning: true, subTasksRunning: someTaskNotDone.subTasks})
        this.refs.taskRun.startRun(someTaskNotDone.timeStop);
        this.refs.taskInput.startRunFromOutside(someTaskNotDone.taskName);
        this.tomatoTaskLogRunning = new TomatoTaskLog({
          ...someTaskNotDone, id: someTaskNotDone._id
        })
      }
    }).catch(e => {
      
    })
  }

  // when Task start running
  _onTaskSubmit = async ({taskName}) => {
    console.log('taskname', taskName)
    
 
    this.tomatoTaskLogRunning = new TomatoTaskLog({
      taskName: taskName || 'Unnamed task started at '+ moment().format('hh:mm'),
      timeStart: new Date(),
    });

    await this.tomatoTaskLogRunning.save();
    this.refs.taskRun.startRun();
    this.setState({isRunning: true});
    
    this.setState({tasks: [this.tomatoTaskLogRunning.toObject(), ...this.state.tasks]})
  }

  _continueThisTask = ({id, taskName}) => {
    // this.refs.taskRun.startRun(id);
    // this.setState({isRunning: true});
  }

  // when click stop button
  _onTaskForceStop = () => {
    if (this.tomatoTaskLogRunning) {
      this.tomatoTaskLogRunning.timeStop = new Date();
      console.log(this.tomatoTaskLogRunning)
      this.tomatoTaskLogRunning.stop().then(res => {console.log('STOPED!!', res)});
    }

    this.refs.taskRun.stopRun();
    this.setState({isRunning: false, subTasksRunning: []});

    let newTasks = [...this.state.tasks];
    let taskToUpdate = newTasks[0];
    taskToUpdate.timeStop = this.tomatoTaskLogRunning.timeStop;
    this.setState({tasks: newTasks});
  }

  // update bar style
  _onDistanceChange = (percent) => {
    this.setState({percent})
  }

  /**
   * @void On run time run out of time
   */
  _onRunOutofTime = () => {
    // just call stop task
    this.refs.taskInput.onTaskStop();
  }

  _onSubTomatoTasksChange = subTasks => {    
    this.tomatoTaskLogRunning.subTasks = subTasks;    
    this.delayUpdate();
  }

  /**
   * Delay send update to server 500ms
   */
  delayUpdate = () => {
    clearTimeout(this.delay);
    this.delay = setTimeout(() => {
      this.tomatoTaskLogRunning.update().then(res => {
        console.log('UPDATEDD!!!!')
        clearTimeout(this.delay);
      });
    }, 500)
  }

  render() {
    const {
      isRunning,
      percent,
      tasks,
      subTasksRunning
    } = this.state;

    return (
      <div className="container-fluid" style={{alignItems: 'stretch', overflow: 'hidden' }}>
        <div className="row" >
          <div className="col-lg-1" style={{backgroundColor: '#eee', height: '100vh', padding: 0}}>
            <Navigation />
          </div>
          <div className="col-lg-8" style={{padding: 0}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <div
                style={{backgroundColor: isRunning ? '#cde8cf':'#ffd6cc', padding: '50px 0', position: 'relative'}}
              > 
                <WelcomeMess />
                <Input
                  ref="taskInput"
                  onTaskSubmit={this._onTaskSubmit}
                  otherComponent={
                    <TaskRun 
                      onDistanceChange={this._onDistanceChange} 
                      ref="taskRun"
                      onRunOutofTime={this._onRunOutofTime}
                    />
                  }
                  onStartClick={this._onTaskSubmit}
                  onTaskForceStop={this._onTaskForceStop}
                />

                {
                  isRunning && <div style={{width: '90%', margin: 'auto '}}>
                    <SubTomatoTasksInput 
                      onChange={this._onSubTomatoTasksChange} 
                      defaultValue={subTasksRunning}
                    />
                  </div>
                }

                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                  <ProgressBar percent={percent} isRunning={isRunning}/>
                </div>
              </div>
              <div style={{height: '100%'}}>
                <Scrollbars height="100%" style={{paddingTop: 20}}>
                  {tasks.length === 0 && <div style={{textAlign: 'center', marginTop: 50}}>
                    <h3 style={{fontWeight: 200}}>You haven't done any task today</h3>
                    <h3 style={{fontWeight: 200}}>Let's do some works</h3>
                  </div>}
                  <div style={{height: 20}}></div>
                  {tasks.map((o, idx) => <TaskGroup {...o} key={o.id} />)} 
                </Scrollbars>
              </div>
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

const mock = [
  {
    id: 1,
    timeStart: moment(),
    timeStop: moment().add(25, 'minutes'),
    taskName: 'Continue Start coding task manager',
  },

]