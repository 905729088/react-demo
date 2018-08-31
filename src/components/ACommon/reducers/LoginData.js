import { LOGIN_USER_INFO,LOGIN_ISLOGIN } from '../action';

const LoginData = (state=[],action) => { 
    switch (action.type) { 
        case LOGIN_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo,
            }
        case LOGIN_ISLOGIN:
            return {
                ...state,
                isLogin: action.isLogin,
            }
        default:
            return state
    }
};
export default LoginData;