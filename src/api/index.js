// import {API} from '../CONST';

// export default {
//   getMe: async () => {
//     return fetch(API.GET_ME, {
//       mode: 'cors',
//       // credentials: "same-origin", 

//       headers: {
//         "Authorization": 'Bearer ' + localStorage.getItem('token'),
//       }
//     })
//   }
// }

import {API} from '../CONST';
import { stringify } from 'querystring';

function buildUrl(url, parameters) {
  let qs = "";
  for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
          const value = parameters[key];
          qs +=
              encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
  }
  if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); //chop off last "&"
      url = url + "?" + qs;
  }

  return url;
}
export let _fetchGET = (url, params) => {
  let token = localStorage.getItem('token');
  if (token === null) {
    throw new Error('Forbiden')
  };
  console.log('_fetchGET', {params})
  return fetch(buildUrl(url, params), {
    mode: 'cors',
    headers: {
      "Authorization": 'Bearer ' + token,
    },
  }).then(res => res.json());
}

export let _fetchPOST = (url, body) => {
  let token = localStorage.getItem('token');
  if (token === null) {
    throw new Error('Forbiden')
  };
  return fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: {
      "Authorization": 'Bearer ' + token,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}

export let _fetchPUT = (url, body) => {
  let token = localStorage.getItem('token');
  if (token === null) {
    throw new Error('Forbiden')
  };
  return fetch(url, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      "Authorization": 'Bearer ' + token,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}

export default {
  getMe: async () => {
    return _fetchGET(API.GET_ME);
  },

  getTomatoTasksLog: async (params) => {
    return _fetchGET(API.TOMATO_WORK_LOG, params);
  }
}