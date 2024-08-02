import axios from "axios"
const baseUrl = 'http://localhost:5200/api/users'

const register = async newUser => {
    const response = await axios.post(baseUrl, newUser)
    return response
}

export default {register}