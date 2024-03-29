import { SET_USER_DATA,REMOVE_USER_DATA } from '../constants/actionTypes';

const userData =  (user_data=[],action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return user_data = action.payload;
    case REMOVE_USER_DATA:
      return user_data = []
    default:
      return user_data;
  }
};

export default userData;