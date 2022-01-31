import { defaultSymbol, fetchTypes, typesAPI} from '../types';

const initState:defaultSymbol = {
    motd: {
        msg: '',
        url: '',
    },
    success: false,
    symbols: {}
}

const defaultSymbolsReducer = (state = initState, action: fetchTypes): defaultSymbol => {
  switch(action.type) {
   case typesAPI.GET_DEFAULT_DATA : {
       return state = {...state, ...action.payload}
   }
    default: return state
  }
  
}

export default defaultSymbolsReducer;