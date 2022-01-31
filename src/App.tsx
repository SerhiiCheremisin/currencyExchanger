import React, { useEffect } from 'react';
import './styleReset.css';
import {typesAPI} from './redux/types';
import { useDispatch } from 'react-redux';
//Components
import Loader from './components/Loader';
import Currency from './components/Currency';
//material UI
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  mainBlock : {
   display : 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100vh',
   padding: '3% 10%'
  },
  currencyChoser: {

  }
})

function App():JSX.Element {

  const dispatch = useDispatch();  
  const classes = useStyles();
  useEffect(() => {
    dispatch({type:typesAPI.GET_DEFAULT_DATA})

  },[])
  

  return (
    <Box className={classes.mainBlock}>
      <Box className={classes.currencyChoser}>
        <Currency/>
      </Box>
    </Box>
  );
}

export default App;
