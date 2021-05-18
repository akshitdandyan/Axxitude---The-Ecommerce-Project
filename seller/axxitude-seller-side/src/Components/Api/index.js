import axios from 'axios';
// const url = 'http://localhost:5000';
const url = 'https://axxitude.herokuapp.com'

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
        await axios.post(`${url}/launchproduct`,productDetails)

    }catch(err){
        console.log(err)
    }
}

export const getLaunchedProducts = async(sellerEmail) => {
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

export const deleteProduct = async(id) => {
    try{
        await axios.post(`${url}/deleteproduct`,id)
    }catch(error){
        console.log('SORRY',error);
    }
}
export const advertiseProduct = async(productID)=>{
    try{
        await axios.post(`${url}/sponser-new-product`,{productID})
    }catch(error){
        console.log(error);
    }
}
export const updateSellerAccountData = async(updatedDATA) => {
    try {
        await axios.post(`${url}/update-seller-account`,{updatedDATA})
    } catch (error) {
        console.log(error);
    }
}