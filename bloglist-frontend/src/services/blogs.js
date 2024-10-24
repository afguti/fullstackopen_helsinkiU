import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log("SETTOKEN:", token)
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("TOKEN:",token)
  const request = axios.get(baseUrl, config)

  return request.then(response => response.data)
}

export default { getAll, setToken }