import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import namePersons from './services/persons'
import Notification from './components/Notification'
import ErrorMsg from './components/ErrorMsg'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    console.log('effect')
    namePersons
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  },[])

  const successMessage = (message) => {
    setSuccessMsg(
      `Added ${message}`
    )
    setTimeout(() => {
      setSuccessMsg(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(Number(persons[persons.length - 1].id)+1)
    }
    const names = persons.map(x => x.name)
    if (names.find(x => x === newName) !== undefined) {
      if (confirm(newName + " is already added to phonebook, replace the old number witha new one?")) {
        console.log("change element with id:",persons.filter(x => x.name === newName)[0].id)
        nameObject.id = String(persons.filter(x => x.name === newName)[0].id)
        namePersons
          .update(nameObject.id,nameObject)
          .then(response => {
            console.log("The response from PUT:",response)
            console.log("I want to update:",persons.filter(x => x.id === response.id)[0].number)
            persons.filter(x => x.id === response.id)[0].number = response.number
            setPersons(persons)
            setNewName('')
            setNewNumber('')
            successMessage(nameObject.name)
          })
          .catch(error => {
            console.log(`Information of ${newName} has already been removed from server`)
            setErrorMsg(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)
          })
      }
    } else {
      namePersons
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
      successMessage(nameObject.name)
    }   
  }

  const ask = (Id) => {
    console.log("id:",Id)
    const nameToRemove = persons.filter(x => x.id === Id)[0].name
    console.log("nameToRemove:",nameToRemove)
    if (confirm(`Delete ${nameToRemove} ?`)) {
      console.log(`Confirmed we can delete ${nameToRemove}!`)
      namePersons
        .remove(Id)
        .then(reply => {
          console.log("reply:",reply)
          setPersons(persons.filter(x => x.id !== reply.id))
        })
    } else {
      console.log(`We CANNOT delete ${nameToRemove}!!!`)
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
      <Notification message={successMsg} />
      <ErrorMsg message={errorMsg} />
      <Filter value={filterName} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm name={newName} handlename={handleNameAdd}
        number={newNumber} handlenumber={handleNumberAdd}
        add={addName} />
      <h2>Numbers</h2>
      <Persons names={numbersToShow} onSmash={ask} />
    </div>
  )
}

export default App