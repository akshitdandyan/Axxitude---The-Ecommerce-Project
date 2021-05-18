import { SET_NEW_POP_UP } from '../../constants/actionTypes';

const pop_up_reducer = (state=[],action) => {
    switch (action.type) {
        case SET_NEW_POP_UP:
            return state = action.payload
        default:
            return state
    }
}

export default pop_up_reducer