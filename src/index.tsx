import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux/Store';
import NavigationBar from './components/NavigationBar';
import ComparisonPage from './pages/ComparisonPage';
import HistoricalRatesPage from './pages/HistoricalRatesPage';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
   <BrowserRouter> 
   <NavigationBar/>
   <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/comparison" element={<ComparisonPage />}/>
          <Route path="/history" element={<HistoricalRatesPage />}/>
    </Routes>
   </BrowserRouter>
  </Provider>
  </React.StrictMode>
 ,
  document.getElementById('root')
);

