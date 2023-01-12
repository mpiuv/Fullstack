import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
export  const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    const url= 'https://restcountries.com/v3.1/name/'+name+'?fullText=true'
    const promise=axios.get(url)
    promise.then(response => {
      setCountry(response.data[0])
    })
  },[name])
  return country
}
