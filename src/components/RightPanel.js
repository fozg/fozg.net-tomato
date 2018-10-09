import React from 'react';
import styled from 'styled-components'

import Faq from './FAQ';
import Signout from './Signout';

import {SIGN_IN_LINK, CONTINUTE_URL} from '../CONST';

import UserContext from '../context/UserContext';

export default class RightPanel extends React.Component {
  state = {
    activeIdx: -1,
  }
 
  render () {
    const {activeIdx} = this.state;

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', height: '100%'}}>
        <UserContext.Consumer>
          {ctx => <div style={{textAlign: 'right', background: '#fcfcfc', borderBottom: '1px solid #ddd'}}>
            {ctx.isLogined ? 
              <div
                style={{padding: 10}}
              >
                <a>@{ctx.user.username}</a> <Signout></Signout>
              </div> :
              <a href={encodeURI(`${SIGN_IN_LINK}?service=tomato&continueUrl=${CONTINUTE_URL}`)}>
                <div style={{
                  background: '#6d4ca2',
                  color: '#fff',
                  borderRadius: 30,
                  textAlign: 'center',
                  margin: 10,
                  display: 'inline-block',
                  padding: '5px 15px'
                }}>
                  Signin using <span style={{border: '1px solid rgba(255,255,255,.8)', borderRadius: 2, color: '#fff', fontWeight: 600, padding: '0 2px'}}>f</span>id
                </div>
              </a>
            }
          </div>}
        </UserContext.Consumer>

        <div style={{flex: 1, height: '100%'}}></div>
        <div
          style={{borderTop: '1px solid #ddd', backgroundColor: '#eefefe'}}
        >
          {
            [
              {
                title: 'FAQ',
                comp: <Faq></Faq>
              }
            ].map((item, idx) => (
              <div key={idx}>
                <TitleStyled onClick={() => {this.setState({activeIdx: activeIdx === idx ? -1 : idx})}}>{item.title}</TitleStyled>
                <div style={{...styles.content, maxHeight: activeIdx === idx ? 'none' : 0, padding: activeIdx === idx ? 10: 0}}>{item.comp}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}


const styles = {
  title: {
    background: '#fff',
    textAlign: 'center',
    padding: 2
  },
  content: {
    background: '#f9f9f9',
    fontSize: 15,
    boxSizing: 'border-box',
    overflow: 'hidden'
  }
}

const TitleStyled = styled.div`
  background: #fff;
  text-align: center;
  padding: 2px;
  :hover {
    cursor: pointer
  }
`
