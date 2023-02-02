import axios from 'axios'
import userService  from './user'

const baseUrl = '/api/users'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    },
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return  request.data
}

export default { getAll }