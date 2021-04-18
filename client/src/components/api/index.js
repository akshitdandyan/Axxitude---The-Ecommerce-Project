import axios from 'axios';
// const url = 'https://axxitude.herokuapp.com'; // while deploying
const url = 'http://localhost:5000';             //while building

export const registeruser = async(newUserData) => {
    try{
        await axios.post(`${url}/register`, newUserData)
        return true;
    }catch(err){
        return false;
    }
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

export const createSellerAccount = async(sellerData)=>{
    try {
        await axios.post(`${url}/seller`,sellerData)
        console.log("SELLER API")
    } catch (error) {
        console.log("API SELLER",error)
    }
}

export const getProductsFromSellers = async()=>{
    try{
        const productsFromSellers = await axios.get(`${url}/sellerproducts`)
        return productsFromSellers;
    }catch(err){
        console.log("API PRODUCTS FROM SELLER",err)
    }
}
