import { combineReducers } from "redux";
import apiReducer from '../reducers/apiReducer';
import defaultSymbolsReducer from '../reducers/defaultSymbolsReducer';
import apiComparer from '../reducers/apiComparer';
import historicalRatesReducer from '../reducers/historicalReducer';

const rootReducer = combineReducers ({
    convertingData : apiReducer,
    default: defaultSymbolsReducer,
    compareData: apiComparer,
    historyData: historicalRatesReducer
}) 
export type RootState = ReturnType<typeof rootReducer>
  
export default rootReducer;