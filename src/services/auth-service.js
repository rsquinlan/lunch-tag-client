import axios from 'axios'

const API_URL = 'https://lunch-tag-server.herokuapp.com/api/auth/'

class AuthService {
    login(username, password) {
        return axios.post(API_URL + 'signin', {
            username,
            password
        })
        .then(res => {
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }

            return res.data
        })
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, password) {
        return axios.post(API_URL + 'signup', {
            username,
            password
        })
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'))
    }

    async getUsers(){
        const res = await axios.get(API_URL + 'getUsers')
        return res
    }

    async getMatches(){
        const res = await axios.get(API_URL + 'getMatches')
        return res
    }
}

export default new AuthService()