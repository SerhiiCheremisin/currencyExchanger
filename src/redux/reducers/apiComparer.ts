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

const apiComparer = (state = initState, action:fetchTypes ):currencyRespond => {
   switch(action.type){
       case typesAPI.FETCH_COMPARED_DATA : {
        return state = { ...state,
            ...action.payload
           }
       }
       default: return state
   }
    
}

export default apiComparer;