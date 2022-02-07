import axios from 'axios'

const API_URL = 'https://lunch-tag-server.herokuapp.com/api/admin/'

class AdminService {
    updateStrikes(matches) {
        return axios.post(API_URL + 'confirmMatches', 
        {matches: matches})
    }
}

export default new AdminService();