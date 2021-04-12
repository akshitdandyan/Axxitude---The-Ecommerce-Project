import axios from 'axios';
const url = 'http://localhost:5000';

export const registeruser = (newUserData) => {
    axios.post(`${url}/register`, newUserData)
};

export const loginuser = async(userCredentials) =>{
    const isAbleToLoggin = await axios.post(`${url}/login`,userCredentials);
    const userData = isAbleToLoggin.data[0];
    if(userData === undefined || userCredentials.password !== userData.password){
        console.log("INVALID CREDENTIALS");
        return
    }
    console.log("ABLE TO LOGIN NOW");
    return userData;
}
