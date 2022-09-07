import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) =>{
  return (<p>{props.country}    <button onClick={() => {props.setNewFilter(props.country)}}>        show
  </button>
</p>)
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

const Branch=({filter, countries, setNewFilter}) => {
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
    { filteredCountries.map(country => 
       <Country key={country.name.common} country={country.name.common} setNewFilter={setNewFilter} />)}
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
    <img src={filteredCountries[0].flags.png}  alt=""></img>
    <h2>Weather in {filteredCountries[0].capital}</h2>
    <Weather capital={filteredCountries[0].capital} countryCode={filteredCountries[0].cca2}/>
    </div>
  )}
}

const Weather = ({capital, countryCode}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [location, setLocation]=useState(' ')
  const [weather, setWeather]=useState('')
  let locationString="http://api.openweathermap.org/geo/1.0/direct?q="+capital+",,"+countryCode+"&appid="+api_key
  const [weatherString, setWeatherString]= useState(' ')
   useEffect(() => {
    const promise=
      axios.get(locationString)
      promise.then(response => {
          setLocation(response.data)
          setWeatherString("https://api.openweathermap.org/data/2.5/weather?lat="+location.lat+"&lon="+location.lon+"&appid="+api_key+"&units=metric")
          console.log(response.data)
      })
  },[locationString])

  useEffect(() => {
    const promise=
      axios.get(weatherString)
      promise.then(response => {
          setWeather(response.data)
          console.log(response.data)
      })
  },[weatherString])
  console.log(weather)
  if(weather==="") return (<></>)
  let iconString="http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"
  return(<div>
    <p>temperature {weather.main.temp} Celcius</p>
    <img src={iconString}  alt=""></img>
    <p>wind {weather.wind.speed} m/s</p>
  </div>)
}

const App = () => {
  const [countries, setCountries] = useState([ ]) 
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  const setNewFilter2 = (country) =>{
    setNewFilter(country)
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
      <Branch filter={newFilter} countries={countries} setNewFilter={setNewFilter2}/>
      
    </div>
  )
}

export default App
