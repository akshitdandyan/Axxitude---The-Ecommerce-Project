import axios from 'axios';
// const productionUrl = 'https://axxitude.herokuapp.com';               // while deploying
// const developmentUrl = 'http://localhost:5000';                       //while building
const API = axios.create({ baseURL: "http://localhost:5000" })
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization =   `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const registeruser = async(newUserData) => {
    try{
        const result = await API.post(`/register`, newUserData);
        return result;
    }catch(err){
        return false;
    }
};
 
export const loginuser = async(userCredentials) =>{
    const { data } = await API.post(`/login`,userCredentials);
    return data;
}

export const userupdateddata = async(id) => {
    const body = {id:id}
    const { data } = await API.post('/update',body);
    return data;
}

export const addtocart = async(product) => {
    const cartData = {product:product,id:JSON.parse(localStorage.getItem("profile")).newUser._id};
    try {
        await API.post(`/add-to-cart`,cartData)
    } catch (error) {
        console.log("Woops!",error);
    }

}
export const removefromcart = async(product_id,user_id) => {
    const cartData = {productID:product_id,userID:user_id};
    try {
        await API.post(`/remove-from-cart`,cartData)
    } catch (error) {
        console.log("Woops!",error);
    }
}
export const postreview = async(product_id,review,reviewer) => {
    const reviewData = {productID:product_id,review:{review,reviewer}}
    try {
        API.post(`/post-product-review`,reviewData)
    } catch (error) {
        console.log(error);
    }
}
export const buyItem = async(userid,product) => {
    const shoppingData = {userID:userid,product:product};
    try {
        await API.post(`/buy-item`,shoppingData)
    } catch (error) {
        console.log("Woops!",error);
    }

}
export const cancelOrder = async(userID,product) => {
    try {
        await API.post(`/cancel-order`,{userID,product})
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async(userID,new_address) => {
    const data = {userID:userID,new_address:new_address};
    try{
        const updated_data = await API.post(`/update-address`,data)
        return updated_data
    }catch(err){
        console.log(err);
    }
}

export const getProductsFromSellers = async(dispatch)=>{
    try{
        const { data } = await API.get('/sellerproducts')
        return data
    }catch(err){
        console.log("API PRODUCTS FROM SELLER",err)
    }
}

export const increaseClick = async(SellerEmail_) => {
    try {
        await API.patch(`/seller-product-clicked`,{SellerEmail:SellerEmail_})
    } catch (error) {
        console.log(error)
    }
}