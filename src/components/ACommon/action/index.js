import { G } from "./../Api.js";
export const DAFAULTAPP_DATA = 'DAFAULTAPP_DATA';//应用库数据
export const HOME_MYAPP_DATA = 'HOME_MYAPP_DATA';//HOME左侧我的应用数据
export const CREATEMODAL_FILE_DATA = 'CREATEMODAL_FILE_DATA';//ConnectCreateModal上传的文件
export const APPCONTENT_APP_FILE_LIST = "APPCONTENT_APP_FILE_LIST";//AppContent 的应用文件列表
export const APPCONTENT_APP_VERSION_LIST = "APPCONTENT_APP_VERSION_LIST";//AppContent 的应用文件列表
export const APPCONTENT_APP_DOAMIN = "APPCONTENT_APP_DOAMIN";//AppContent 的应用域名

export const DefaultApp_Data = (appList) => ({
    type: DAFAULTAPP_DATA,
    appList
});

export const HomeMyApp_Data = (myApps) => ({
    type: HOME_MYAPP_DATA,
    myApps
});

export const CreateModelFile_DATA = (file) => ({
    type: CREATEMODAL_FILE_DATA,
    file
});

export const AppContentApp_File_List= (appFileList) => ({
    type:APPCONTENT_APP_FILE_LIST,
    appFileList
});
export const AppContentApp_Version_List= (appVersionList) => ({
    type:APPCONTENT_APP_VERSION_LIST,
    appVersionList
});
export const AppContentApp_Domain= (domain) => ({
    type:APPCONTENT_APP_DOAMIN,
    appDomain
});
export const Fetch_DefaultApp_Data = (DATA_ID) => async (dispatch) => {//请求应用库数据
    const strArr = await G.api.hGetAll('',DATA_ID, '__H_File_ID__');
    let appList = [];
    for (let val of strArr) { 
        let obj = JSON.parse(val.value);
        appList.push(obj);
    }
    dispatch({
      type: DAFAULTAPP_DATA,
      appList
    })
}
  
export const Fetch_HomeMyApp_Data = (sid) => async (dispatch) => {//请求应用库数据
    const AppArr = await G.api.getVar(sid, "appinfos");
    let myApps =null;
    if (AppArr.length >= 4) {
        myApps = AppArr.slice(0, 4);
    } else { 
        myApps = AppArr;
    }
    dispatch({
      type: HOME_MYAPP_DATA,
      myApps
    })
}
  
export const Fetch_AppContentApp_File_List = (appName,appVer = 'last') => async (dispatch) => {//请求获取应用文件信息列表
    const sid = sessionStorage.getItem('current_sid');
    let appFileList = {};
    const packageInfo = await G.api.getVar(sid, 'apppackage', appName, appVer)
    if (packageInfo) {
        for (let key in packageInfo.entryTemplate) { 
            appFileList[key] = packageInfo.entryTemplate[key];
        }
        for (let key in packageInfo.name2ID) { 
            appFileList[key] = packageInfo.name2ID[key];
        }
    }
    dispatch({
      type:APPCONTENT_APP_FILE_LIST,
      appFileList
    })
}

export const Fetch_AppContentApp_Version_List = (appName) => async (dispatch) => {//请求获取应用版本列表
    const sid = sessionStorage.getItem('current_sid');
    const appVersionList = await G.api.getVar(sid, 'appversions', appName)
    dispatch({
      type:APPCONTENT_APP_VERSION_LIST,
      appVersionList
    })
}

export const Fetch_AppContentApp_Doamin = (appName,userId,DATA_ID) => async (dispatch) => {//请求获取应用域名
    //获取域名
    const sid = sessionStorage.getItem('current_sid');
    const innerNetwork=await G.api.hGet(sid,DATA_ID,'INNERNETWORK',userId+'#'+appName);
    const outNetwork = await G.api.hGet(sid, DATA_ID, 'OUTNETWORK', userId + '#' +appName);
    const appDomain = {
        inner:innerNetwork,//内网
        out:outNetwork //外网
    }
    dispatch({
      type:APPCONTENT_APP_DOAMIN,
      appDomain
    })
}
  
