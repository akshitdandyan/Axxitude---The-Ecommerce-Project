import {LOGIN} from '../constants/actionTypes.js';
const isLoggedReducer = (state=false,action)=>{
    switch(action.type){
        case LOGIN:
            return [state=!state,action.payload]
        default:
            return state;
    }
}
export default isLoggedReducer;