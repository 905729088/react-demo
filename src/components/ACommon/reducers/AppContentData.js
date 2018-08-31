import { APPCONTENT_APP_FILE_LIST,APPCONTENT_APP_VERSION_LIST,APPCONTENT_APP_DOAMIN,APPCONTENT_APP_INFO} from '../action';

const AppContentData = (state=[],action) => { 
    switch (action.type) { 
        case APPCONTENT_APP_INFO:
        return {
            ...state,
            info: action.info,
        }
        case APPCONTENT_APP_FILE_LIST:
            return {
                ...state,
                appFileList: action.appFileList,
            }
        case APPCONTENT_APP_VERSION_LIST:
            return {
                ...state,
                appVersionList: action.appVersionList,
            }
        case APPCONTENT_APP_DOAMIN:
            return {
                ...state,
                appDomain: action.appDomain,
            }
        default:
            return state
    }
};
export default AppContentData;
