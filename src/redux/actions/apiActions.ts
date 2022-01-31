import { typesAPI } from '../types';

export function getCurrencyConverted (inputCurrency:string, outputCurrency: string, value : string ) {
return {
    type: typesAPI.START_TO_FETCH_CONVERTER,
    input : inputCurrency,
    output: outputCurrency,
    amount: value
}
}

export function getCopmareData (inputCurrency:string, outputCurrency: string, date : string) {
    return {
        type: typesAPI.START_COMPARE_DATA,
        input : inputCurrency,
        output: outputCurrency,
        date
    }
}

export function getHistoryData (inputCurrency:string, dateFrom : string, dateTo : string) {
    return {
        type: typesAPI.START_TO_FETCH_HISTORICAL_RATES,
        input : inputCurrency,
        dateFrom,
        dateTo
    }
}