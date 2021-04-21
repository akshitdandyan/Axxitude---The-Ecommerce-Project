import axios from 'axios';
const url = 'http://localhost:5000';

export const RegisterForSellerAccount = async(newSellerData) => {
    try {
        await axios.post(`${url}/seller-account-registration`,newSellerData);
        return true;
    } catch (error) {
        return false;
    }
}

export const getUserDataToLogin = async(userEmail) => {
    try{
        const params={
            userEmail: userEmail
        }
        const sellerData = await axios.get(`${url}/seller-login`,{params})
        return sellerData
    }catch(error){
        console.log(error)
    }
}

export const launchproduct = async(productDetails) =>{
    try{
        const isLaunched = await axios.post(`${url}/launchproduct`,productDetails)
        return isLaunched
    }catch(err){
        console.log(err)
    }
}

export const getLauchedProducts = async(sellerEmail) => {
    try{
        const params = {
            sellerEmail : sellerEmail
        }
        const launchedProducts = await axios.get(`${url}/get-launched-products`,{params})
        return launchedProducts
    }catch(err){
        console.log(err)
    }
}