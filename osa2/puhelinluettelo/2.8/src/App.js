import { useState } from 'react'

const Person = (props) =>{
  return (<li>{props.person} {' '} {props.number}</li>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
    

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameNumber}>
        <div>
          name: <input value={newName}
                 onChange={handleNameChange}/>
        </div>
        <div>number: <input value= {newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
         {persons.map(person => <Person key={person.name} person={person.name} number={person.number}/>)}
      </ul>

    </div>
  )
}

export default App
