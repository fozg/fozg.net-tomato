import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {Button} from 'fozg-ui'
import {FiTrash2, FiCornerRightUp} from 'react-icons/fi';

export default class TomatoGroup extends React.PureComponent {
  render () {
    const {
      timeStart,
      timeStop,
      taskName,
      subTasks,
      isSeleted,
      continueThisTask,
      parent
    } = this.props;
    
    let tstop;
    let diff = moment(timeStop).diff(moment(), 'milliseconds');
    tstop = diff > 0 ? false : timeStop;
    console.log('check', tstop)
    if (tstop === false) return false;
    return (
      <WrapStyled>    
        <div style={isSeleted ? {border: '2px solid #f9876b', backgroundColor: '#eee'} : null}>
          <div className="row">
                <div style={{width: 50, textAlign: 'center'}}>
                  {tstop && moment.duration(moment(tstop).diff(moment(timeStart))).minutes()}'
                </div>
                <div style={{flex: 1, width: '100%'}}>
                  <div className="row" style={{margin: 0}}>
                    <div
                      style={{...timeStyles, color: 'red'}}
                    >
                      {tstop && moment(tstop).format('HH:mm')}
                    </div>
                    <div style={{flex: 1, color: 'red'}}>
                      {tstop ? <div>
                        {parent ? <div>
                          <span style={{color: '#9e9e9e'}}>continute: </span>
                          <a style={{color: '#2196f3', fontWeight: 600}}>#{parent.taskName}</a>
                        </div> : `← ${taskName}`}
                      
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
                      style={{...timeStyles, color: '#999',}}
                    >
                      {moment(timeStart).format('HH:mm')}
                    </div>
                  
                    <div style={{flex: 1,  color: 'rgba(0,0,0,.1)'}}>
                      → {taskName}
                    </div>
                  </div>
                </div>
              </div>
            <div className="autoHide" style={{textAlign: 'right', fontSize: 14}}>
              <Button  color="#009688" onClick={continueThisTask}>
                Continute this task <FiCornerRightUp fill="transparent"/></Button>
              <Button color="#aaa" hoverColor='red'><FiTrash2 fill="transparent"/></Button>
            </div>
          </div>
      </WrapStyled>
    )
  }
}

// blue color #2196F3

const timeStyles = {
  textAlign: 'right',
  fontSize: 14,
  width: 60,
  paddingRight: 10,
  borderRight: '1px solid #e5e5e5',
  marginRight: 10,
} 

const WrapStyled = styled.div`
  position: relative;
  cusor: default;

  :first-of-type {
    background-color: red;
  }
  width: calc(100% - 20px);
  margin: auto;
  border-top: 1px solid #e5e5e5;
  padding: 10px;
  transition: border-color .3s ease-out;
  
  :hover {
    background-color: whitesmoke;
  }
  :hover .autoHide {
    display: block;
  }
  .autoHide {
    display: none;
    position: absolute;
    right: 10px;
    top: -5px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 2px rgba(0,0,0,.1);
    line-height: 1;
    overflow: hidden;
  }
`

// const WrapStyled = styled.div`
//   width: calc(100% - 40px);
//   margin: auto;
//   margin-bottom: 20px;
//   background-color: #efefef;
//   border-radius: 8px;
//   border: 2px solid #ddd;
//   padding: 10px;
//   transition: border-color .3s ease-out;
  
//   :hover {
//     border-color: #f9876b;
//     background-color: #eee;
//   }
//   :hover .autoHide {
//     display: block;
//   }
//   .autoHide {
//     display: none
//   }
// `