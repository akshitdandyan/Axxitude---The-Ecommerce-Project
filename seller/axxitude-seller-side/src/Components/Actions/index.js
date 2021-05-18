import { LOGIN,ADDPRODUCTS,DELETEPRODUCT,LAUNCHPRODUCT, LOGINAUTH, ADDTOADVERTISEMENT, SET_NEW_POP_UP, SHOW_POP_UP } from '../Constants/Constants.js'
import { getLaunchedProducts, getUserDataToLogin,deleteProduct,launchproduct, advertiseProduct } from '../Api'

export const setNewPopUp = (popupdata) => (dispatch) => {
    dispatch({type:SET_NEW_POP_UP,payload:popupdata})
    dispatch({type:SHOW_POP_UP})
  }
export const get_Launched_Products = () => async(dispatch) => {
    const seller_Email = localStorage.getItem("seller_account_email");
    try{
        const {data} = await getLaunchedProducts(seller_Email);
        dispatch({type:ADDPRODUCTS,payload:data})
    } catch(error){
        console.log(error)
    }
}

export const launch_product = (productDetails) => async(dispatch) => {
    try {
        await launchproduct(productDetails)
        dispatch({type:LAUNCHPRODUCT,payload:productDetails})
    } catch (error) {
        console.log(error);
    }
}

export const delete_product = (_id) => async(dispatch) => {
    try {
        const data = {id:_id,SellerEmail:localStorage.getItem('seller_account_email')}
        await deleteProduct(data);
        dispatch({type:DELETEPRODUCT,payload:_id})
    } catch (error) {
        console.log(error);
    }
}

export const login_user = (loginCredentials) => async(dispatch) => {
    try {
        const { data }  = await getUserDataToLogin(loginCredentials);
        if(data.length===0){
            return false
        }
        dispatch({type:LOGIN,payload:data})
        const products = await getLaunchedProducts(loginCredentials);
        dispatch({type:ADDPRODUCTS,payload:products.data})
        dispatch({type:LOGINAUTH})
        return true
    } catch (error) {
        console.log(error)
    }
}
