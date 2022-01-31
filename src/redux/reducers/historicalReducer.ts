import { fetchTypes, historicalRates, typesAPI } from '../types';


const initState:historicalRates = {
    motd: {
        msg: '',
        url: '',
    },
    success: false,
    timeseries: false,
    base: '',
    start_date: '',
    end_date: '',
    rates: {}
}

const historicalRatesReducer = (state = initState, action:fetchTypes):historicalRates => {
   
    switch(action.type) {
        case typesAPI.FETCH_HISTORICAL_RATES_DATA :
            return state = {...state, ...action.payload}
        default: return state
    }

}

export default historicalRatesReducer;