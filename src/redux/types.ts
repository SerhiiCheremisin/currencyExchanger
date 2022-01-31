
export enum typesAPI {
    GET_CONVERT_DATA = 'GET_CONVERT_DATA',
    DATA_IS_LOADING = 'DATA_IS_LOADING',
    DATA_HAS_ERROR = 'DATA_HAS_ERROR',
    GET_DEFAULT_DATA = 'GET_DEFAULT_DATA',
    START_TO_FETCH_CONVERTER = 'START_TO_FETCH_CONVERTER',
    START_COMPARE_DATA = 'START_COMPARE_DATA',
    FETCH_COMPARED_DATA = 'FETCH_COMPARED_DATA',
    FETCH_HISTORICAL_RATES_DATA = 'FETCH_HISTORICAL_RATES_DATA',
    START_TO_FETCH_HISTORICAL_RATES = 'START_TO_FETCH_HISTORICAL_RATES'
}


interface motd {
    msg: string,
    url: string,
}
interface query {
    from: string,
    to: string,
    amount: number,
}
interface info {
    rate: number
}

export interface currencyRespond {
    motd: motd,
    success: boolean,
    query: query,
    info: info,
    historical: boolean,
    date: string,
    result: number,
}

export interface defaultSymbol {
    motd: motd,
    success: boolean,
    symbols: {}
}


interface defaultFetch {
    type: typesAPI.GET_DEFAULT_DATA,
    payload: defaultSymbol
}

export interface convertedFetch {
    type: typesAPI.GET_CONVERT_DATA,
    payload: currencyRespond
}

export interface compareFetch {
    type: typesAPI.FETCH_COMPARED_DATA,
    payload: currencyRespond
}

export interface historicalFetch {
   type: typesAPI.FETCH_HISTORICAL_RATES_DATA,
   payload: historicalRates
}

export type fetchTypes = defaultFetch | convertedFetch | compareFetch | historicalFetch

export interface historyProps {
    in: string,
    out: string,
    amount: string,
    result: number
}

export interface historicalRates {
    motd: motd
    success: boolean,
    timeseries: boolean,
    base: string,
    start_date: string,
    end_date: string,
    rates: {}
}