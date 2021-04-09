import { REGISTER } from '../constants/actionTypes';

export default (a=[1,2],action) => {
  switch (action.type) {
    case REGISTER:
      return [action.payload];
    default:
      return 'julie';
  }
};