import { useState, useEffect } from 'react'
import personService from './services/PersonServices'



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = (props) =>{
  return (<li>{props.person} {' '} {props.number} {' '} <button onClick={() => {props.delete_(props.id, props.person,  props.setPersons, props.setErrorMessage)}}>        delete
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

const delete_ = (id,name,setPersons,setErrorMessage) =>{
  if(window.confirm("Delete "+name+"?")){
    personService.delete__(id).then(response => {
      personService.getAll()
      .then(response => {
        setErrorMessage(
          `Removed ${name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)

          setPersons(response.data)
       })
      })
  }
}

const Persons = (props) => {
  return (
    <ul>
    { props.persons.filter(person => person.name.toUpperCase().startsWith(props.newFilter.toUpperCase()))
.map(person => <Person key={person.name} person={person.name} number={person.number} id={person.id} 
     delete_={delete_} setPersons={props.setPersons} setErrorMessage={props.setErrorMessage} />)}
    </ul>
  )}

const App = () => {
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

 

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
      if(window.confirm(newName+ " is already added to the phonebook. Replace the old number with the new one?")){
        personService.delete__(persons.find(same).id).then(response => {
          
          personService.add(nameObject)
          .then(response1 => {
            personService.getAll().then (response =>{setPersons(response.data)})
            setErrorMessage(
              `The old number replaced with the new one`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
    
            setNewName('')
            setNewNumber('')
          })              
       }).catch(error =>{
        setErrorMessage(
          `Information of ${newName} has already been deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        personService.getAll().then (response =>{setPersons(response.data)})
        setNewName('')
        setNewNumber('')

       })
      }
    }
    else {
      personService.add(nameObject)
      .then(response => {
        setErrorMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)

        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      }).catch (error =>{
        setErrorMessage(
          `Person ${newName} was removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
    

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
      <PersonForm addNameNumber={addNameNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}/>
      <Notification message={errorMessage} />
    <h2>Numbers</h2>
    <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
   
    </div>
  )
}

export default App