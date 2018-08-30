import { HOME_MYAPP_DATA,HOME_HELLOWORLD } from '../action';

const HomeData = (state=[],action) => { 
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
        default:
            return state
    }
};
export default HomeData;
