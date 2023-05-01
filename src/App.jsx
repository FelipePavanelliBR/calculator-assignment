import { useState } from 'react'
import DigitButton from './components/digitButton'
import OperatorButton from './components/operatorButton'
import './App.css'

function App() {
  const [result, setResult] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [operator, setOperator] = useState('');
  const [newCalc, setNewCalc] = useState(true);
  const [history, setHistory] = useState([]);

  const operators=['+', '-', '/', '*', '%'];
  const digits=[1,2,3,4,5,6,7,8,9,0];

  const onDigitPress = (digit) => {
    if(newCalc){
      setResult((prev) => prev * 10 + digit);
    }
    else {
      setNextNumber((prev) => prev * 10 + digit)
    }
  }

  const onOperatorPress = (operator) => {
    setNewCalc(false);
    setOperator(operator);
  };

  const updateHistory= (number) => {
    setHistory((history)=> [...history, number]);
  };

  const calcResult = (prev) => {
    switch(operator){
      case '+': 
        return prev + nextNumber;
      case '-': 
        return prev - nextNumber;
      case '/': 
        return prev / nextNumber;
      case '*': 
        return prev * nextNumber;
      case '%':
        return prev % nextNumber;
      default: 
        return prev;
  }  
  }
  const onEqualsPress = (event) => {
    const calculatedResult = calcResult(result);
    setResult(calculatedResult);
    setOperator('');
    setNextNumber(null);
    updateHistory(calculatedResult);
  };

  const handleClearPress = () => {
    setResult(null);
    setNewCalc(true); 
    setNextNumber(null);
    setOperator('');
  }

  const handleInversePress = () => {
    console.log("here", nextNumber)
    if (nextNumber != null) {
          setNextNumber(nextNumber*(-1));
    } else {
      setNextNumber(result*(-1));
    }
  }

  const renderHistory = history.map((item, index) => 
    <div key={index}>{item}</div>
  );

  return (
    <>
      <h2>{nextNumber != null ? nextNumber : result ?? 0}</h2>
      <div className="buttons-container">
        <div className="digits-container">
          {
            digits.map((digit) => {
              return(
                <DigitButton key={digit} digit={digit} onClick={onDigitPress} />
              )
            })
          }
        </div>
        <div className="operators-container">
          {
            operators.map((operator) => {
              return(
                <OperatorButton key={operator} operator={operator} onClick={onOperatorPress}/>
              )
            })
          }
          <button className="equals-button" onClick={onEqualsPress}>=</button>
          <button className="clear-button" onClick={handleClearPress}>Clear</button>
          <button className="equals-button" onClick={handleInversePress}>+/-</button>
        </div>
      </div>
      <div className='history-container'>
        <p id="previous">Previous values:</p>
        {renderHistory}
      </div>
    </>
  )
}

export default App
