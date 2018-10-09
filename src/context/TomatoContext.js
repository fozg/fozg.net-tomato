import React from 'react';

export const tomato = {
  isRunning: false,
};

const TomatoContext = React.createContext(tomato);

export default TomatoContext;