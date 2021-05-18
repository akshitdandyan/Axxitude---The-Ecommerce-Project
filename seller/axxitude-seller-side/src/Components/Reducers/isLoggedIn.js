import { LOGOUTAUTH,LOGINAUTH } from '../Constants/Constants.js';

const isLoggedIn = (isLoggedIn=false,action) => {
    switch (action.type) {
        case LOGINAUTH:
            return isLoggedIn = true;
        case LOGOUTAUTH:
            return isLoggedIn = false;
        default:
            return isLoggedIn;
    }
}

export default isLoggedIn;