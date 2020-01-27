import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://suneng-backend.herokuapp.com/'
})

export default instance