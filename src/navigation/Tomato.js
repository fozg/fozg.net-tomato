import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import TaskGroup from '../components/TaskGroup';
import WelcomeMess from '../components/WelcomeMess';
import ProgressBar from '../components/ProgressBar';
import TomatoInput from '../components/TomatoInput';
import SubTomatoTasksInput from '../components/SubTomatoTasksInput';
import WeeksSelection from '../components/WeeksSeletions';

import {Default_Seconds_To_Run} from '../CONST'
import TomatoContext from '../context/TomatoContext';

export default () => (
  <TomatoContext.Consumer>
    {({
      isRunning,
      tasksList,
      secondsRemain,
      taskRunning,
      updateTaskRunning,
      getTomatoTasksLogByDate
    }) => (
      [
        <div
          style={{backgroundColor: isRunning ? '#cde8cf':'#ffd6cc', padding: '50px 0', position: 'relative'}}
          key={'tomatoInput'}
        > 
          <WelcomeMess />
          <TomatoInput />
          {
            isRunning && <div style={{width: '90%', margin: 'auto '}}>
              <SubTomatoTasksInput 
                onChange={subTasks => updateTaskRunning({subTasks})} 
                defaultValue={taskRunning.subTasks}
              />
            </div>
          }

          <div style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <ProgressBar percent={secondsRemain / Default_Seconds_To_Run * 100} isRunning={isRunning}/>
          </div>
        </div>,
        <div
          style={{height: '100%'}}
          key={'tomatoList'}        
        >
          <Scrollbars height="100%" style={{paddingTop: 20}}>
            <div style={{textAlign: 'right', marginRight: 20}}>
              <WeeksSelection onDateChange={getTomatoTasksLogByDate}/>
            </div>
            {tasksList.length === 0 && !isRunning && <div style={{textAlign: 'center', marginTop: 50}}>
              <h3 style={{fontWeight: 200}}>You haven't done any task today</h3>
              <h3 style={{fontWeight: 200}}>Let's do some works</h3>
            </div>}
            <div style={{height: 20}}></div>
            {isRunning && <TaskGroup {...taskRunning} />}
            {tasksList.map((o, idx) => <TaskGroup {...o} key={o.id} />)} 
          </Scrollbars>
        </div>
      ]
    )}
  </TomatoContext.Consumer>
)