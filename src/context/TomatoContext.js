import React from 'react';
import {Default_Seconds_To_Run} from '../CONST';

import TomatoTaskLog from '../models/TomatoTaskLog'

export const tomato = {
  isRunning: false,
  taskRunning: new TomatoTaskLog({taskName: ''}),
  secondsRemain: Default_Seconds_To_Run,
  tasksList: []
};

const TomatoContext = React.createContext(tomato);

export default TomatoContext;