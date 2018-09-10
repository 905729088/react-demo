import { initLAPI } from "@leither/l-api";
export const G = {api:null,ip:null};
//G.ip = location.host;//阿里云
G.ip = '192.168.1.187'
G.api = initLAPI(`http://${G.ip}/webapi/`);



window.G = G;
//G.currentIP