import { useEffect, useState } from "react"

const ShowCountry = ({message}) => {
  console.log("Sent to ShowCountry:",message)
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
    console.log("weather info:",weatherInfo)
    console.log("temp:",tempInfo)
    temp_icon = weatherInfo[0].weather[0].icon
    console.log("weather Icon:", temp_icon)
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
    console.log("languages:",Object.values(message[0].languages))
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

const App = () => {
  const [ filterName, setFilterName ] = useState("")
  const [ countriesList, setCountriesList ] = useState([])

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => response.json())
      .then(result => setCountriesList(result))
  }, [])

  const country = (name) => {
    console.log("sent to country function:",name)
    setFilterName(name.name.common)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  console.log("filterName:",filterName)
  console.log("CountriesList len:",countriesList.length)
  //console.log("CountriesList Names:",countriesList.map(x => x.name.common))
  

  const countryToShow = (filterName === "")
    ? countriesList
    : countriesList.filter(x => x.name.common.toLowerCase().includes(filterName.toLowerCase()))

  console.log("countryToShow len:", countryToShow.length)

  return (
    <div>
      find countries <input value={filterName} onChange={handleFilter} />
      <div>
        <Countries message={countryToShow} onSmash={country}/>
      </div>
    </div>
  )
}

export default App
