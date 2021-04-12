import { REGISTER,LOGIN } from '../constants/actionTypes';

export default (users=[],action) => {
  switch (action.type) {
    case REGISTER:
      return [...users,action.payload];
    default:
      return users;
  }
};