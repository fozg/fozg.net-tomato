import React from 'react';

export const user = {
  isLogined: false,
  user: {
    username: ''
  }
};

const UserContext = React.createContext(
  user
)

export default UserContext;