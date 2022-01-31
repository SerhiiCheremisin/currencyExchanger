import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  
})

const NavigationBar = ():JSX.Element => {
  const classes = useStyles();
 return(
     <Box sx={{width: '100%', height: '5vh', display: 'flex', justifyContent: 'center'}}>
      <nav>
       <ul className={classes.root}>
         <li><Link to="/">Currency conversion page</Link></li>
         <li><Link to="/comparison">Historical rates page</Link></li>
         <li><Link to="/history">Comparison page</Link></li>
      </ul>
      </nav>
     </Box>
 )
}

export default NavigationBar;