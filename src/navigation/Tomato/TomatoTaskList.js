import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';


import WeeksSelection from '../../components/WeeksSeletions';
import TaskGroup from '../../components/TaskGroup';

import api from '../../api';

import { TomatoTaskListContext } from '../../context/TomatoTaskList';
import TomatoContext from '../../context/TomatoContext';

export default class TomatoTaskList extends React.PureComponent {
  
  state = {
    tasksList: [],
  }

  // _getTomatoTasksLogByDate = (date) => {
  //   api.getTomatoTasksLog({
  //     startTime: moment(date).startOf('day').toString(),
  //     endTime: moment(date).endOf('day').toString(),
  //   }).then((res) => {
  //     this.setState({ tasksList: res.map(o => ({ ...o, id: o._id })) });
     
  //   }).catch(e => {

  //   })
  // }

  render() {
    return (
      <TomatoContext.Consumer>
        {({
          continueTask
        }) => (
          <TomatoTaskListContext.Consumer>
            {({ 
              data,
              getTomatoTasksLogByDate
            }) => (
              <TaskList 
                data={data}
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
  
  render () {
    const {data, getTomatoTasksLogByDate, continueTask} = this.props;
    console.log(data.get('tasksList'))
    return (
      <Scrollbars height="100%" style={{ paddingTop: 10,}}>
        <div className="row" style={{width: '90%', margin: 'auto', justifyContent: 'space-between'}}>
            <WeeksSelection onDateChange={getTomatoTasksLogByDate} />
        </div>
        {data.get('tasksList').size === 0 && <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h3 style={{ fontWeight: 200 }}>You haven't done any task today</h3>
          <h3 style={{ fontWeight: 200 }}>Let's do some works</h3>
        </div>}
        
        {data.get('tasksList').map((tomato, idx) => (
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