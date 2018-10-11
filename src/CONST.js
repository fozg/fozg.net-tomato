
let isDevelopment = process.env.NODE_ENV === 'development';

export const Default_Seconds_To_Run = (isDevelopment ? 1 : 25) * 60; // 25 minutes * 60 seconds

export const SIGN_IN_LINK = isDevelopment ? 'http://localhost:3333/signin' : 'https://accounts.fozg.net/signin';
export const SIGN_OUT_LINK = isDevelopment ? 'http://localhost:3333/signout' : 'https://accounts.fozg.net/signout';
export const CONTINUTE_URL = isDevelopment ? 'http://localhost:3000/' : 'https://fozg.net/tomato';

const API_SERVER = isDevelopment ? 'http://localhost:3301/api' : 'https://fozg.net/tomato/api/'

export const API = {
  GET_ME: isDevelopment ? 'http://localhost:3333/api/me' : 'https://accounts.fozg.net/api/me',
  TOMATO_WORK_LOG: API_SERVER + '/worklog'
}