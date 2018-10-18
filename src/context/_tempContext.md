```js
import React from 'react';

// init 
export const initState = {
  ...
}

// context
export const ComponentContext = React.createContext(tomato);

// provider
export class ComponentProvider extends React.Component {
  state = initState;

  _callbackFunc = () => {
    ...
  }
  
  render () {
   return (
      <ComponentContext.Provider
        value={{
          ...this.state,
          callbackFunc: this._callbackFunc
        }}
      >
        {this.props.children}
      </ComponentContext.Provider>
    )
  }
}
```