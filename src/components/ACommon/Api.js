import { initLAPI } from "@leither/l-api";
export const G = {api:null,ip:null};
//G.api = initLAPI('http://vzhan.cn'+'/webapi/')
//G.api = initLAPI(location.origin+'/webapi/')//阿里云
//G.ip = location.host;
G.ip = '192.168.1.187'
G.api = initLAPI(`http://${G.ip}/webapi/`);



window.G = G;
//G.currentIP