import { type } from 'os';
import { typesAPI, currencyRespond, fetchTypes } from '../types';

const initState: currencyRespond = {
  motd: {
    msg: "",
    url: "",
    },
    success: false,
    query: {
    from: "",
    to: "",
    amount: 0,
    },
    info: {
    rate: 0
    },
    historical: false,
    date: "",
    result: 0,
}

const apiReducer = (state = initState, action:fetchTypes):currencyRespond => {
  switch (action.type) {
    case typesAPI.GET_CONVERT_DATA : {
       return state = { ...state,
        ...action.payload
       }
    } 
   default: return state
  }
}

export default apiReducer;