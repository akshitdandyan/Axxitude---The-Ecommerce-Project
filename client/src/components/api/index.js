import axios from 'axios';
// const url = 'https://axxitude.herokuapp.com'; // while deploying
const url = 'http://localhost:5000';             //while building

//Casual user
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
        return [];
    }
    return userData;
}

export const addtocart = async(product) => {
    const cartData = {product:product,userEmail:localStorage.getItem("user%^&*()email_666")};
    try {
        await axios.post(`${url}/add-to-cart`,cartData)
    } catch (error) {
        console.log("Woops!",error);
    }

}
export const removefromcart = async(product_id,user_id) => {
    const cartData = {productID:product_id,userID:user_id};
    try {
        await axios.post(`${url}/remove-from-cart`,cartData)
    } catch (error) {
        console.log("Woops!",error);
    }
}
export const postreview = async(product_id,review,reviewer) => {
    const reviewData = {productID:product_id,review:{review,reviewer}}
    try {
        axios.post(`${url}/post-product-review`,reviewData)
    } catch (error) {
        console.log(error);
    }
}
export const buyItem = async(userid,product) => {
    const shoppingData = {userID:userid,product:product};
    try {
        await axios.post(`${url}/buy-item`,shoppingData)
    } catch (error) {
        console.log("Woops!",error);
    }

}
export const cancelOrder = async(userID,product) => {
    try {
        await axios.post(`${url}/cancel-order`,{userID,product})
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async(userID,new_address) => {
    const data = {userID:userID,new_address:new_address};
    try{
        const updated_data = await axios.post(`${url}/update-address`,data)
        return updated_data
    }catch(err){
        console.log(err);
    }
}

//Seller
export const createSellerAccount = async(sellerData)=>{
    try {
        await axios.post(`${url}/seller`,sellerData)
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

export const increaseClick = async(SellerEmail_) => {
    try {
        await axios.patch(`${url}/seller-product-clicked`,{SellerEmail:SellerEmail_})
    } catch (error) {
        console.log(error)
    }
}