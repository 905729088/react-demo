const data = [{
    name: '用户API',
    type: 'user',
    list: [
        'register',
        'login',
        'logout',
    ]
}, 
{
    name: '数据库API-hash表',
    type: 'table',
    list: [
        'hSet',
        'hDel',
        'hLen',
        'hGet',
        'hGetAll',
        'hKeys',
        'hMSet',
        'hMGet',
        'hMClear',
        'hIncrBy',
        'hScan',
        'hRevScan',
    ]
},
{
    name: '文件API',
    type: 'folder-add',
    list: [
        'openTempFile',
        'setLFileData',
        'temp2LFile',
        'uploadApp',
        'uploadAppFile',
        'createFileByData',
    ]
},
// {
//     name: '应用API',
//     type: 'appstore',
//     list: [
//         'version',
//         'unInstallApp',
//         'appinfo',
//         'appversions',
//         'apppackage',
//         'appids',
//         'appinfos',
//     ]
// },
{
    name: '系统API',
    type: 'windows',
    list: [
        'getVar',
        'act',
        'proxy',
    ]
},
];
export default data;