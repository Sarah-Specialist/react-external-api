import './App.css';
import { useState, useEffect } from 'react'
import { API } from './api/API.js'
import ViewData from './components/ViewData.js'

function App() {
  const blankForm = {
    symbol: "AAPL"
  }

  const stockData = {
    name: '',
    bid: '',
    ask: '',
    earningsDate: ''
  }

  const [formItem, setFormItem] = useState(blankForm);
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState('');

  // Fetch contact data from API
  const apiGetStockDetails = async (symbol) => {
    const {status, data} = await API.get(`/qu/quote?symbol=${symbol}`);
    if (status === 200) {
      console.log('apiGetStockDetails', data);
      const d = data[0];
      const temp = {
        name: d.longName,
        bid: d.bid,
        ask: d.ask,
        earningsDate: d.earningsTimestamp.date.split("")[0]
    }
    setStockData(temp);
    } else {
    console.log('Error')
    }
  }
  // Handler for submit button
  const handleSubmit = async () => {
    console.log('handlerSubmit:');
    setSymbol(formItem.symbol);
  }
  // Handler for input field boxes
  const handleInput = e => {
    const { name, value } = e.target;
    const newItem = {...formItem, [name]: value.toUpperCase()}
    setFormItem(newItem)
  }

  // Load contact list when component is refreshed
  useEffect( () => {
    console.log('App.useEffect')
    if (symbol) {
      apiGetStockDetails(symbol)
    }
  }, [symbol])
  
  return (
    <div className="App container">
      <h1>React CRUD with Axios + API</h1>
      <div className="grouped">
        <label>Stock Symbol</label>
        <input type="text" name="symbol" value={formItem.symbol} onChange={handleInput} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <ViewData data={stockData} />
      </div>
    </div>
  );
}

export default App;
