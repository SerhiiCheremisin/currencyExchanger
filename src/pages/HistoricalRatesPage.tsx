import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RootState } from '../redux/reducers/rootReducer';
import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { getHistoryData } from '../redux/actions/apiActions';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '5% 10%',
        flexDirection: 'column',
        gap: '15px',
    },
    input : {
        width: '200px',
        height: '50px'
    }
})


const HistoricalRatesPage = ():JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [defaultStateSymbol, setDefaultStateSymbol] = useState<string[]>([]);
    const [currentCurrency, setCurrentCurrency] = useState<string>('');
    const [outputCurrency, setOutputCurrency] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<Date | any>(null);
    const [dateTo, setDateTo] = useState<Date | any>(null);

    const defaultSymbols = useSelector((state:RootState) => state.default.symbols); 
    const isDefaultReady = useSelector((state:RootState) => state.default.success);
    const historicalRateSuccess = useSelector((state:RootState) => state.historyData.success);
    const history = useSelector((state:RootState) => state.historyData);
    const rates = useSelector((state:RootState) => state.historyData.rates);
    const [ratesValue, setRatesValue] = useState<object[]>([]);
    const endDate = useSelector((state:RootState) => state.historyData.end_date);
    const startDate = useSelector((state:RootState) => state.historyData.start_date);
    const base = useSelector((state:RootState) => state.historyData.base);
    
    useEffect(() => {
        if(isDefaultReady) {
            const tempArrat = []
          for (const [key,values] of Object.entries(defaultSymbols)){
           tempArrat.push(key)
          }
          setDefaultStateSymbol(tempArrat)
        }
       },[defaultSymbols])

       useEffect(() => {
        if(historicalRateSuccess) {
             const newState = []
           for (const [item,value] of Object.entries(rates)){
               const tempObject = {
                item, value
               }
              newState.push(tempObject)
           }  
           setRatesValue(newState);
        }
       }, [historicalRateSuccess, base, endDate, startDate])

       const searchCurrencyRateDepensOnDate = () => {
        if (dateFrom === null || dateTo === null || currentCurrency === '' || outputCurrency === ''){
            alert('All fields should be filled')
        }
        const dateFromValue = dateFrom.toISOString().split('T')[0];
        const dateToValue = dateTo.toISOString().split('T')[0];
        dispatch(getHistoryData(currentCurrency, dateFromValue , dateToValue))
      }
       
      useEffect(() => {

      },)


    return(
        <Box className={classes.root}>
          <InputLabel id="demo-simple-select-label">Input Currency</InputLabel>
              <Select 
                className={classes.input}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentCurrency}
                label="Currency"
                onChange={(e) => setCurrentCurrency(e.target.value)}
              >
                 {defaultStateSymbol.map((item:string, id:number) => (
                   <MenuItem key={id} value={item}>{item}</MenuItem>
                  ))}
             </Select>
             <InputLabel id="demo-simple-select-label">Output Currency</InputLabel>
              <Select 
                className={classes.input}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={outputCurrency}
                label="Out Currency"
                onChange={(e) => setOutputCurrency(e.target.value)}
              >
                 {defaultStateSymbol.map((item:string, id:number) => (
                   <MenuItem key={id} value={item}>{item}</MenuItem>
                  ))}
             </Select>
             <InputLabel>Start date</InputLabel>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
             <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={dateFrom}
              onChange={(e) => setDateFrom(e)}
              renderInput={(params) => <TextField {...params} />}
             />
             </LocalizationProvider>
             <InputLabel>End date</InputLabel>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
             <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={dateTo}
              onChange={(e) => setDateTo(e)}
              renderInput={(params) => <TextField {...params} />}
             />
             </LocalizationProvider>
        <Button onClick={searchCurrencyRateDepensOnDate} sx={{height: '50px'}} variant="contained">Search</Button>
              {rates ?
               ratesValue.map((el:any, id:number) => {
                   return(
                    <h2 key = {id}>{`Date: ${el.item}, currency is : ${el.value[outputCurrency]}`}</h2>
                   )
               })
               : 
               <h2>No history for now</h2>}
       </Box>
    )
}
   export default HistoricalRatesPage;