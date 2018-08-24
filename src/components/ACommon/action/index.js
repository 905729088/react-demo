import { G } from "./../Api.js";
export const LOGIN_USER_INFO = 'LOGIN_USER_INFO';//login 用户的登录信息
export const LOGIN_ISLOGIN = 'LOGIN_ISLOGIN';//login 用户是否登录

export const DAFAULTAPP_DATA = 'DAFAULTAPP_DATA';//应用库数据
export const MYAPPS_DATA = 'MYAPPS_DATA';//我的应用数据
export const HOME_MYAPP_DATA = 'HOME_MYAPP_DATA';//HOME左侧我的应用数据
export const CREATEMODAL_FILE_DATA = 'CREATEMODAL_FILE_DATA';//ConnectCreateModal上传的文件
export const APPCONTENT_APP_FILE_LIST = "APPCONTENT_APP_FILE_LIST";//AppContent 的应用文件列表
export const APPCONTENT_APP_VERSION_LIST = "APPCONTENT_APP_VERSION_LIST";//AppContent 的应用文件列表
export const APPCONTENT_APP_DOAMIN = "APPCONTENT_APP_DOAMIN";//AppContent 的应用域名

export const Login_IsLogin = (isLogin) => ({
    type: LOGIN_ISLOGIN,
    isLogin
});

export const LoginUser_Info = (userInfo) => ({//用户登录信息
    type: LOGIN_USER_INFO,
    userInfo
});

export const DefaultApp_Data = (appList) => ({
    type: DAFAULTAPP_DATA,
    appList
});

export const MyApps_Data = (myApps) => ({
    type: MYAPPS_DATA,
    myApps
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
export const AppContentApp_Domain= (appDomain) => ({
    type:APPCONTENT_APP_DOAMIN,
    appDomain
});

export const onLogin = (name, pass, info) => async (dispatch) => {//登录
   
    const userGroup = await G.api.getVar('', 'usergroup', 'GLOBAL_USER', 'name');
    const adminGroup = userGroup.manangers;  
    const result = adminGroup.findIndex((value)=>value==info.user.id);
    const userType =result == -1 ? 'user' : 'admin';//用户类型
    const DATA_ID = await G.api.userGroupGetInfo('', userGroup.id, 'DATA_ID');//数据区id
    const userInfo = {
        sid: info.sid,//登录的sid
        name: info.user.name,//name
        userId: info.user.id,//用户的userId
        userType:userType,
        DATA_ID:DATA_ID//数据区id
    };
    sessionStorage.setItem('current_pass', JSON.stringify({ name: name, pass: pass }));  
    dispatch({
      type: LOGIN_USER_INFO,
      userInfo
    })
    dispatch({
        type: LOGIN_ISLOGIN,
        isLogin:true
      })
   
}

export const onLogout = () => async (dispatch) => {//登出

   
    sessionStorage.removeItem('current_pass');
    // window.localStorage.removeItem('APP_SID');
    // window.localStorage.removeItem('APP_UID');
    // sessionStorage.removeItem('current_sid');

    const userInfo = {
        sid: null,//登录的sid
        name: null,//name
        userId: null,//用户的userId
        userType:null,
        DATA_ID:null//数据区id
    };
    dispatch({
      type: LOGIN_USER_INFO,
      userInfo
    })
    dispatch({
        type: LOGIN_ISLOGIN,
        isLogin:false
      })
   
}


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
  
export const Fetch_HomeMyApp_Data = (sid) => async (dispatch) => {//请求home中我的应用数据
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
    dispatch({
        type: MYAPPS_DATA,
        myApps:AppArr
      })
}
  
export const Fetch_AppContentApp_File_List = (sid,appName,appVer = 'last') => async (dispatch) => {//请求获取应用文件信息列表
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

export const Fetch_AppContentApp_Version_List = (sid,appName) => async (dispatch) => {//请求获取应用版本列表
    const appVersionList = await G.api.getVar(sid, 'appversions', appName)
    dispatch({
      type:APPCONTENT_APP_VERSION_LIST,
      appVersionList
    })
}

export const Fetch_AppContentApp_Doamin = (sid,appName,userId,DATA_ID) => async (dispatch) => {//请求获取应用域名
    //获取域名
    const innerNetwork=await G.api.hGet(sid,DATA_ID,'INNERNETWORK',userId+'#'+appName);
    const outNetwork = await G.api.hGet(sid, DATA_ID, 'OUTNETWORK', userId + '#' +appName);
    const appDomain = {
        inner:innerNetwork,//内网
        out:outNetwork //外网
    }
    console.log('域名',appDomain);
    dispatch({
      type:APPCONTENT_APP_DOAMIN,
      appDomain
    })
}
  
