import React, { useState, useEffect } from "react";
import axios from "axios";
import Today from "./components/today/Today";
import Search from "./components/search/Search";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [timerSunRise, setTimerSunRise] = useState(``);
  const [timerSunSet, setTimerSunSet] = useState(``);

  const timeRise = data?.sys?.sunrise
  const timeSet = data?.sys?.sunset

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }

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
    <div className="container">
      <Search 
        searchLocation={searchLocation} 
        location={location} 
        setLocation={setLocation}  />
      {Object.values(data).length > 0 ? <Today data={data} timerSunRise={timerSunRise} timerSunSet={timerSunSet} /> : null}
    </div>
  );
}

export default App;
