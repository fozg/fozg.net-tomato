import React from 'react';
import moment from 'moment';


const minutesToRun = 25;

export default class TaskRun extends React.Component {
  state = {
    minutes: minutesToRun,
    seconds: 0
  }

  componentDidMount () {
    // this.startRun();
  }

  startRun = (timeToStop) => {

    let stopTime = timeToStop ? moment(timeToStop) : new Date(new Date().getTime() + minutesToRun * 60000 + 1000);
    // let stopTime = new Date(new Date().getTime() + 3000);
    this.loop = setInterval(() => {
      
      // let duration = moment.duration(moment(stopTime).diff(moment()))
      let now = new Date().getTime();
      var distance = stopTime - now;

      if (distance <= 0) {
        this.onRunOutofTime();
        clearInterval(this.loop);
        this.setState({minutes: 0, seconds: 0});
        return;
      }
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      this.props.onDistanceChange(distance/ (minutesToRun * 60000) * 100);
      this.setState({minutes, seconds});
      document.title = `(${minutes}:${seconds}) TomatoWorks`
      // this.setState({minutes: duration.minutes(), seconds: duration.seconds()})
    }, 500)
  }

  onRunOutofTime = () => {
    this.props.onRunOutofTime && 
    this.props.onRunOutofTime();
    document.title = `(Stoped) TomatoWorks`
  }

  stopRun = () => {
    clearInterval(this.loop);
    this.setState({minutes: minutesToRun, seconds: 0});
    document.title = `TomatoWorks`
  }

  render () {
    const {
      minutes,
      seconds
    } = this.state;

    return (
      <div
        style={{margin: 'auto', textAlign: 'center'}}
      >
        <h3 style={{margin: 0, padding: 0, color: '#fff'}}>
          {`0${minutes}`.slice(-2)}:{`0${seconds}`.slice(-2)}
        </h3>
      </div>
    )
  }
}