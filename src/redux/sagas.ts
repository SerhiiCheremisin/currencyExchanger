import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { typesAPI } from '../redux/types';

let inputValue:string;
let outputValue:string;
let amount:number;
let date:string;
let dateFrom:string;
let dateTo:string;

 async function getDefault () {
    try {
      const request = await fetch('https://api.exchangerate.host/symbols');  
      const respond = await request.json();
      return respond
    } 
    catch (error) {
        console.log(error)
    }
}

async function getCurrencyConverted() {
  try{
    const request = await fetch(`https://api.exchangerate.host/convert?amount=${amount}?from=${inputValue}&to=${outputValue}`);  
    const respond = await request.json();
    return respond
  }
  catch(error){
    console.log(error)
  }
}

async function getCompareCurrency() {
  try{
    const request = await fetch(`https://api.exchangerate.host/convert?from=${inputValue}&to=${outputValue}&${date}`);  
    const respond = await request.json();
    return respond
  }
  catch(error){
    console.log(error)
  }
}

async function getHistoricalRates() {
  try{
    const request = await fetch(`https://api.exchangerate.host/timeseries?start_date=${dateFrom}&end_date=${dateTo}&base=${inputValue}`);  
    const respond = await request.json();
    return respond
  }
  catch(error){
    console.log(error)
  }
}

export function* rootSaga () {
    yield apiWatcher()
  }

 function* apiWatcher () {
    yield takeEvery(typesAPI.GET_DEFAULT_DATA, apiWorker);
    yield takeEvery(typesAPI.START_TO_FETCH_CONVERTER, apiGetConvertedValue);
    yield takeEvery(typesAPI.START_COMPARE_DATA, apiGetCompareCurrency);
    yield takeEvery(typesAPI.START_TO_FETCH_HISTORICAL_RATES, apiGetHistoricalRates);
 }

 function* apiWorker ():object {
   const state = yield call(getDefault)
   yield put({type:typesAPI.GET_DEFAULT_DATA, payload:state})
 }

 function* apiGetConvertedValue ({...payload}):object {
 inputValue = payload.input;
 outputValue = payload.output;
 amount = payload.amount;
 const newState = yield call(getCurrencyConverted) 
 yield put({type:typesAPI.GET_CONVERT_DATA, payload : newState})
 }

function* apiGetCompareCurrency({...payload}):object{
  inputValue = payload.input;
  outputValue = payload.output;
  date = payload.output;
  const newState = yield call(getCompareCurrency)
  yield put({type: typesAPI.FETCH_COMPARED_DATA, payload : newState})
} 

function* apiGetHistoricalRates({...payload}):object {
  inputValue = payload.input;
  dateFrom  = payload.dateFrom;
  dateTo = payload.dateTo;
  const newState = yield call(getHistoricalRates)
  yield put({type: typesAPI.FETCH_HISTORICAL_RATES_DATA, payload : newState})
}
  