import { MYAPPS_DATA } from '../action';

const HomeData = (state=[],action) => { 
    switch (action.type) { 
        case MYAPPS_DATA:
            return {
                ...state,
                myApps: action.myApps,
            }
        default:
            return state
    }
};
export default HomeData;
