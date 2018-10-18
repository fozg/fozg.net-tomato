import React from 'react';
import { Default_Seconds_To_Run } from '../CONST'

export default class ProgressBar extends React.Component {
  state = {
    seconds : 0,
    percent: (this.props.seconds) / Default_Seconds_To_Run * 100
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.isRunning && nextState.seconds !== this.state.seconds;
  }
  
  componentDidMount () {
    if (this.props.isRunning) {
      
      setTimeout(() => {
        this.setState({percent: 0, seconds: this.props.seconds})
      }, 200);
    }
  }

  render () {
    const {
      percent,
      seconds
    } = this.state;
    const {
      isRunning,
      id
    } = this.props;
    console.log('progress bar')
    return (
    <div
      style={{
        width: '100%',
        height: 5,
        backgroundColor: 'transparent',
        position: 'relative',

      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: 5,
          backgroundColor: isRunning ? '#009688' : 'transparent',
          position: 'absolute',
          zIndex: 100,
          left: 0,
          top: 0,
          transition: `width ${seconds}s linear `
        }}
      >

      </div>
    </div>
    )
  }
}

 