import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://lunch-tag-server.herokuapp.com/api/'

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    updateStrikes(username, newStrike) {
        return axios.post(API_URL + 'updateStrikes', 
        { params: {username: username, newStrike: newStrike}}, 
        {headers: authHeader()})
        .then(res => {
            console.log(res.data)
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data
        })
    }

    deleteStrike(username, delStrike) {
        return axios.post(API_URL + 'deleteStrike', 
        { params: {username: username, delStrike: delStrike}}, 
        {headers: authHeader()})
        .then(res => {
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }

            return res.data
        })
    }

    addCrush(username, newCrush) {
        return axios.post(API_URL + 'addCrush', 
        { params: {username: username, newCrush: newCrush}}, 
        {headers: authHeader()})
        .then(res => {
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data
        })
    }

    deleteCrush(username) {
        return axios.post(API_URL + 'delCrush',
        { params: {username: username}}, 
        {headers: authHeader()})
        .then(res => {
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data
        })
    }

    optIn(username){
        return axios.post(API_URL + 'optIn',
        { params: {username: username}}, 
        {headers: authHeader()})
        .then(res => {
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data
        })
    }

    optOut(username){
        return axios.post(API_URL + 'optOut',
        { params: {username: username}}, 
        {headers: authHeader()})
        .then(res => {
            if (res.data.accessToken){
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data
        })
    }
}

export default new UserService();