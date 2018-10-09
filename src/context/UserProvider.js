import React from 'react';
import UserContext, {user} from './UserContext';

import api from '../api';

export default class UserProvider extends React.Component {
  state = user;

  _onLoginSuccess = (u) => {
    this.setState({
      isLogined: true,
      user: u
    })
  }

  componentDidMount () {
    api.getMe().then(res => {
      console.log(res)
      this.setState({isLogined: true, user: res})
    }).catch(() => {
      this.setState({isLogined: false, user: {username: null}})
    })
  }

  render () {
   return (
      <UserContext.Provider
        value={{
          ...this.state,
          onLoginSuccess: this._onLoginSuccess
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}