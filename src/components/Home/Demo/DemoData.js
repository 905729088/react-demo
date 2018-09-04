const data = [{
        key: 'sub1',
        name: '用户API',
        type: 'user',
        list: [{
                key: '1',
            name: 'getVarByContext',
            },
            {
                key: '2',
                name: 'register'
            },
            {
                key: '3',
                name: 'login'
            }, {
                key: '4',
                name: 'logout'
            },
            {
                key: '5',
                name: 'setUserInfo'
            }
        ]
    }, {
        key: 'sub2',
        name: '用户组API',
        type: 'team',
        list: [{
                key: '6',
                name: 'usergroup'
            },
            {
                key: '7',
                name: 'userGroupCreate'
            },
            {
                key: '8',
                name: 'userGroupDestroy'
            }, {
                key: '9',
                name: 'userGroupAddManager'
            },
            {
                key: '10',
                name: 'userGroupDelManager'
            },
            {
                key: '11',
                name: 'userGroupAddMember'
            },
            {
                key: '12',
                name: 'userGroupDelMember'
            },
            {
                key: '13',
                name: 'ugVerifyCode'
            },
            {
                key: '14',
                name: 'userGroupJoin'
            }, {
                key: '15',
                name: 'userGroupSetInfo'
            }, {
                key: '16',
                name: 'userGroupGetInfo'
            }, {
                key: '17',
                name: 'grant'
            }, {
                key: '18',
                name: 'checkRight'
            }
        ]
    },
    {
        key: 'sub3',
        name: '数据库API-键命令',
        type: 'database',
        list: [{
                key: '19',
                name: 'set'
            },
            {
                key: '20',
                name: 'get'
            },
            {
                key: '21',
                name: 'strLen'
            }, {
                key: '22',
                name: 'del'
            },
            {
                key: '23',
                name: 'setData'
            },
            {
                key: '24',
                name: 'incr'
            }
        ]
    },
    {
        key: 'sub4',
        name: '数据库API-hash表',
        type: 'table',
        list: [{
                key: '25',
                name: 'hSet'
            },
            {
                key: '26',
                name: 'hDel'
            },
            {
                key: '27',
                name: 'hLen'
            }, {
                key: '28',
                name: 'hGet'
            },
            {
                key: '29',
                name: 'hGetAll'
            },
            {
                key: '30',
                name: 'hKeys'
            },
            {
                key: '31',
                name: 'hMSet'
            },
            {
                key: '32',
                name: 'hMGet'
            },
            {
                key: '33',
                name: 'hMClear'
            },
            {
                key: '34',
                name: 'hIncrBy'
            },
            {
                key: '35',
                name: 'hScan'
            },
            {
                key: '36',
                name: 'hRevScan'
            }
        ]
    },
    {
        key: 'sub5',
        name: '数据库API-List命令',
        type: 'bars',
        list: [{
                key: '37',
                name: 'lPush'
            },
            {
                key: '38',
                name: 'lPop'
            },
            {
                key: '39',
                name: 'rPush'
            }, {
                key: '40',
                name: 'rPop'
            },
            {
                key: '41',
                name: 'lRange'
            },
            {
                key: '42',
                name: 'lClear'
            },
            {
                key: '43',
                name: 'lMClear'
            },
            {
                key: '44',
                name: 'lIndex'
            },
            {
                key: '45',
                name: 'lLen'
            },
            {
                key: '46',
                name: 'lSet'
            }
        ]
    },
    {
        key: 'sub6',
        name: '数据库API-集合',
        type: 'deployment-unit',
        list: [{
                key: '47',
                name: 'sAdd'
            },
            {
                key: '48',
                name: 'sCard'
            },
            {
                key: '49',
                name: 'sClear'
            }, {
                key: '50',
                name: 'sDiff'
            },
            {
                key: '51',
                name: 'sInter'
            },
            {
                key: '52',
                name: 'sMClear'
            },
            {
                key: '53',
                name: 'sMembers'
            },
            {
                key: '54',
                name: 'sRem'
            },
            {
                key: '55',
                name: 'sUnion'
            }
        ]
    },
    {
        key: 'sub7',
        name: '数据库API-有序集合',
        type: 'block',
        list: [{
                key: '56',
                name: 'zAdd'
            },
            {
                key: '57',
                name: 'zCard'
            },
            {
                key: '58',
                name: 'zCount'
            }, {
                key: '59',
                name: 'zRem'
            },
            {
                key: '60',
                name: 'zScore'
            },
            {
                key: '61',
                name: 'zRank'
            },
            {
                key: '62',
                name: 'zRange'
            },
            {
                key: '63',
                name: 'zRangeByScore'
            },
            {
                key: '64',
                name: 'zRemRangeByScore'
            },
            {
                key: '65',
                name: 'zMClear'
            },
            {
                key: '66',
                name: 'zClear'
            }
        ]
    },
    {
        key: 'sub8',
        name: '文件API',
        type: 'folder-add',
        list: [{
                key: '67',
                name: 'openTempFile'
            },
            {
                key: '68',
                name: 'setLFileData'
            },
            {
                key: '69',
                name: 'temp2LFile'
            }, {
                key: '70',
                name: 'uploadApp'
            },
            {
                key: '71',
                name: 'uploadAppFile'
            },
            {
                key: '72',
                name: 'createFileByData'
            }
        ]
    },
    {
        key: 'sub9',
        name: '应用API',
        type: 'appstore',
        list: [{
                key: '73',
                name: 'version'
            },
            {
                key: '74',
                name: 'unInstallApp'
            },
            {
                key: '75',
                name: 'appinfo'
            }, {
                key: '76',
                name: 'appversions'
            },
            {
                key: '77',
                name: 'apppackage'
            },
            {
                key: '78',
                name: 'appids'
            },
            {
                key: '79',
                name: 'appinfos'
            }
        ]
    },
    {
        key: 'sub10',
        name: '系统API',
        type: 'windows',
        list: [{
                key: '80',
                name: 'getVar'
            },
            {
                key: '81',
                name: 'act'
            },
            {
                key: '82',
                name: 'proxy'
            }
        ]
    },
];
export default data;