import { REGISTER } from '../constants/actionTypes';

const usersData =  (users=[],action) => {
  switch (action.type) {
    case REGISTER:
      return [...users,action.payload];
    default:
      return users;
  }
};

export default usersData