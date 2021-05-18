import { SHOW_POP_UP,HIDE_POP_UP } from '../../constants/actionTypes';

const pop_up_visibility = (state=false,action) => {
    switch (action.type) {
        case SHOW_POP_UP:
            return state = true
        case HIDE_POP_UP:
            return state = false
        default:
            return state 
    }
} 

export default pop_up_visibility