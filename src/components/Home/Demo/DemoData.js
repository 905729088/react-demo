const data = [{
    name: '用户API',
    type: 'user',
    list: [
        'getVarByContext',
        'register',
        'login',
        'logout',
        'setUserInfo',
    ]
}, {
    name: '用户组API',
    type: 'team',
    list: [
        'usergroup',
        'userGroupCreate',
        'userGroupDestroy',
        'userGroupAddManager',
        'userGroupDelManager',
        'userGroupAddMember',
        'userGroupDelMember',
        'ugVerifyCode',
        'userGroupJoin',
        'userGroupSetInfo',
        'userGroupGetInfo',
        'grant',
        'checkRight',
    ]
},
{
    name: '数据库API-键命令',
    type: 'database',
    list: [
        'set',
        'get',
        'strLen',
        'del',
        'setData',
        'incr',
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
    name: '数据库API-List命令',
    type: 'bars',
    list: [
        'lPush',
        'lPop',
        'rPush',
        'rPop',
        'lRange',
        'lClear',
        'lMClear',
        'lIndex',
        'lLen',
        'lSet',
    ]
},
{
    name: '数据库API-集合',
    type: 'deployment-unit',
    list: [
        'sAdd',
        'sCard',
        'sClear',
        'sDiff',
        'sInter',
        'sMClear',
        'sMembers',
        'sRem',
        'sUnion',
    ]
},
{
    name: '数据库API-有序集合',
    type: 'block',
    list: [
        'zAdd',
        'zCard',
        'zCount',
        'zRem',
        'zScore',
        'zRank',
        'zRange',
        'zRangeByScore',
        'zRemRangeByScore',
        'zMClear',
        'zClear',
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
{
    name: '应用API',
    type: 'appstore',
    list: [
        'version',
        'unInstallApp',
        'appinfo',
        'appversions',
        'apppackage',
        'appids',
        'appinfos',
    ]
},
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