import axios from 'axios'
import { useState, useEffect } from 'react'

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
  
export  const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const  getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data) 
    return response.data
  }

  useEffect( () =>{
    const fetchData = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    } 
    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    }
    
    const response = await axios.post(baseUrl, resource, config)
    setResources([...resources,response.data])
    return response.data
  }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }
