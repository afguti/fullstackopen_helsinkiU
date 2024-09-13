import { useEffect, useState } from "react"
import Countries from "./components/Countries"

const App = () => {
  const [ filterName, setFilterName ] = useState("")
  const [ countriesList, setCountriesList ] = useState([])

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => response.json())
      .then(result => setCountriesList(result))
  }, [])

  const country = (name) => {
    setFilterName(name.name.common)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const countryToShow = (filterName === "")
    ? countriesList
    : countriesList.filter(x => x.name.common.toLowerCase().includes(filterName.toLowerCase()))

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
