import axios from 'axios';
const url = 'http://localhost:5000';
 
export const registeruser = (newUserData) => {
    axios.post(`${url}/register`, newUserData)
};
