import React from 'react';
import moment from 'moment';

import UserContext from '../context/UserContext';

const Mess = ({name}) => {
  let hours = moment().hours();

  if (hours < 5) return <h2>It's early Morning, {name} </h2>

  if (hours < 12) return <h2>Good morning, {name} </h2>

  if (hours > 18) return <h2>Good night, {name} </h2>


  return <h2>Good afternoon, {name}</h2>

}

export default class Welcome extends React.Component{

  render () {
    return (
      <div 
        style ={{
          width: '90%',
          margin: '0px auto 30px',
          
        }}
        className="row"
      >
        <div className="col-sm-10">
          <UserContext.Consumer>
            {({user}) => <Mess name={(user) ? user.username: ''} />}
          </UserContext.Consumer>
        </div>
        <div className="col-sm-2" style={{textAlign: 'right'}}>
          
        </div>
      </div>
    )
  }
}
