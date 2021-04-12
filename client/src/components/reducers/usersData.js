import { REGISTER,LOGIN } from '../constants/actionTypes';

export default (users=[],action) => {
  switch (action.type) {
    case REGISTER:
      return [...users,action.payload];
    case LOGIN:
      return users.map((user) => (user.email === action.payload.email ? action.payload : user));
    default:
      return users;
  }
};