import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';

import TaskGroup from '../components/TaskGroup';
import WelcomeMess from '../components/WelcomeMess';
import ProgressBar from '../components/ProgressBar';
import TomatoInput from '../components/TomatoInput';
import SubTomatoTasksInput from '../components/SubTomatoTasksInput';
import WeeksSelection from '../components/WeeksSeletions';

import { Default_Seconds_To_Run } from '../CONST'
import TomatoContext from '../context/TomatoContext';

// big Component
import TomatoTaskList from './TomatoTaskList'

export default () => ([
    <TomatoContext.Consumer key="tomatoCusumer">
      {({
        isRunning,
        secondsRemain,
        taskRunning,
        updateTaskRunning,
      }) => (
          <WrapStyled
            key={'tomatoInput'}
            className={isRunning ? 'running' : 'idle'}
          >
            <div style={{ margin: '0 20px', position: 'relative' }}>
              <WelcomeMess />
              <TomatoInput />
              {
                isRunning && <div style={{ width: '90%', margin: 'auto ' }}>
                  <SubTomatoTasksInput
                    onChange={subTasks => updateTaskRunning({ subTasks })}
                    defaultValue={taskRunning.subTasks}
                  />
                </div>
              }
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
              <ProgressBar 
                isRunning={isRunning} 
                seconds={secondsRemain}
                key={taskRunning.id}
              />
            </div>
          </WrapStyled>
        )}
    </TomatoContext.Consumer>,
    <div
      style={{ height: '100%', display: 'flex' }}
      key={'tomatoList'}
    >
      <TomatoTaskList />
    </div>
  ]
)

const WrapStyled = styled.div`
  padding: 50px 0;
  position: relative;

  &.running {
    color: rgb(76, 175, 80);
    background: linear-gradient(to bottom, #cde8cf 0%,rgba(255,255,255,1) 100%);

  }
  &.idle {
    color: #dc5858;
    background: linear-gradient(to bottom, rgba(255,225,225,1) 0%,rgba(255,255,255,1) 100%);
  }
`

// <TomatoContext.Consumer>
//         {({
//           tasksList,
//           getTomatoTasksLogByDate,
//           isRunning
//         }) => (

//             <Scrollbars height="100%" style={{ paddingTop: 10 }}>
//               <div style={{ textAlign: 'right', marginRight: 20 }}>
//                 <WeeksSelection onDateChange={getTomatoTasksLogByDate} />
//               </div>
//               {tasksList.length === 0 && !isRunning && <div style={{ textAlign: 'center', marginTop: 50 }}>
//                 <h3 style={{ fontWeight: 200 }}>You haven't done any task today</h3>
//                 <h3 style={{ fontWeight: 200 }}>Let's do some works</h3>
//               </div>}
//               {/* <div style={{height: 20}}></div> */}
//               {tasksList.map((o, idx) => <TaskGroup {...o} key={o.id} />)}
//             </Scrollbars>
//           )}
//       </TomatoContext.Consumer>