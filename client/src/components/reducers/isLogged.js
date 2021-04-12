import {LOGIN,LOGOUT} from '../constants/actionTypes.js';
const isLoggedReducer = (state=false,action)=>{
    switch(action.type){
        case LOGIN:
            return [state=true,action.payload]
        case LOGOUT:
            return state = false
        default:
            return state;
    }
}
export default isLoggedReducer;