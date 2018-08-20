import { initLAPI } from "@leither/l-api";
export const G = {api:null,ip:null};
//let api = QxzLApi.initLAPI('http://vzhan.cn'+'/webapi/')
//let api = QxzLApi.initLAPI('http://192.168.1.187'+'/webapi/')
//let api = QxzLApi.initLAPI(location.origin+'/webapi/')//阿里云
G.api = initLAPI('http://192.168.1.187'+'/webapi/');
G.ip = '192.168.1.187';
window.G = G;
//G.currentIP