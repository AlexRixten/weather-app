import React from 'react'
import './today.css'

export default function Today(props) {
  const now = new Date().toLocaleString()
  const icon = props.data.weather ? require(`../../assets/weatherIcon/${props.data.weather[0].icon}@2x.png`) : null
  return (
    <div className='today'>
      <span className="timeNow">{now}</span>
      <h1 className="location">{props.data?.name}, {props.data?.sys.country}</h1>
      <div className="temp">
        <div className="tempInfo">
          <img className='tempIcon' src={icon} alt="icon" />
          <h4 className="tempC">{Math.ceil((props.data.main?.temp.toFixed() - 32) * 5 / 9)}°C</h4>
        </div>
        {props.data.main ? <p className='bold'>Feels Like {Math.ceil((props.data.main.feels_like.toFixed() - 32) * 5 / 9)}°C</p> : null}
      </div>
      <div className="info">
        <div className="infoLeft">
          <span className="infoLeftWind"> {props.data.wind.speed} m/s</span>
          <span className="infoLeftHumidity">Humidity: {props.data.main?.humidity}%</span>
          <span className="infoLeftPoint">Dew point: 9°C</span>
        </div>
        <div className="infoRight">
          <span className="infoRighthPa">{props.data.main.pressure}hPa</span>
          <span className="infoRightUV">UV: 2</span>
          <span className="infoRightVisibility">Visibility: {Math.ceil(props.data.visibility) / 1000}km</span>
        </div>
      </div>
      <p className="timer bold"> {`До восхода солнца: ${props.timerSunRise}`}</p>
      <p className="timer bold"> {`До заката солнца: ${props.timerSunSet}`}</p>

    </div>
  )
}