import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [timer, setTimer] = useState(``);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
  

  const TimerFunc = () => {
    const time = data?.sys?.sunrise
    const now = Math.floor(Date.now() / 1000);
    const distance = time + 86400 - now; 

    if ((distance <= 21600) && (distance >= 0)) {
      const hours = String(Math.floor((distance % (60 * 60 * 60)) / (60 * 60))).padStart(2, 0);
      const minutes = String(Math.floor((distance % (60 * 60)) / (60))).padStart(2, 0);
      const seconds = String(Math.floor((distance % 60))).padStart(2, 0);
      setTimer(`${hours}:${minutes}:${seconds}`)
    } else {
      setTimer(``)
      return
    };
  }
  setInterval(() => TimerFunc(), 100)

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.ceil((data.main.temp.toFixed() - 32) * 5 / 9)}°C</h1> : null}
            {data.weather ? <img className="weatherIcon" src={`./weatherIcon/${data.weather[0].icon}@2x.png`} alt="icon" /> : null}
            {timer ? <span className="timer"> {`До восхода солнца: ${timer}`}</span> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{Math.ceil((data.main.feels_like.toFixed() - 32) * 5 / 9)}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
