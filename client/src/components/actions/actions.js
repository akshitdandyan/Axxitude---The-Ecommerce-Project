import {registeruser,loginuser,createSellerAccount, addtocart, removefromcart,updateAddress, buyItem, cancelOrder} from '../api/index';
import { LOGIN, SET_USER_DATA,LOGOUT,SELLER, SHOW_PRODUCT, HIDE_PRODUCT, ADD_TO_CART, REMOVE_USER_DATA, FETCH_CART_ITEMS, REMOVE_FROM_CART, EMPTY_CART, BUY_ITEM, FETCH_ORDERED_ITEMS, CANCEL_ITEM, EMPTY_BUY_ITEMS, SHOW_POP_UP, SET_NEW_POP_UP} from '../constants/actionTypes.js';
//Casual User
export const setNewPopUp = (popupdata) => (dispatch) => {
  dispatch({type:SET_NEW_POP_UP,payload:popupdata})
  dispatch({type:SHOW_POP_UP})
}
export const loginUser = (userCredentials) => async(dispatch)=>{
    try{
      const data = await loginuser(userCredentials);
      if(data.length === 0){
        dispatch({type:LOGOUT})
        dispatch({type:REMOVE_USER_DATA})
        dispatch({type:EMPTY_CART})
        return false;
      }
      dispatch({type:FETCH_CART_ITEMS,payload:data.cart})
      dispatch({type:FETCH_ORDERED_ITEMS,payload:data.itemsToBeBought})
      if(data!==undefined){
        dispatch({type:LOGIN})
        dispatch({type:SET_USER_DATA,payload:data})
      }
      localStorage.setItem("user%^&*()email_666",userCredentials.email);
      localStorage.setItem("password%^&*()_891",userCredentials.password);
      return true;
    }catch(err){
      console.log(err);
    }
}

export const logoutUser =(dispatch)=> {
  localStorage.setItem("user%^&*()email_666",null);
  localStorage.setItem("password%^&*()_891",null);
  dispatch({type:LOGOUT})
  dispatch({type:REMOVE_USER_DATA})
  dispatch({type:EMPTY_CART})
  dispatch({type:EMPTY_BUY_ITEMS})
}

export const registerUser = (userdata) => async (dispatch) => {
  try {
    const isRegistered = await registeruser(userdata);
    if(isRegistered===false){
      return false;
    }else{
    dispatch({ type: SET_USER_DATA, payload: userdata });
    const loginCredentials={email:userdata.email,password:userdata.password}
    const islogged = await dispatch(loginUser(loginCredentials));
    const popUpData = {title:"Yay!🎉✨",body:"You have been Registered on Axxitude. Explore Now."};
    dispatch(setNewPopUp(popUpData))
    return islogged
    }
  } catch (error) {
    console.log(error);
  }
};

export const Show_Product_Action = () => async(dispatch) => {
  dispatch({type:SHOW_PRODUCT})
}

export const Hide_Product_Action = () => (dispatch) => {
  dispatch({type:HIDE_PRODUCT})
}

export const AddToCart = (product) => async(dispatch)=>{
  dispatch({type:ADD_TO_CART,payload:product})
  await addtocart(product);
}

export const removeFromCart = (product_id,user_id) => async(dispatch) => {
  dispatch({type:REMOVE_FROM_CART,payload:product_id})
  await removefromcart(product_id,user_id);
}

export const BuyItem = (userID,product) => async(dispatch)=>{
  dispatch({type:BUY_ITEM,payload:product});
  await buyItem(userID,product);
}
export const CancelOrder = (userID,product) => async(dispatch)=>{
  dispatch({type:CANCEL_ITEM,payload:product._id})
  await cancelOrder(userID,product)
}
export const update_Address = (userID,new_address) => async(dispatch) => {
  const newData = await updateAddress(userID,new_address);
  dispatch({type:SET_USER_DATA,payload:newData})
}

//Seller User
export const sellerAccount = (sellerData) => async(dispatch)=>{
  try {
    await createSellerAccount(sellerData)
    dispatch({ type: SELLER, payload: sellerData });
  } catch (error) {
    console.log("ACTIONS.JS SELLER",error)
  }
}

