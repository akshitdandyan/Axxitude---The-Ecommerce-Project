import {registeruser} from '../api/index';
import { REGISTER} from '../constants/actionTypes.js';
export const registerUser = (userdata) => async (dispatch) => {
    try {
      if(userdata.password != userdata.cpassword){
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

}