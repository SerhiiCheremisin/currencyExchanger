import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from '../redux/reducers/rootReducer';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Loader from './Loader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { getCurrencyConverted } from '../redux/actions/apiActions';
import HistoryComponent from '../components/HistoryComponent';
import { historyProps } from '../redux/types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    gap: '10px',
    flexDirection: 'column',
  },
  form : {
    width: '100%',
    display: 'flex',
    gap: '10px',
  },
  currencyInputs: {
    width: '250px'
  },
})
const Currency = ():JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //local state
    const [defaultStateSymbol, setDefaultStateSymbol] = useState<string[]>([]);
    const [inputCurrency, setInputCurrency] = useState<string>('');
    const [outputCurrency, setOutputCurrency] = useState<string>('');
    const [currencyCount, setCurrencyCount] = useState<string>('');
    const [historyOfExchange, setHistoryOfExchange] = useState<object[]>([])
  // global state
    const defaultSymbols = useSelector((state:RootState) => state.default.symbols); 
    const isDefaultReady = useSelector((state:RootState) => state.default.success);
    const resultOfConvertation  = useSelector((state:RootState) => state.convertingData.result);
  
    useEffect(() => {
    const valuesHistoryStorage: any = localStorage.getItem('currencyHistory');
     if (valuesHistoryStorage){
     setHistoryOfExchange(JSON.parse(valuesHistoryStorage));
     }
    },[])

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
      if (inputCurrency === '' || outputCurrency === '' || currencyCount === ''){
        return
      }
        const storageItem:historyProps = {
          in : inputCurrency,
          out : outputCurrency,
          amount: currencyCount,
          result : resultOfConvertation,
        }
        const copyOfState: object[] = historyOfExchange.slice();
        copyOfState.push(storageItem);
        localStorage.setItem('currencyHistory', JSON.stringify(copyOfState))
        setHistoryOfExchange(copyOfState)
    },[resultOfConvertation])

    const formHandler = (e:React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     const reg = new RegExp('^[0-9]+$');
     if(inputCurrency === '' || outputCurrency === '' ){
       alert('All fields should be filled')
     }
     dispatch(getCurrencyConverted(inputCurrency,outputCurrency,currencyCount));
    }
   

    const onChangeHandler = (e: React.ChangeEvent<{ value: string }>) => {
      if (!Number(e.target.value)) {
           alert('Numbers only')
           return
      }     
      setCurrencyCount(e.target.value)
    }


    return(
        <Box className={classes.root}>
          { !isDefaultReady && <Loader/> }
          { isDefaultReady && 
          <form className={classes.form} onSubmit={(e) => formHandler(e)}>
         
        <InputLabel id="Input currency">Input currency</InputLabel>
        <Select
        className={classes.currencyInputs}
          labelId="Input"
          id="Input currency"
          value={inputCurrency}
          label="Input currency"
          onChange={(e) => setInputCurrency(e.target.value)}
        >
          {defaultStateSymbol.map((item:string, id:number) => (
            <MenuItem key={id} value={item}>{item}</MenuItem>
          ))}
        </Select>
       
        <Input placeholder="Number of currency" 
        value={currencyCount}
        onChange={(e) => onChangeHandler(e)}
        />
       
        <InputLabel id="Output currency">Output currency</InputLabel>
        <Select
          className={classes.currencyInputs}
          labelId="Output currency"
          id="Output currency"
          value={outputCurrency}
          label="Output currency"
          onChange={(e) => setOutputCurrency(e.target.value)}
        >
          {defaultStateSymbol.map((item:string, id:number) => (
            <MenuItem key={id} value={item}>{item}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" type='submit'>Convert</Button>
        <Input sx={{width: '150px'}} error value={resultOfConvertation.toFixed(2)} />
          </form>
          }
         <Box>
           {historyOfExchange ? historyOfExchange.map((item:any, id:number) =>{
             return (
              <HistoryComponent
                key = {id}
                in = {item.in}
                out = {item.out}
                amount = {item.amount}
                result = {item.result}
              />
             )
           })
           :
           <h2 >You have no history of convetations yet</h2> 
           }
         </Box>
        </Box>
    )
}

export default Currency;