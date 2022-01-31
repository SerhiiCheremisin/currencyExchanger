import {historyProps} from '../redux/types';

const HistoryComponent = ( {in: inValue, out: outValue, result : resultValue, amount: amountValue}: historyProps):JSX.Element => {

  return(
     <h2>{`You have changed the ${Number(amountValue).toFixed(2)} of ${inValue} to ${resultValue.toFixed(2)} ${outValue}`}</h2>
  )
}

export default HistoryComponent;