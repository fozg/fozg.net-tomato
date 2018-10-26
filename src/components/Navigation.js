import React from 'react';
import styled from 'styled-components'


export default class Navigation extends React.Component {
  
  // #dc3545 Tomato color
  render() {
    return (
      <div
        style={{background: '#fafafa', height: '100%', borderRight: '1px solid #e6e6e6'}}
      >
         
        <div>
          <Link className="active">🍅 My Tomato</Link>
        </div>
        <div>
          <Link>📚 Projects</Link>
        </div>
      </div>
    )
  }
}

const Link = styled.a`
  padding: 8px 10px;
  display: block;
  cursor: pointer;
  font-size: 1em;
  
  &.active{
    background-color: rgba(0,0,0,.08);
    color: #dc5858 !important;
    font-weight: 600;
  }
  :hover{
    background-color: rgba(0,0,0,.05);
    
  }

`