import { useState } from 'react'

const Filter = ({value,onChange}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>  
  )
}

const PersonForm = ({name,handlename,number,handlenumber,add}) => {
  return (
    <form onSubmit={add}>
    <div>
      name: <input value={name} onChange={handlename} />
    </div>
    <div>
      number: <input value={number} onChange={handlenumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({names}) => {
  return (
    <>
      {names.map(x => <p key={x.name}>{x.name} {x.number}</p>)}
    </>
  )
}

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
      setNewNumber('')
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