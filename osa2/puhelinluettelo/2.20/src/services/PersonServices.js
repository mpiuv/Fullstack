import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = (newObject) => {
  return axios.post(`${baseUrl}`, newObject)
}

const delete__ = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const services = {
    getAll,
    add,
    delete__
  };
  
export default services