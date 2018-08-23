import { combineReducers } from 'redux';
import DefaultAppData from './DefaultAppData.js'
import HomeData from './HOMEDATA.js';
import CreateModalData from './CreateModalData.js';
import AppContentData from './AppContentData.js';


const rootReducers = combineReducers({
    HomeData,
    DefaultAppData,
    CreateModalData,
    AppContentData
});

export default rootReducers;