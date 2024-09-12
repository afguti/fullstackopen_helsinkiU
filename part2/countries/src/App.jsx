import { useEffect, useState } from "react"

const Countries = ({message}) => {
  if (message.length > 10) {
    return ( <>Too many matches, specify another filter</> )
  } else if (message.length === 1) {
    console.log("languages:",Object.values(message[0].languages))
    return (
      <>
        <h1>{message.map(x => x.name.common)}</h1>
        <p>capital {message.map(x => x.capital)}</p>
        <p>area {message.map(x => x.area)}</p>
        <h3>languages:</h3>
        <lu>
          {Object.values(message[0].languages).map(x => <li>{x}</li>)}
        </lu>
        <p>
          <img src={message.map(x => x.flags.png)} width="220" height="150" />
        </p>       
      </>
    )
  } else {
    return ( <>{message.map(x => <p key={x.name.common}>{x.name.common}</p>)}</> )
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

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  console.log("filterName:",filterName)
  console.log("CountriesList len:",countriesList.length)
  console.log("CountriesList Names:",countriesList.map(x => x.name.common))

  const countryToShow = (filterName === "")
    ? countriesList
    : countriesList.filter(x => x.name.common.toLowerCase().includes(filterName.toLowerCase()))

  console.log("countryToShow len:", countryToShow.length)

  return (
    <div>
      find countries <input value={filterName} onChange={handleFilter} />
      <div>
        <Countries message={countryToShow} />
      </div>
    </div>
  )
}

export default App
