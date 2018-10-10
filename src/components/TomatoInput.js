import React, {Component} from 'react';
import cx from 'classnames';

import CountDown from './CountDown';

import TomatoContext from '../context/TomatoContext';


export default class Input extends Component {

  onTaskSubmit = (e, startRunContext) => {
    e.preventDefault();
   
    startRunContext();
  }
  
  render (){
    return (
      <TomatoContext.Consumer>
        {({
          isRunning,
          startRun,
          stopRun,
          secondsRemain,
          taskRunning,
          updateTaskRunning,
        }) => (
          <div>
            <div
              style={{
                width: '90%',
                margin: 'auto',
                position: 'relative',
              }}
              className={cx({'inputTaskWrapExpand': isRunning})}
            >
              <form onSubmit={e => { this.onTaskSubmit(e, startRun)}}>
                <input 
                  className="inputTask"
                  placeholder="Enter task name to start"
                  style={isRunning ? {backgroundColor: '#4caf50'} : null}
                  value={taskRunning.taskName}
                  onChange={e => {updateTaskRunning({taskName: e.target.value})}}
                ></input>
                <div className="stickyOnBthStartTask">
                  <div style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 10}}>
                    <CountDown seconds={(secondsRemain)} />
                  </div>
                  {!isRunning &&
                    <div
                      className="btnStartTask"
                      onClick={e => { this.onTaskSubmit(e, startRun)}}
                    >
                      Start
                    </div>
                  }
                  {
                    isRunning && 
                    <div
                      className="btnStartTask"
                      onClick={_ => {stopRun()}}
                    >
                      Stop
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
        )}
      </TomatoContext.Consumer>
    )
  }
}