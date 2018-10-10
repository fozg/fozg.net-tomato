import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import UserProvider from './context/UserProvider';
import TomatoProvider from './context/TomatoProvider';

let uri = new window.URL(window.location);
if (uri.searchParams.get('token') !== null) {
  localStorage.setItem('token', uri.searchParams.get('token'));
  uri.searchParams.delete('token');
  
  window.history.pushState(null, null, uri)
}

ReactDOM.render(
  <UserProvider>
    <TomatoProvider>
      <App />
    </TomatoProvider>
  </UserProvider>, 
  document.getElementById('root')
);

