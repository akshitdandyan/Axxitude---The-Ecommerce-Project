import { LOGIN,ADDPRODUCTS,DELETEPRODUCT,LAUNCHPRODUCT } from '../Constants/Constants.js'
import { getLaunchedProducts, getUserDataToLogin,deleteProduct,launchproduct } from '../Api'

export const get_Launched_Products = () => async(dispatch) => {
    const seller_Email = localStorage.getItem("seller_account_email");
    try{
        const {data} = await getLaunchedProducts(seller_Email);
        dispatch({type:ADDPRODUCTS,payload:data})
        console.log("ACTION Products",data);
    } catch(error){
        console.log(error)
    }
}

export const launch_product = (productDetails) => async(dispatch) => {
    try {
        await launchproduct(productDetails)
        dispatch({type:LAUNCHPRODUCT,payload:productDetails})
        console.log("LAUNCHED SUCCESSFULLY");
    } catch (error) {
        console.log(error);
    }
}

export const delete_product = (_id) => async(dispatch) => {
    try {
        const data = {id:_id,SellerEmail:localStorage.getItem('seller_account_email')}
        await deleteProduct(data);
        dispatch({type:DELETEPRODUCT,payload:_id})
        console.log("DELETED");
    } catch (error) {
        console.log(error);
    }
}

export const login_user = (loginCredentials) => async(dispatch) => {
    try {
        const { data }  = await getUserDataToLogin(loginCredentials);
        dispatch({type:LOGIN,payload:data})
        const products = await getLaunchedProducts(loginCredentials);
        dispatch({type:ADDPRODUCTS,payload:products.data})
    } catch (error) {
        console.log(error)
    }
}