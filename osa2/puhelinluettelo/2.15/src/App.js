import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) =>{
  return (<li>{props.person} {' '} {props.number}</li>)
}

const Filter = (props) =>{
  return (
    <div>
    filter: <input value={props.newFilter}
       onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) =>{
  return(      
    <form onSubmit={props.addNameNumber}>
    <div>
      name: <input value={props.newName}
             onChange={props.handleNameChange}/>
    </div>
    <div>number: <input value= {props.newNumber} onChange={props.handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)}

const Persons = (props) => {
  return (
    <ul>
    { props.persons.filter(person => person.name.toUpperCase().startsWith(props.newFilter.toUpperCase()))
      .map(person => <Person key={person.name} person={person.name} number={person.number}/>)}
    </ul>
  )}

const App = () => {
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
   
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          setPersons(response.data)
      })
  },[])
  
  const addNameNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

   const same = (element) => element.name===newName

    if(persons.some(same)) {
      alert(`${newName} is already added to phonebook`)
      }
    else {
      axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
    }
    setNewName('')
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter}/>
      <h2>Add a new</h2>
      <PersonForm addNameNumber={addNameNumber} newName={newName} handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}/>
    <h2>Numbers</h2>
    <Persons persons={persons} newFilter={newFilter}/>
   
    </div>
  )
}

export default App