import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://suneng-working-project.herokuapp.com/'
})

export default instance