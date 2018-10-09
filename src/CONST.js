
let isDevelopment = process.env.NODE_ENV === 'development';

export const SIGN_IN_LINK = isDevelopment ? 'http://localhost:3333/signin' : 'https://accounts.fozg.net/signin';
export const SIGN_OUT_LINK = isDevelopment ? 'http://localhost:3333/signout' : 'https://accounts.fozg.net/signout';
export const CONTINUTE_URL = isDevelopment ? 'http://localhost:3000/' : 'https://fozg.net/tomato';

export const API = {
  GET_ME: isDevelopment ? 'http://localhost:3333/api/me' : 'https://accounts.fozg.net/api/me',
  TOMATO_WORK_LOG: isDevelopment ? 'http://localhost:3301/api/worklog': null
}