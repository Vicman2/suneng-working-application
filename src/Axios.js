import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:2020'
})

export default instance