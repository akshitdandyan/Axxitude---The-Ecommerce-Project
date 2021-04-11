import {registeruser,loginuser} from '../api/index';
import { LOGIN, REGISTER} from '../constants/actionTypes.js';
export const registerUser = (userdata) => async (dispatch) => {
    try {
      if(userdata.password !== userdata.cpassword){
        window.alert("Check Password Twice!");
        return;
      }
      const data = await registeruser(userdata);
      dispatch({ type: REGISTER, payload: data });
      console.log("SUCCESSFULLY REGISTRED")
    } catch (error) {
      console.log("ERROR LOG",error);
    }
  };

export const loginUser = (userCredentials) => async(dispatch)=>{
    try{
      const data = await loginuser(userCredentials);
      dispatch({type:LOGIN,payload:data})
    }catch(err){
      console.log("ACTIONS",err)
    }
}