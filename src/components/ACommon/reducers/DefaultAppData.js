import { DAFAULTAPP_DATA } from '../action';

const DefaultAppData = (state=[],action) => { 
    switch (action.type) { 
        case DAFAULTAPP_DATA:
            return {
                ...state,
                appList: action.appList,
            }
        default:
            return state
    }
};
export default DefaultAppData;
