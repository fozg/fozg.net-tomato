import React from 'react';
import moment from 'moment';

export default class CountDown extends React.Component {
  state = {
    seconds : this.props.seconds || 0
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return nextState.seconds !== this.state.seconds;
  }
  
  componentDidMount () {
    if (this.props.isRunning) {
      // this.setState({seconds: this.props.seconds - 1});
      this.loop(this.props.seconds - 1)
    }
  }
  
  componentWillUnmount () {
    clearTimeout(this.loop)
  }

  loop = (sec) => {
    let seconds = moment(this.props.timeStop).diff(moment(), 'seconds')
    console.log({seconds})
    if (seconds < 0) {
      clearTimeout(this.delay);
      return;
    }
    this.delay = setTimeout(() => {
      this.setState({seconds});
      this.loop()
    }, 1000);
  }

  render() {
    const {seconds} = this.state;
    return (
      <div
        style={{margin: 'auto', textAlign: 'center'}}
      >
        <h3 style={{margin: 0, padding: 0, color: '#fff'}}>
          {`0${Math.floor(seconds/60)}`.slice(-2)}:{`0${seconds%60}`.slice(-2)}
        </h3>
      </div>
    )
  }
}