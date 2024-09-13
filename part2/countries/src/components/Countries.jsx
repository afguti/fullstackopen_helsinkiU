import { useEffect, useState } from "react"

const ShowCountry = ({message}) => {
  const capital = message.capital[0]
  const country_code = message.cca2.toLowerCase()
  const api_key = import.meta.env.VITE_SOME_KEY
  const [ weatherInfo, setWeatherInfo ] = useState([])
  var tempInfo = 0
  var temp_icon = ""
  var temp_wind = ""
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${country_code}&APPID=${api_key}`)
      .then(response => response.json())
      .then(result => setWeatherInfo([].concat(result)))
  }, [])
  if (weatherInfo.length > 0) {
    tempInfo = (Number(weatherInfo[0].main.temp)-273.15).toFixed(2)
    temp_icon = weatherInfo[0].weather[0].icon
    temp_wind = weatherInfo[0].wind.speed
  }
  return (
    <>
      <h1>{message.name.common}</h1>
      <p>capital {message.capital}</p>
      <p>area {message.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(message.languages).map(x => <li key={x}>{x}</li>)}
      </ul>
      <p>
        <img src={message.flags.png} width="220" height="150" />
      </p>
      <h2>Weather in {message.capital}</h2>
      <p>temperature {tempInfo} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${temp_icon}@2x.png`} />
      <p>wind {temp_wind} m/s</p>
    </>
  )
}
  
const Countries = ({message, onSmash}) => {
  if (message.length > 10) {
    return ( <>Too many matches, specify another filter</> )
  } else if (message.length === 1) {
    return (
      <ShowCountry message={message[0]} />
    )
  } else {
    return ( <>{message.map(x => <p key={x.name.common}>
      {x.name.common}
      <button onClick={() => onSmash(x)}>show</button>
      </p>)}</> )
  }
}

export default Countries