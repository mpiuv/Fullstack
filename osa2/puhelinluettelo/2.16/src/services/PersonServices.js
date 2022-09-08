import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = (newObject) => {
  return axios.post(`${baseUrl}`, newObject)
}

const services = {
    getAll,
    add
  };
  
export default services