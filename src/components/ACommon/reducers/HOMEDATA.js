import { HOME_MYAPP_DATA } from '../action';

const HomeData = (state=[],action) => { 
    switch (action.type) { 
        case HOME_MYAPP_DATA:
            return {
                ...state,
                myApps: action.myApps,
            }
        default:
            return state
    }
};
export default HomeData;
