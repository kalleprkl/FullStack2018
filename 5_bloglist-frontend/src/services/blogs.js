import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = 'bearer ' + newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const comment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog._id}`, blog)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': token } })
}

export default { getAll, create, comment, setToken, update, remove }