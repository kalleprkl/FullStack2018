import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const destroy = (id) => {
    const path = baseUrl.concat('/' + id)
    axios.delete(path)
}

const update = (id, newPerson) => {
    const path = baseUrl.concat('/' + id)
    const request = axios.put(path,newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, destroy, update }