import {registeruser,loginuser} from '../api/index';
import { LOGIN, REGISTER,LOGOUT} from '../constants/actionTypes.js';

export const loginUser = (userCredentials) => async(dispatch)=>{
  console.log("BIENG LOGGED IN")
    try{
      const data = await loginuser(userCredentials);
      dispatch({type:LOGIN,payload:data})
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
