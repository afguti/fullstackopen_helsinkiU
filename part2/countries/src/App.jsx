import { useEffect, useState } from "react"

const ShowCountry = ({message}) => {
  console.log("Sent to ShowCountry:",message)
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
