import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: '39-44-53523523' },
    { name: 'Angel Gutierrez',number: '0801856192'},
    { name: 'Hitomi Kobayashi',number: '123456'},
    { name: 'Ramiro Velasco', number: '76158245'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked:",event.target);
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(x => x.name)
    console.log("array to compare names:",names)
    console.log("newName var in addName:",newName)
    if (names.find(x => x === newName) !== undefined) {
      alert(newName + " is already added to phonebook")
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    } 
  }

  console.log("PERSONS:",persons)
  console.log("FILTER NAME:",filterName)

  const handleNameAdd = (event) => {
    console.log('event target value:',event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setfilterName(event.target.value)
    console.log("filter handler:",event.target.value)
    console.log("to lowercase:",event.target.value.toLowerCase())
    console.log("filter name:",filterName)
    console.log("persons:",persons)
  }

  const numbersToShow = (filterName === "")
    ? persons
    : persons.filter(x => x.name.toLowerCase().includes(filterName.toLocaleLowerCase()))
    console.log("numbersToShow:",numbersToShow)

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={filterName} onChange={handleFilter} />
        </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameAdd} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberAdd} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbersToShow.map(x => <p key={x.name}>{x.name} {x.number}</p>)}
    </div>
  )
}

export default App