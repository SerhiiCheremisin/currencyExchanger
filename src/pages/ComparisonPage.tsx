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
import { getCopmareData } from '../redux/actions/apiActions';

const useStyles = makeStyles({
  root: {
   display: 'flex',
   justifyContent: 'center',
   width: '100%',
   height: '90vh',
   padding: '5% 10%',
   gap: '20px',
  },
  input : {
      width: '200px',
      height: '50px'
  }
})

const ComparisonPage = ():JSX.Element => {
const classes = useStyles();
const dispatch = useDispatch();

const [defaultStateSymbol, setDefaultStateSymbol] = useState<string[]>([]);
const [currentCurrency, setCurrentCurrency] = useState<string>('');
const [outputCurrency, setOutputCurrency] = useState<string>('');
const [date, setDate] = useState<Date | any>(null);

const defaultSymbols = useSelector((state:RootState) => state.default.symbols); 
const isDefaultReady = useSelector((state:RootState) => state.default.success);
const result = useSelector((state:RootState) => state.compareData.result);

useEffect(() => {
    if(isDefaultReady) {
        const tempArrat = []
      for (const [key,values] of Object.entries(defaultSymbols)){
       tempArrat.push(key)
      }
      setDefaultStateSymbol(tempArrat)
    }
   },[defaultSymbols])

const searchCurrencyRateDepensOnDate = () => {
    if (date === null || currentCurrency === '' || outputCurrency === ''){
        alert('All fields should be filled')
    }
    const rightData = date.toISOString().split('T')[0];
    dispatch(getCopmareData(currentCurrency, outputCurrency , rightData))
}

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
             <LocalizationProvider dateAdapter={AdapterDateFns}>
             <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={(e) => setDate(e)}
              renderInput={(params) => <TextField {...params} />}
             />
             </LocalizationProvider>
        <Button onClick={searchCurrencyRateDepensOnDate} sx={{height: '50px'}} variant="contained">Search</Button>
         <Input sx={{height: '50px'}}  error value={result} />
       </Box>
    )
}
   export default ComparisonPage;