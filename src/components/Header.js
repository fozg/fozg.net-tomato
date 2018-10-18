import React from 'react';

import UserContext from '../context/UserContext';

import Signout from './Signout';
import {SIGN_IN_LINK, CONTINUTE_URL} from '../CONST';

export default class Header extends React.Component {

  render () {
    return (
      <div style={{
        justifyContent: 'space-between', 
        // borderBottom: '1px solid #ddd',
        padding: 5,
        background: '#dc5858',// rgb(109, 76, 162)',
        height: 44
      }} className="row">

        <div>
          <div style={{fontWeight: 600, color: '#fff', textAlign: 'center', lineHeight: '35px'}}>
            <img src='favicon.png' alt="TomatoWorks" width="30px" />
            {' '}TomatoWorks
          </div>
        </div>
        <div>
        <UserContext.Consumer>
          {ctx => <div style={{textAlign: 'right', }}>
            {ctx.isLogined ? 
              <div
                style={{color: 'rgba(255,255,255,.3)', padding: 5 }}
              >
                <a href="#" style={{color: 'rgba(255,255,255,.9)'}}>@{ctx.user.username}</a> <Signout></Signout>
              </div> :
              <a href={encodeURI(`${SIGN_IN_LINK}?service=tomato&continueUrl=${CONTINUTE_URL}`)}>
                <div style={{
                  background: '#dc5858',
                  color: 'rgba(255,255,255,.5)',
                  borderRadius: 30,
                  textAlign: 'center',
                  fontWeight: 200,
                  display: 'inline-block',
                  padding: '5px 15px'
                }}>
                  Signin using{' '}<strong style={{color: 'rgba(255,255,255,.8)'}}>fozg</strong>
                  <span style={{
                    border: '1px solid rgba(255,255,255,.8)', 
                    borderRadius: 5,
                    fontWeight: 600,
                    fontSize: 12, 
                    width: 20, 
                    backgroundColor: '#fff',
                    color: '#6d4ca2',
                    display: 'inline-block'}}>id</span>
                </div>
              </a>
            }
          </div>}
        </UserContext.Consumer>
        </div>

      </div>
    )
  }
}