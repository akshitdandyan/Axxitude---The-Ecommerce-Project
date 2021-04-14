import {registeruser,loginuser,createSellerAccount} from '../api/index';
import { LOGIN, REGISTER,LOGOUT,SELLER} from '../constants/actionTypes.js';

export const loginUser = (userCredentials) => async(dispatch)=>{
  console.log("BIENG LOGGED IN")
    try{
      const data = await loginuser(userCredentials);
      if(data!=undefined){
        dispatch({type:LOGIN,payload:data})
      }
    }catch(err){
      console.log("ACTIONS",err)
    }
}

export const logoutUser =(dispatch)=> {
  console.log('LOGOUT')
  dispatch({type:LOGOUT})
}

export const registerUser = (userdata) => async (dispatch) => {
  try {
    if(userdata.password !== userdata.cpassword){
      window.alert("Check Password Twice!");
      return;
    }
    console.log(userdata)
    const isRegistered = await registeruser(userdata);
    if(!isRegistered){
      alert("An account with this email is already registered.")
      return;
    }
    dispatch({ type: REGISTER, payload: userdata });
    console.log("REGISTERED :)");
  } catch (error) {
    console.log("ERROR LOG",error);
  }
};

export const sellerAccount = (sellerData) => async(dispatch)=>{
  try {
    await createSellerAccount(sellerData)
    dispatch({ type: SELLER, payload: sellerData });
    console.log("SELLER ACTION")
  } catch (error) {
    console.log("ACTIONS.JS SELLER",error)
  }
}