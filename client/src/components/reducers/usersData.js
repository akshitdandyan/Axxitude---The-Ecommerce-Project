import { REGISTER,LOGIN } from '../constants/actionTypes';

export default (users=[],action) => {
  switch (action.type) {
    case REGISTER:
      return [action.payload];
    case LOGIN:
      users.map((user)=>{
        console.log("QQ",action.payload.email)
        if(user.email == action.payload.email){
          const isRegistered = user.password == action.payload.password;
          if(isRegistered){
            alert("ABLE TO LOGIN")
          }else{
            alert("CANT LOGIN")
          }
          return isRegistered;
        }
      })
    default:
      return users;
  }
};