import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(x => x.name)
    if (names.find(x => x === newName) !== undefined) {
      alert(newName + " is already added to phonebook")
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } 
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setfilterName(event.target.value)
  }

  const numbersToShow = (filterName === "")
    ? persons
    : persons.filter(x => x.name.toLowerCase().includes(filterName.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm name={newName} handlename={handleNameAdd}
        number={newNumber} handlenumber={handleNumberAdd}
        add={addName} />
      <h2>Numbers</h2>
      <Persons names={numbersToShow} />
    </div>
  )
}

export default App