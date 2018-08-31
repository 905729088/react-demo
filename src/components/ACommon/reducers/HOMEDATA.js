import { HOME_MYAPP_DATA,HOME_HELLOWORLD,HOME_ACTIVE } from '../action';

const HomeData = (state = {active: 1}, action) => { 
    switch (action.type) { 
        case HOME_MYAPP_DATA:
            return {
                ...state,
                myApps: action.myApps,
            }
        case HOME_HELLOWORLD:
            return {
                ...state,
                helloWorld: action.helloWorld,
            }
        case HOME_ACTIVE:
            return {
                ...state,
                active: action.active,
            }
        default:
            return state
    }
};
export default HomeData;
