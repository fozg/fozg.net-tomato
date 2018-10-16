import React from 'react';
import moment from 'moment';

import {SelectGroup, Button} from 'fozg-ui';

import {getDaysOfTheWeek} from '../helper';

export default class WeeksSelection extends React.Component {

  state = {
    buttonGroupActiveIdx: moment().weekday(), // (moment().weekday() + 6) % 7,
    currentDaysOfWeek: getDaysOfTheWeek(),
  }

  today = moment().weekday(); // (moment().weekday() + 6) % 7;

  _onChange = idx => {
    this.setState({ buttonGroupActiveIdx: idx });
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.currentDaysOfWeek[idx])
    }
  }

  onBackToTodayClick = () => {
    this.setState({ buttonGroupActiveIdx: this.today });
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.currentDaysOfWeek[this.today])
    }
  }

  render() {
    const {
      buttonGroupActiveIdx,
      currentDaysOfWeek
    } = this.state;
    return (
      <div
        style={{display: 'flex', justifyContent: 'space-between'}}
      > 
        <div>
          {this.today !== buttonGroupActiveIdx &&
            <Button onClick={this.onBackToTodayClick}>Go back Today</Button>}
        </div>
        <SelectGroup
          activeIdx={this.state.buttonGroupActiveIdx}
          onChange={this._onChange}
          height={40}
        >
          {currentDaysOfWeek.map((day, idx) => (
            <div className="buttonGroup" key={idx}>
              <strong style={{fontWeight: this.today === idx ? '600' : '400'}}>
                {day.format('ddd')}
              </strong>
              <div style={{fontSize: 12, opacity: .6}}>{day.format('MMM DD')}</div>
            </div>
          ))}
        </SelectGroup>
      </div>
    )
  }
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]