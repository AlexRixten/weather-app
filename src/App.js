import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [timerSunRise, setTimerSunRise] = useState(``);
  const [timerSunSet, setTimerSunSet] = useState(``);

  const icon = data.weather ? require(`../src/assets/weatherIcon/${data.weather[0].icon}@2x.png`) : null



  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }

  const timeRise = data?.sys?.sunrise
  const timeSet = data?.sys?.sunset



  const TimerFunc = (time, setTimer) => {
    const now = Math.floor(Date.now() / 1000);
    let distance = time - now;
    if (distance < 0) {
      distance += 86400
    }

    if (distance >= 0) {
      const hours = String(Math.floor((distance % (60 * 60 * 60)) / (60 * 60))).padStart(2, 0);
      const minutes = String(Math.floor((distance % (60 * 60)) / (60))).padStart(2, 0);
      const seconds = String(Math.floor((distance % 60))).padStart(2, 0);
      setTimer(`${hours}:${minutes}:${seconds}`)
    } else {
      setTimer(``)
      return
    };
  }
  useEffect(() => {
    const timerSet = setInterval(() => TimerFunc(timeSet, setTimerSunSet), 1000);
    return () => clearInterval(timerSet);
  });


  useEffect(() => {
    const timerRise = setInterval(() => TimerFunc(timeRise, setTimerSunRise), 1000);
    return () => clearInterval(timerRise);
  });

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
            <div className="num">
              {data.main ? <h1>{Math.ceil((data.main.temp.toFixed() - 32) * 5 / 9)}°C</h1> : null}
              {data.weather ? <img className="weatherIcon" src={icon} alt="icon" /> : null}
            </div>
            {timerSunRise ? <p className="timer bold"> {`До восхода солнца: ${timerSunRise}`}</p> : null}
            {timerSunSet ? <p className="timer bold"> {`До заката солнца: ${timerSunSet}`}</p> : null}

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
