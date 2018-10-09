import React from 'react';
import styled from 'styled-components';

export default ({isChecked, onChange}) => (
  <CheckBoxWrapStyled
    onClick={() => {onChange(!isChecked)}}
    style={{
      border: '2px solid #009688',
      borderRadius: 6,
      width: 20,
      height: 20,
      display: 'inline-block'
    }}
    className={isChecked ? 'checked' : ''}
  ></CheckBoxWrapStyled>
)

const CheckBoxWrapStyled = styled.div`
  :hover {
    cursor: pointer;
  }
  &.checked {
    border: 2px solid #fff !important;
    background-color: rgb(76, 175, 80);
  }
`

