import axios from 'axios'

const urls = {
  test: 'http://localhost:3001',
  development: 'http://localhost:3001',
  production: 'http://localhost:3001'
}
const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
