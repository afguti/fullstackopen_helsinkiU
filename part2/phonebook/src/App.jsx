import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import namePersons from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    namePersons
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    const names = persons.map(x => x.name)
    if (names.find(x => x === newName) !== undefined) {
      alert(newName + " is already added to phonebook")
    } else {
      namePersons
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
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