import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import UserProvider from './context/UserProvider';
import TomatoProvider from './context/TomatoProvider';
import { TomatoTaskListProvider } from './context/TomatoTaskList'
import {TomatoTaskListContext} from './context/TomatoTaskList'


let uri = new window.URL(window.location);
let token = uri.searchParams.get('token') || uri.searchParams.get('auth');
if (token !== null) {
  localStorage.setItem('token', token);
  uri.searchParams.delete('token');
  uri.searchParams.delete('auth');  
  window.history.pushState(null, null, uri)
}

ReactDOM.render(
  <UserProvider>
    <TomatoTaskListProvider>
      <TomatoTaskListContext.Consumer>
      {({insertTask}) => (
        <TomatoProvider insertTask={insertTask}>
          <App />
        </TomatoProvider>
        )}
      </TomatoTaskListContext.Consumer>
    </TomatoTaskListProvider>
  </UserProvider>, 
  document.getElementById('root')
);

