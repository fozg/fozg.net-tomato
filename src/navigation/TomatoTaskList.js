import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';


import WeeksSelection from '../components/WeeksSeletions';
import TaskGroup from '../components/TaskGroup';

import api from '../api';

import { TomatoTaskListContext } from '../context/TomatoTaskList';
import TomatoContext from '../context/TomatoContext';

export default class TomatoTaskList extends React.PureComponent {
  
  state = {
    tasksList: [],
  }

  _getTomatoTasksLogByDate = (date) => {
    api.getTomatoTasksLog({
      startTime: moment(date).startOf('day').toString(),
      endTime: moment(date).endOf('day').toString(),
    }).then((res) => {
      this.setState({ tasksList: res.map(o => ({ ...o, id: o._id })) });
    }).catch(e => {

    })
  }

  render() {
    const {
      tasksList
    } = this.state;

    return (
      <TomatoContext.Consumer>
        {({
          continueTask
        }) => (
          <TomatoTaskListContext.Consumer>
            {({ 
              tasksList,
              getTomatoTasksLogByDate
            }) => (
              <TaskList 
                tasksList={tasksList}
                getTomatoTasksLogByDate={getTomatoTasksLogByDate} 
                continueTask={continueTask}
              />
            )}
          </TomatoTaskListContext.Consumer>
        )}
      </TomatoContext.Consumer>
    )
  }
}

class TaskList extends React.PureComponent {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.tasksList.length !== this.props.tasksList.length
  }
  render () {
    const {tasksList, getTomatoTasksLogByDate, continueTask} = this.props;

    return (
      <Scrollbars height="100%" style={{ paddingTop: 10 }}>
        <div style={{ textAlign: 'right', marginRight: 20 }}>
          <WeeksSelection onDateChange={getTomatoTasksLogByDate} />
        </div>
        {tasksList.length === 0 && <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h3 style={{ fontWeight: 200 }}>You haven't done any task today</h3>
          <h3 style={{ fontWeight: 200 }}>Let's do some works</h3>
        </div>}
        
        {tasksList.map((tomato, idx) => (
          <TaskGroup 
            {...tomato} 
            key={tomato.id} 
            continueThisTask={() => {continueTask(tomato)}}
          />
        ))} 
      </Scrollbars>
    )
  }
}