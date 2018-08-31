import { combineReducers } from 'redux';
import LoginData from './LoginData.js';
import DefaultAppData from './DefaultAppData.js'
import HomeData from './HOMEDATA.js';
import CreateModalData from './CreateModalData.js';
import AppContentData from './AppContentData.js';
import MyAppsData from './MyAppsData.js';
import CodeContentData from './CodeContentData.js';

const rootReducers = combineReducers({
    LoginData,
    HomeData,
    MyAppsData,
    DefaultAppData,
    CreateModalData,
    AppContentData,
    CodeContentData
});

export default rootReducers;