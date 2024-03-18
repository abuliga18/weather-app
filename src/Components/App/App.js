import React, {useState} from 'react';
import './App.css';
import WeatherApp from '../WeatherApp/WeatherApp'

function App() {

  let api_key = "6858f7481cea9cb16dc31fe09ba88792"; 

  const [city, setCity] = useState('')

  return (
    <div className='container'>
      <WeatherApp />
    </div>
  );
}

export default App;
