import React from 'react';
import styled from 'styled-components'

import Faq from './FAQ';


export default class RightPanel extends React.Component {
  state = {
    activeIdx: -1,
  }
 
  render () {
    const {activeIdx} = this.state;

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', height: '100%', backgroundColor: '#f5f5f5'}}>
        <div style={{flex: 1, height: '100%'}}></div>
        <div
          style={{borderTop: '1px solid #ddd', backgroundColor: '#eefefe',}}
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
