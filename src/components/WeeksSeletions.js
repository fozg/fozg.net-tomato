import React from "react";
import moment from "moment";
import WeekDayPicker, { getDatesOfWeek } from "react-weekdays-picker";

import { SelectGroup, Button } from "fozg-ui";

import { getDaysOfTheWeek } from "../helper";

export default class WeeksSelection extends React.Component {
  state = {
    buttonGroupActiveIdx: moment().weekday(), // (moment().weekday() + 6) % 7,
    currentDaysOfWeek: getDaysOfTheWeek()
  };

  today = moment().weekday(); // (moment().weekday() + 6) % 7;

  _onChange = idx => {
    this.setState({ buttonGroupActiveIdx: idx });
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.currentDaysOfWeek[idx]);
    }
  };

  onBackToTodayClick = () => {
    this.setState({ buttonGroupActiveIdx: this.today });
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.currentDaysOfWeek[this.today]);
    }
  };

  onDateChanged = date => {
    this.props.onDateChange(moment(date));
  };

  render() {
    const { buttonGroupActiveIdx } = this.state;
    return [
      <div key="item-1">
        {this.today !== buttonGroupActiveIdx && (
          <Button onClick={this.onBackToTodayClick}>Go back Today</Button>
        )}
      </div>,
      <div style={{ textAlign: "right" }} key="item-2">
        <WeekDayPicker onDateChanged={this.onDateChanged} />
        {/* <SelectGroup
            activeIdx={this.state.buttonGroupActiveIdx}
            onChange={this._onChange}
            height={'2.68em'}
          >
            {currentDaysOfWeek.map((day, idx) => (
              <div className="buttonGroup" key={idx}>
                <strong style={{fontWeight: this.today === idx ? '600' : '400'}}>
                  {day.format('ddd')}
                </strong>
                <div style={{fontSize: 12, opacity: .6}}>{day.format('MMM DD')}</div>
              </div>
            ))}
        </SelectGroup> */}
      </div>
    ];
  }
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
