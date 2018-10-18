import React from 'react';
import api from '../api';
import moment from 'moment';
// init 
export const tasksList = {
  tasksList: []
}

// context
export const TomatoTaskListContext = React.createContext(tasksList);

// provider
export class TomatoTaskListProvider extends React.Component {
  state = tasksList;

  componentDidMount () {

    api.getTomatoTasksLog({
      startTime: moment().startOf('day').toISOString(),
      endTime: moment().endOf('day').toISOString(),
    }).then(res => {
      console.log('tomato provier get worklog from TomatoTaskListProvider')

      this.setState({tasksList: res.map(o => ({...o, id: o._id}))});  

      // let someTaskNotDone = res.find((item) => moment(item.timeStop).diff(moment(), 'milliseconds') > 0);
      // if (someTaskNotDone !== undefined) {
      //   console.log(someTaskNotDone)
      //   let secondsRemain = moment(someTaskNotDone.timeStop).diff(moment(), 'seconds');
      //   let tasksList = [...this.state.tasksList]; 
      //   tasksList.shift();
      //   this.setState({
      //     tasksList: tasksList,
      //     isRunning: true,
      //     taskRunning: new TomatoTaskLog({...someTaskNotDone, id: someTaskNotDone._id}),
      //     secondsRemain
      //   });
      //   this.startTimmer(secondsRemain)
      // }
    }).catch(e => {
      console.log('tomato provier get worklog ERRRR', e)
      
    })
  }

  _getTomatoTasksLogByDate = (date) => {
    api.getTomatoTasksLog({
      startTime: moment(date).startOf('day').toString(),
      endTime: moment(date).endOf('day').toString(),
    }).then((res) => {
      this.setState({tasksList: res.map(o => ({...o, id: o._id}))});  
    }).catch(e => {

    })
  }

  _insertTask = (taskRunning) => {
    this.setState({tasksList: [taskRunning, ...this.state.tasksList]});
  }

  render () {
   return (
      <TomatoTaskListContext.Provider
        value={{
          tasksList: this.state.tasksList,
          getTomatoTasksLogByDate: this._getTomatoTasksLogByDate,
          insertTask: this._insertTask
        }}
      >
        {this.props.children}
      </TomatoTaskListContext.Provider>
    )
  }
}