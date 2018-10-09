import React from 'react';

import {SIGN_OUT_LINK} from '../CONST';

export default class Signout extends React.Component {
  state = {
    isShowIframeLogout: false
  }

  _onSignOutAllSuccess = () => {
    this.setState({isLoading: false, isShowIframeLogout: false})
  }

  _onClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.setState({isShowIframeLogout: true})
  }
  render () {
    const {isShowIframeLogout} = this.state;

    return (
      <div style={{display: 'inline-block'}}>
        (<a href="#"
          onClick={this._onClick}
        >signout</a>)
        {isShowIframeLogout && <iframe src={SIGN_OUT_LINK} onLoad={this._onSignOutAllSuccess} style={{display: 'none'}} />}
      </div>
    )
  }
}