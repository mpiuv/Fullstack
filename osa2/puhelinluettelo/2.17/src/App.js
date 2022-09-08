import { useState, useEffect } from 'react'
import personService from './services/PersonServices'

const delete_ = (id,name,setPersons) =>{
  if(window.confirm("Delete "+name+"?")){
    personService.delete__(id).then(response => {
      personService.getAll()
      .then(response => {
          setPersons(response.data)
       })
      })
  }
}

const Person = (props) =>{
  return (<li>{props.person} {' '} {props.number} {' '} <button onClick={() => {props.delete_(props.id, props.person,  props.setPersons)}}>        delete
  </button></li>)
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
.map(person => <Person key={person.name} person={person.name} number={person.number} id={person.id} delete_={delete_} setPersons={props.setPersons} />)}
    </ul>
  )}

const App = () => {
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
   
  useEffect(() => {
      personService.getAll()
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
      personService.add(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        console.log(persons)
        setNewName('')
      })
    }
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
    <Persons persons={persons} newFilter={newFilter} setPersons={setPersons}/>
   
    </div>
  )
}

export default App