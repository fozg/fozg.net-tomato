import React from 'react';
import moment from 'moment';

export default ({
  timeStart,
  timeStop,
  taskName,
  subTasks,
  isSeleted,
  continueThisTask,
}) => {
  let tstop;
  let diff = moment(timeStop).diff(moment(), 'milliseconds');
  tstop = diff > 0 ? null : timeStop;
  

  return (
    <div
      style={{
        width: '90%',
        margin: 'auto',
        marginBottom: 20,
        background: '#efefef',
        borderRadius: 8,
        border: '2px solid #ddd'
      }}
    >    
      <div className="taskItemWrap" style={isSeleted ? {border: '2px solid #f9876b', backgroundColor: '#eee'} : null}>
        <div className="row">
          <div style={{width: 50, textAlign: 'center'}}>
            {tstop && moment.duration(moment(tstop).diff(moment(timeStart))).minutes()}'
          </div>
          <div style={{flex: 1, width: '100%'}}>
            <div className="row" style={{margin: 0}}>
              <div
                style={{...timeStyles, color: 'red'}}
              >
                {tstop && moment(tstop).format('hh:mm')}
              </div>
              <div style={{flex: 1, color: 'red'}}>
                {tstop ? <div>
                ← {taskName}
                </div> : <div style={{color: 'green'}}>
                  Working on '{taskName}'...
                </div>}
              </div>
            </div>
            {subTasks && subTasks.length !== 0 && 
              <div className="row" style={{margin: 0}}>
                <div 
                  style={{...timeStyles, color: '#2196F3'}}
                ></div>
                <ul style={{listStyle: 'square'}}>
                  {subTasks.map((sub, idx) => (
                    <li key={idx}>
                      <div style={{textDecoration: sub.isDone ? 'line-through' : 'none'}}> {sub.taskName} </div>
                    </li>
                  ))}
                </ul>
              </div>}
            <div className="row" style={{margin: 0}}>
              <div 
                style={{...timeStyles, color: '#2196F3',}}
              >
                {moment(timeStart).format('HH:mm')}
              </div>
             
              <div style={{flex: 1,  color: '#2196F3'}}>
                → {taskName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const timeStyles = {
  textAlign: 'right',
  fontWeight: '600',
  width: 60,
  paddingRight: 10,
  borderRight: '1px solid lightgray',
  marginRight: 10,
} 