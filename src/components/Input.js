import React, {Component} from 'react';
import cx from 'classnames';

export default class Input extends Component {
  state = {
    isRunningTask: false,
    value: ''
  }

  onTaskSubmit = e => {
    e.preventDefault();
    if (this.state.isRunningTask) {
      // do something
      return;
    }
    this.startRun(this.state.value); 
  }

  startRun = (taskName) => {
    this.setState({isRunningTask: true}, () => {
      this.props.onTaskSubmit({
        taskName
      });
    })
  }

  startRunFromOutside = (taskName) => {
    this.setState({isRunningTask: true, value: taskName})
  }
 
  onTaskForceStop = () => {
    this.setState({isRunningTask: false, value: ''});
    this.props.onTaskForceStop && this.props.onTaskForceStop();
  }

  _onChange = (e) => {
    this.setState({value: e.target.value});
  }
  
  render (){
    const {isRunningTask} = this.state;
    const {otherComponent} = this.props;

    return (
      <div>
        <div
          style={{
            width: '90%',
            margin: 'auto',
            position: 'relative',
          }}
          className={cx({'inputTaskWrapExpand': isRunningTask})}
        >
          <form onSubmit={this.onTaskSubmit}>
            <input 
              className="inputTask"
              placeholder="Enter task name to start"
              style={isRunningTask ? {backgroundColor: '#4caf50'} : null}
              value={this.state.value}
              onChange={this._onChange}
            ></input>
            <div className="stickyOnBthStartTask">
              <div style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 10}}>
                {otherComponent}
              </div>
              {!isRunningTask &&
                <div
                  className="btnStartTask"
                  onClick={this.onTaskSubmit}
                >
                  Start
                </div>
              }
              {
                isRunningTask && 
                <div
                  className="btnStartTask"
                  onClick={this.onTaskForceStop}
                >
                  Stop
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}