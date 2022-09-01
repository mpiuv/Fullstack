import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) =>{
  return (<li>{props.country} </li>)
}

const Language = (props) =>{
  return (<li>{props.language} </li>)
}

const Filter = ({handleFilterChange, newFilter}) =>{
  return (
    <div>
    find countries<input value={newFilter}
       onChange={handleFilterChange}/>
    </div>
  )
}

const Branch=({filter,countries}) => {
  let len=11
  let filteredCountries
  if (filter!==""){
    filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))
    len=filteredCountries.length
  }
 
  if(len>10 || filter==="")
    return(<p>Too many matches, specify another filter</p>)
  else if ( 1<len && len<11)
   return (
    <ul>
    { filteredCountries.map(country => <Country key={country.name.common} country={country.name.common} />)}
    </ul>
  )
  else{
    
  return(
    <div>
    <h2>{filteredCountries[0].name.common}</h2>
    <p>capital {filteredCountries[0].capital}</p>
    <p>area {filteredCountries[0].area}</p>
    <h1>languages:</h1>
    <ul>
    { 
    Object.entries(filteredCountries[0].languages).map(language => <Language key={language[1]} language={language[1]} />)}
    </ul>
    <img src={filteredCountries[0].flags.png}  ></img>
    </div>   
  )}
}


const App = () => {
  const [countries, setCountries] = useState([ ]) 
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }


  useEffect(() => {
    const promise=axios.get('https://restcountries.com/v3.1/all')
      promise.then(response => {
          setCountries(response.data)
      })
  },[])
  

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter}/>
      <Branch filter={newFilter} countries={countries}/>
    </div>
  )
}

export default App
