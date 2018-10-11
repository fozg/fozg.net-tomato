import React from 'react';
import styled from 'styled-components'


export default class Navigation extends React.Component {
  
  // #dc3545 Tomato color
  render() {
    return (
      <div
        style={{background: '#343a40', height: '100%'}}
      >
         <div style={{padding: 10, fontWeight: 600, color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,.4)'}}>
            <img src='favicon.png' alt="TomatoWorks" width="50px" />
            TomatoWorks
          </div>
        <div>
          <Link className="active">🍅My Tomato</Link>
        </div>
        <div>
          <Link>📚Projects</Link>
        </div>
      </div>
    )
  }
}

const Link = styled.a`
  padding: 5px 10px;
  display: block;
  color: rgba(255,255,255,.6) !important;
  cursor: pointer;
  
  &.active{
    background-color: rgba(0,0,0,.2);
  }
  :hover{
    background-color: rgba(0,0,0,.4);    
  }

`