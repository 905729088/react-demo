<h1 id="api-data-deal">API使用说明</h1>

<h2 id="api-data-deal-install">安装</h2>

1. 脚手架安装
```
    npm install @leither/l-api
```

2. 静态页面，点击下载文件

<h2 id="api-data-deal-install">引入及初始化</h2>

1. 脚手架环境初始化 
>initLAPI(global, 'http://+url+/webapi/');

```
参数说明：
   global: 一般直接传入window, 微信小程序等平台需手动构造该对象
   url：leither所在服务器的ip地址，类型String
```
```
例：import { initLAPI } from "@leither/l-api";
    const G = {};
    const api = initLAPI(window, 'http://192.168.1.1/webapi/');
    G.api=api;

```

2. 静态页面，初始化
>initLAPI(global, 'http://+url+/webapi/');

```
参数说明：
   global:默认为null
   url：leither所在服务器的ip地址，类型String
```
```
例：<script src='./l-api.browser.js'></script>
   <script>
        window.G ={};
        let api = QxzLApi.initLAPI(null,'http://192.168.1.1/webapi/')
        window.G.api=api;
   </script>

```

<h2 id="api-data-deal-method">API使用方法</h2>

1. 通过回调函数来处理
```
    例：G.api.test(sid, 'test', data => {
            console.log('成功的回调', '返回的数据是：' + data)
        }, (name, err) => {
            console.log('失败的回调', 'API 名称是：' + name, '返回的错误信息是：' + err)
        })
```
2. 通过处理 Promise 的方式来处理
```
    例：G.api.test(sid, 'test').then(data => {
            console.log('成功的回调', '返回的数据是：' + data)
        }).catch((name, err) => {
            console.log('失败的回调', 'API 名称是：' + name, '返回的错误信息是：' + err)
        })
```

<h2 id="api-param-explain">通用API参数说明</h2>

| 参数 | 类型 | 说明 
- | - | -
| sid | String | 用户的 sid，登录时返回的 sid。
| DATA_ID | String | 数据区的id,通过 G.api.usergroupgetinfo('', '用户组id','DATA_ID')获取

<h1 id="api-system-Usrinfo">用户API</h1>

## getvarbycontext

* G.api.getvarbycontext(null, name, mapOpt)
> 获取硬件对应的签名。

| 参数 | 类型 | 说明 
- | - | -
| name | String | 正式发布：name='ppt'，测试环境：name='ppttest' or 'ppttest2'
| mapOpt | Object | 传入不同的对象会返回不同的签名，对象里属性对应的值必须为 String

```
例：G.api.getvarbycontext(null, 'ppt', {type: 'PC'})    // 获取 PC 端的硬件签名
```

## register

* G.api.register(JSON.stringify(userinfo))
> 注册用户

```
参数说明：
    userinfo：包含用户信息的JSON对象
    其中的参数包括：
        "name" //用户名，必须有
        "pass" //密码，必须有
        "ppt" //硬件签名
        "father" //用户的父级
```

```
例：注册一个用户名为小黄，密码为123456的用户
    G.api.register(JSON.stringify({
            name:'小黄',
            pass:'123456'
        }))
```

## login

1. G.api.login(name, pass, 'byname')
> 通过用户名密码登录

2. G.api.login(ppt,'','byppt2')
> 通过ppt的方式登录

| 参数 | 类型 | 说明 
- | - | -
name | String | 用户名
pass | String | 用户密码
ppt | String（JSON） | 硬件对应的签名

```
例：登陆小黄的账户
    G.api.login('小黄', '123456', 'byname')
```

## logout

* G.api.logout(sid,info)
> 用户登出，使用户的sid失效


| 参数 | 类型 | 说明 
- | - | -
sid | String | 用户登录凭证，用户的 sid，登录时返回的 sid。
info | String | 用户信息，一般为空


```
例：登出小黄的账户
    G.api.logout(sid,null)
```


## setuserinfo

* G.api.setuserinfo(sid, JSON.stringify(userinfo))
> 设置用户信息 

```
参数说明：
    userinfo：包含用户信息的JSON对象,必须要有验证信息（用户名、密码或者ppt的方式验证）,
    在属性前加上 new 用于设置、加上 del 用于删除。
    其中的参数包括：
        "name" //用户名
        "pass" //密码
        "ppt" //硬件签名
        "userid" //用户id，当前操作用户的id，针对无鉴权信息的用户
        "newname" //新的用户名，设置用
        "newpass" //新的密码，设置用
        "newppt" //新的通行证，设置用
        "delppt" //通行证Bindinfo，删除用
        "father" //用户的父级
```

```
例: 将小黄的密码修改为1234567
    let userInfo={
        name:'小黄', //用户名
        pass:'123456', //密码
        newpass:'1234567' //新密码
    }
    G.api.setuserinfo(sid,JSON.stringify(userinfo))
```




<h1 id="api-usergroup-stub">用户组API</h1>

| 参数 | 类型 | 说明 
- | - | -
| gid | String | 用户组id，生成用户组返回的id
| groupname | String | 组名称，如果为空，则使用用户名
| timeout | Number | 过期时间，单位 s
| userid | String | 用户的id
| verify | String | 验证码，通过 `G.api.ugverifycode(sid, gid, timeout)` 生成

## usergroup
* G.api.getvar('', 'usergroup', groupname, 'name') 

> 查询用户组信息

```
例：查询名为MY_TEST用户组的组信息
    G.api.getvar('', 'usergroup', 'MY_TEST', 'name',data=>{
        console.log('用户组信息',data);
    })
```

## usergroupcreate
* G.api.usergroupcreate(sid, groupname)

> 生成用户组

```
例：生成名为MY_TEST的用户组，并返回组id
    G.api.usergroupcreate(sid, 'MY_TEST',gid=>{
        console.log('用户组ID',gid);
    }) 
```

## usergroupdestroy

* G.api.usergroupdestroy(sid, gid)
> 销毁用户组

## usergroupaddmanager

* G.api.usergroupaddmanager(sid, gid, userid)
> 添加管理员

## usergroupdelmanager

* G.api.usergroupdelmanager(sid, gid, userid)
> 删除管理员

## usergroupaddmember

* G.api.usergroupaddmember(sid, gid, userid)
> 添加成员

## usergroupdelmember

* G.api.usergroupdelmember(sid, gid, userid)
> 删除数据组成员

## ugverifycode

* G.api.ugverifycode(sid, gid, timeout)
> 创建加入的验证码,如果原有的未过期，则返回，并设置新的 timeout

```
例：管理员在用户组生成一个时长为30分钟的验证码。
    G.api.ugverifycode(sid, gid,1800, verify => {
        console.log('验证码',verify);
    })
```

## usergroupjoin

* G.api.usergroupjoin(sid, gid, verify)

> 加入用户组

```
 例：用户通过验证码加入用户组
    G.api.usergroupjoin(sid, gid,verify)
```

## usergroupsetinfo

* G.api.usergroupsetinfo(sid, gid, k,v)

> 设置组信息

```
参数说明:
    k:数据区名
    v:数据区id
```

``` 
例:把名为DATA_ID的数据区的id设置为abcdefg
    G.api.usergroupsetinfo(sid, gid,'DATA_ID','abcdefg')
```

## usergroupgetinfo

* G.api.usergroupgetinfo(sid, gid, k)

> 获取组信息

```
参数说明:
    k:数据区名
```

```
例：获取名为DATA_ID的数据区的id
    G.api.usergroupgetinfo('', gid,'DATA_ID')
    
```

## grant(以后会删除这个接口)

* G.api.grant(sid,key,fileId,gid,right)

> 数据块授权

```
参数说明:
    key:主键，''代表全部
    fileId:数据区id,''代表全部
    right:liunx下的权限表达式,该参数不是字符串，是计算结果 ，一般为 256 * 7 + 7  
   256代表管理员  7代表全权限   后面的7表示用户的权限   0代表没有权限，4读取，1执行，2写入，7全权限1+2+4=7
```

``` 
例:把该用户下名为TEST的表的全部权限赋值给用户组
    G.api.grant(sid,'TEST','' gid,256 * 7 + 7)
```

## checkright(以后会删除这个接口)

* G.api.checkright(sid,gid,key,fileId,right)

> 检查对数据区操作权限

```
参数说明:
    key:主键，''代表全部
    fileId:数据区id,''代表全部
    right:liunx下的权限表达式,该参数不是字符串，是计算结果 ，一般为 256 * 7 + 7  
   256代表管理员  7代表全权限   后面的7表示用户的权限   0代表没有权限，4读取，1执行，2写入，7全权限1+2+4=7
```

``` 
例:检查本用户是否对TEST表具有操作权限
    G.api.checkright(sid,gid,'TEST','',7)
```


<h1 id="api-data-stub-key">数据库API-键命令</h1>

> 设置指定 key 的值

| 参数 | 类型 | 说明 
- | - | -
| key | String | 主键
| value | String (JSON) | 指定字段的值

## set
* G.api.set(sid, DATA_ID, key, value)

```
例：将小黄的信息存在主键中
    let userinfo={
        userid:'a123456',
        name:'小黄',
        age:'20',
        sex:'男'
    }
    userinfo=JSON.stringify(userinfo)
    G.api.set(sid, DATA_ID, '小黄',userinfo)
```

## get

* G.api.get(sid, DATA_ID, key)

> 获取指定 key 的值


```
例：获取小黄的用户信息
    G.api.get(sid, DATA_ID, '小黄',userinfo=>{
        console.log('小黄的信息',userinfo);
    })
```

## strlen
* G.api.strlen(sid, DATA_ID, key)

> 返回 key 所储存的字符串值的长度。


```
例：查询小黄的用户信息字符的长度
    G.api.strlen(sid, DATA_ID, '小黄',len=>{
        console.log('信息的长度',len);
    })

```

## del
* G.api.del(sid, DATA_ID, key)

> 该命令用于在 key 存在时删除 key

```
例：删除小黄的用户信息
    G.api.del(sid, DATA_ID, '小黄')
```

## setdata
* G.api.setdata(sid, DATA_ID, value)

> 该命令用于将数据存于数据库中并返回key

```
例：将小黄的信息存于数据库中
    let userinfo={
        userid:'a123456',
        name:'小黄',
        age:'20',
        sex:'男'
    }
    userinfo=JSON.stringify(userinfo)
    G.api.setdata(sid, DATA_ID, userinfo,id=>{
        console.log('数据id',id);
    })
```

## incr

* G.api.incr(sid, DATA_ID, key)

> 将 key 中储存的数字值增一

```
例：将小黄的信息存于数据库中
    let userinfo={
        userid:'a123456',
        name:'小黄',
        age:'20',
        sex:'男'
    }
    userinfo=JSON.stringify(userinfo)
    G.api.setdata(sid, DATA_ID, userinfo,id=>{
    console.log('数据id',id);
 })
 
```
<h1 id="api-data-stub-hash">数据库API-hash表</h1>

| 参数 | 类型 | 说明 
- | - | -
| key | String | 主键
| keys | Array | key的数组
| field | String | 字段
| fields | Array | field的数组
| value | String (JSON) | 指定字段的值

## hset

* G.api.hset(sid, DATA_ID, key, field, value)

> 设置键值

```
例：将用户的信息存到MY_USERINFO的表中
    let userinfo={
        userid:'a123456',
        name:'小黄',
        age:'20',
        sex:'男'
    }
    let field=userinfo.userid;
    userinfo=JSON.stringify(userinfo)
    G.api.hset(sid, DATA_ID, 'MY_USERINFO', field, userinfo)//如果没有MY_USERINFO表将会自动创建
```

## hdel

* G.api.hdel(sid, DATA_ID, key,field)

> 删除一个哈希表字段

```
例：将MY_USERINFO的表中小黄的信息删除掉
    let field='a123456';
    G.api.hdel(sid, DATA_ID, 'MY_USERINFO', field)
```

## hlen 

* G.api.hlen(sid, DATA_ID, key)

> 获取哈希表中字段的数量

```
例：获取MY_USERINFO的表中用户的个数
    G.api.hlen(sid, DATA_ID, 'MY_USERINFO',length=>{
        console.log('用户个数',length);
    })
```

## hget 

* G.api.hget(sid, DATA_ID, key, field)

> 获取存储在哈希表中指定字段的值

```
例：获取MY_USERINFO的表中小黄的用户信息
    let field='a123456';
    G.api.hget(sid, DATA_ID, 'MY_USERINFO',field,userinfo=>{
        console.log('用户信息',userinfo);
    })
```

## hgetall 

* G.api.hgetall(sid, DATA_ID, key)

> 获取在哈希表中指定 key 的所有字段和值

```
例：获取MY_USERINFO的表中所有用户信息
    G.api.hgetall(sid, DATA_ID, 'MY_USERINFO',userinfoArr=>{
        console.log('用户信息的数组',userinfoArr);
    })
```

## hkeys 

* G.api.hkeys(sid, DATA_ID, key)

> 获取所有哈希表中的字段

```
例：获取MY_USERINFO的表中所有的字段
    G.api.hkeys(sid, DATA_ID, 'MY_USERINFO',fieldArr=>{
        console.log('表中的所有字段',fieldArr);
    })

```

## hmset 

* G.api.hmset(sid, DATA_ID, key, field)

> 同时将多个 field-value (域-值)对设置到哈希表 key 中。

```
例：将二黄和三黄的用户信息添加到MY_USERINFO表中
    let userinfo1={
        userid:'b123456',
        name:'二黄',
        age:'21',
        sex:'男'
    }
    let userinfo2={
        userid:'c123456',
        name:'三黄',
        age:'22',
        sex:'男'
    }
    let userinfoArr=[];
    userinfoArr.push({field:userinfo1.userid,value:JSON.stringify(userinfo1)})
    userinfoArr.push({field:userinfo2.userid,value:JSON.stringify(userinfo2)})
    G.api.hmset(sid, DATA_ID, 'MY_USERINFO',...userinfoArr)
```

## hmget 

* G.api.hmget(sid, DATA_ID, key, ...fields)

> 获取所有给定字段的值

```
例：获取MY_USERINFO的表中二黄和三黄的用户信息
    let field1='b123456';
    let field2='c123456';
    let arr=[field1,field2];
    G.api.hmget(sid, DATA_ID, 'MY_USERINFO',...arr,userinfoArr=>{
    console.log('用户信息的数组',userinfoArr);
 })
```

## hmclear 

* G.api.hmclear(sid, DATA_ID, ...keys)

> 清空哈希表

```
例1：清空MY_USERINFO的表中所有的用户信息
    G.api.hmclear(sid, DATA_ID, 'MY_USERINFO')

例2：清空MY_USERINFO和MY_USERINFO1表
    let arr=['MY_USERINFO','MY_USERINFO1']
    G.api.hmclear(sid, DATA_ID, ...arr)
```

## hincrby 

* G.api.hincrby(sid, DATA_ID, key,delta)

> 为哈希表 key 中的指定字段的整数值加上增量 。
```
参数说明：
    delta:
```

```
例：建立一张MY_STORE表格，记录苹果的个数是100，又进货了100个苹果
    G.api.hset(sid, DATA_ID, 'MY_STORE', 'apple', 100)
    G.api.hincrby(sid, DATA_ID,'MY_STORE', 'apple', 100)
```

## hscan(不对外暴露)

* G.api.hscan(sid, DATA_ID, key,beginfield,match,count,inclusive)

> 通过正则表达式从前往后匹配fileId，查找需要的值

```
参数说明：
    beginfield:开始匹配的位置，类型为String，为空时，从第一个开始匹配
    match:正则匹配的内容，类型为String,空为不进行正则匹配
    count:查找的数量，类型为number，整数，0为查找全部符合条件的内容
    inclusive:查找是否包含与match一样的内容，true 包含，false 不包含，类型Boolearn
```

```
例：查找MY_USERINFO的表中带有黄字的用户信息
    G.api.hscan(sid, DATA_ID, 'MY_USERINFO','','黄',null,true,userinfoArr=>{
        console.log('带有黄字的全部用户信息',userinfoArr)
    })
```

## hrevscan(不对外暴露)

* G.api.hrevscan(sid, DATA_ID, key,beginfield,match,count,inclusive)

> 通过正则表达式从后往前匹配fileId，查找需要的值

```
参数说明：
    beginfield:开始匹配的位置，类型为String
    match:正则匹配的内容，类型为String,空为不进行正则匹配
    count:查找的数量，类型为number，整数，空为查找全部符合条件的内容
    inclusive:查找是否包含与match一样的内容，true 包含，false 不包含，类型Boolearn
```

```
例：查找MY_USERINFO的表中最后一个带有黄字的用户信息
    G.api.hrevscan(sid, DATA_ID, 'MY_USERINFO','','黄',1,true,userinfoArr=>{
        console.log('最后一个带有黄字的用户',userinfoArr)
    })
```
<h1 id="api-data-stub-list">数据库API-List命令</h1>

| 参数 | 类型 | 说明 
- | - | -
| DATA_ID | String | 数据区的id,通过 G.api.usergroupgetinfo('', '用户组id','DATA_ID')获取。
| key | String | 主键
| keys | Array | 主键的数组
| index | number | 列表索引
| value | String (JSON) | 指定字段的值

## lpush

* G.api.lpush(sid, DATA_ID, key,value)

> 将一个或多个值插入到列表头部

```
例：将小黄的信息存到名为TEST的列表中
    let userinfo={
        userid:'b123456',
        name:'小黄',
        age:'21',
        sex:'男'
    }
    userinfo=JSON.stringify(userinfo)}
    G.api.lpush(sid, DATA_ID,'TEST',userinfo)
```

## lpop

* G.api.lpop(sid, DATA_ID, key)

> 移出并获取列表的第一个元素

```
例：获取TEST列表中第一元素的值，并删除
    G.api.lpush(sid, DATA_ID, 'TEST',data=>{
        console.log('TEST列表中的第一个元素',data)
    })
```

## rpush

* G.api.rpush(sid, DATA_ID, key,value)

> 在列表中添加一个或多个值

```
例：将二黄和三黄的用户信息添加到TEST列表中
    let userinfo1={
        userid:'b123456',
        name:'二黄',
        age:'21',
        sex:'男'
    }
    let userinfo2={
        userid:'c123456',
        name:'三黄',
        age:'22',
        sex:'男'
    }
    let userinfoArr=[];
    userinfoArr.push(JSON.stringify(userinfo1))
    userinfoArr.push(JSON.stringify(userinfo2))
    G.api.rpush(sid, DATA_ID, 'TEST',...userinfoArr)
```

## rpop

* G.api.rpop(sid, DATA_ID, key,value)

> 移除并获取列表最后一个元素

```
例：获取并删除TEST列表中的最后一个元素
    G.api.rpop(sid, DATA_ID, 'TEST',data=>{
        console.log('TEST列表中的最后一个元素',data)
    })
```

## lrange

* G.api.lrange(sid, DATA_ID, key,start,stop)

> 获取列表指定范围内的元素

```
参数说明：
    start:开始的索引号，类型number
    stop:结束的索引号，类型number
```

```
例：获取TEST列表中第1个到第3个元素
    G.api.lrange(sid, DATA_ID, 'TEST',0,2,dataArr=>{
        console.log('TEST列表中第1个到第3个元素的值为',dataArr);
    })
```

## lclear

* G.api.lclear(sid, DATA_ID, key)

> 清空列表中的值

```
例：清空TEST列表
    G.api.lclear(sid, DATA_ID, 'TEST')
```

## lmclear

* G.api.lmclear(sid, DATA_ID, ...keys)

> 清空列表中的值

```
例：清空TEST列表和TEST1列表
    let arr=['TEST','TEST1'];
    G.api.lmclear(sid, DATA_ID, ...arr)
```

## lindex

* G.api.lindex(sid, DATA_ID, key,index)

> 通过索引获取列表中的元素

```
例：获取TEST列表中索引为1的元素
    G.api.lindex(sid, DATA_ID, 'TEST',1,data=>{
        console.log('索引为1元素值为',data)
    })
```

## llen

* G.api.llen(sid, DATA_ID, key)

> 获取列表长度

```
例：获取TEST列表的长度
    G.api.lindex(sid, DATA_ID, 'TEST',1,len=>{
        console.log('列表的长度',len)
    })
```

## lset

* G.api.lset(sid, DATA_ID, key,index,value)

> 通过索引设置列表元素的值

```
参数说明：
    index:为整数，且必须该索引是存在的
```

```
例：把小黄的信息设置在TEST列表中索引为1的元素
    let userinfo={
        userid:'b123456',
        name:'小黄',
        age:'22',
        sex:'男'
    }
    userinfo=JSON.stringify(userinfo)}
    G.api.lset(sid, DATA_ID,'TEST',1,userinfo)
```

<h1 id="api-data-stub-set">数据库API-集合</h1>


| 参数 | 类型 | 说明 
- | - | -
| DATA_ID | String | 数据区的id,通过 G.api.usergroupgetinfo('', '用户组id','DATA_ID')获取。
| key | String | 主键
| keys | Array | 主键的数组
| value | String (JSON) | 指定字段的值
| values | Array | value的数组

## sadd

* G.api.sadd(sid, DATA_ID, key, ...values)

> 将一个或多个元素加入到集合当中

```
例：将小黄和二黄的分数，加入到TEST集合中
    let userInfo1={name:'小黄',score:80}
    let userInfo2={name:'二黄',score:90}
    userInfo1=JSON.stringify(userInfo1)
    userInfo2=JSON.stringify(userInfo2)
    let arr=[userInfo1,userInfo2]
    G.api.sadd(sid, DATA_ID, 'TEST',...arr)
```

## scard

* G.api.scard(sid, DATA_ID, key)

> 返回集合中元素的数量。

```
例：获取TEST集合中元素的数量
    G.api.scard(sid, DATA_ID, 'TEST',len=>{
        console.log('EST集合中元素的数量',len)
    })
```

## sclear

* G.api.sclear(sid, DATA_ID, key)

> 清空集合

```
例：清空TEST集合中
    G.api.sclear(sid, DATA_ID, 'TEST')
```

## sdiff

* G.api.sdiff(sid, DATA_ID,...keys)

> 返回一个集合的全部成员，该集合是所有给定集合之间的差集。

```
例：获取TEST1和TEST2集合不同的元素
    let arr=['TEST1','TEST2']
    G.api.sclear(sid, DATA_ID, ...arr,dataArr=>{
        console.log('两个集合中不同的元素',dataArr)
    })
```

## sinter

* G.api.sinter(sid, DATA_ID, ...keys)

> 返回一个集合的全部成员，该集合是所有给定集合的交集。

```
例：获取TEST1和TEST2两个集合中相同的元素
    let arr=['TEST1','TEST2']
    G.api.sinter(sid, DATA_ID, ...arr,dataArr=>{
        console.log('两个集合中相同的元素',dataArr)
    })
```

## smclear

* G.api.smclear(sid, DATA_ID, ...keys)

> 将一个或多个集合清空

```
例：清空TEST1和TEST2两个集合
    let arr=['TEST1','TEST2']
    G.api.smclear(sid, DATA_ID, ...arr)
```

## smembers

* G.api.smembers(sid, DATA_ID, key)

> 返回集合中的所有成员。

```
例：获取TEST集合中全部的元素
    G.api.smembers(sid, DATA_ID,'TEST',dataArr=>{
        console.log('EST集合中全部的元素',dataArr)
    })
```

## srem

* G.api.srem(sid, DATA_ID, key, ...values)

> 移除集合中的一个或多个元素，不存在的 元素会被忽略。

```
例：将小黄和二黄从TEST集合中移除
    let userInfo1={name:'小黄',score:80}
    let userInfo2={name:'二黄',score:90}
    userInfo1=JSON.stringify(userInfo1)
    userInfo2=JSON.stringify(userInfo2)
    let arr=[userInfo1,userInfo2]
    G.api.srem(sid, DATA_ID, 'TEST',...arr)
 
```

## sunion

* G.api.sunion(sid, DATA_ID,...keys)

> 返回一个集合的全部成员，该集合是所有给定集合的并集。

```
例：获取TEST1和TEST2两个集合全部的元素
    let arr=['TEST1','TEST2']
    G.api.sunion(sid, DATA_ID, ...arr,dataArr=>{
        console.log('两个集合全部的元素',dataArr)
    })
 
```

<h1 id="api-data-stub-sorted">数据库API-有序集合</h1>

| 参数 | 类型 | 说明 
- | - | -
| DATA_ID | String | 数据区的id,通过 G.api.usergroupgetinfo('', '用户组id','DATA_ID')获取。
| key | String | 主键
| keys | Array | 主键的数组
| index | Number | 列表索引
| ScorePair | Function | 构造函数 function ScorePair(){this.score='';this.member=''}
| member | String | 构造函数ScorePair中的参数
| member | String | member的数组

## zadd
* G.api.zadd(sid, DATA_ID, key, ...ScorePair)

> 向有序集合添加一个或多个成员，或者更新已存在成员的分数

```
例：将小黄和二黄的分数，加入到TEST有序集合中
    function ScorePair(){
    }
    
    let userInfo1=new ScorePair();
    let userInfo2=new ScorePair();
    userInfo1.member='小黄';
    userInfo1.score='80;
    userInfo2.member='二黄';
    userInfo2.score=90;

    G.api.zadd(sid, DATA_ID, 'TEST',userInfo1)


    let arr=[userInfo1,userInfo2]
    G.api.zadd(sid, DATA_ID, 'TEST',...arr)
 
```

## zcard

* G.api.zcard(sid, DATA_ID, key)

> 获取有序集合的成员数

```
例：获取TEST有序集合的成员数
    G.api.zcard(sid, DATA_ID, 'TEST',len=>{
        console.log('有序集合的成员数',len)
    })
```

## zcount

* G.api.zcount(sid, DATA_ID, key,min,max)

> 计算在有序集合中指定区间分数的成员数

```
参数说明：
    min:最小值，类型number
    max：最大值，类型number
```

```
例：获取TEST有序集合中分数80到100之间的成员数
    G.api.zcount(sid, DATA_ID, 'TEST',80,100,len=>{
        console.log('列表的长度',len)
    })
```

## zrem

* G.api.zrem(sid, DATA_ID,key, ...members)

>移除有序集合中的一个或多个成员

```
例：移除TEST有序集合中的小黄
    let member1='小黄';
    let arr=[member1];
    G.api.zrem(sid, DATA_ID, 'TEST',...arr)
```

## zscore

* G.api.zscore(sid, DATA_ID, key,member)

> 返回有序集中，成员的分数值

```
例：获取小黄的分数
    G.api.zscore(sid, DATA_ID, 'TEST','小黄',score=>{
        console.log('小黄的分数',score)
    })
 
```

## zrank

* G.api.zrank(sid, DATA_ID, key,member)

> 返回有序集合中指定成员的索引

```
例：获取小黄在TEST有序集合中的位置
    G.api.zrank(sid, DATA_ID, 'TEST','小黄',index=>{
        console.log('小黄的位置编号',index)
    })
```

## zrange

* G.api.zrange(sid, DATA_ID, key,min,max)

> 通过索引区间返回有序集合成指定区间内的成员

```
参数说明：
    min:最小值，类型number
    max：最大值，类型number
```
```
例：获取[0,1]区间的数据
    G.api.zrange(sid, DATA_ID, 'TEST',0,1,dataArr=>{
        console.log('区间的数据',dataArr)
    })
```

## zrangebyscore

* G.api.zrangebyscore(sid, DATA_ID, key,min,max,offset,count)

> 返回有序集合中给定的分数区间的所有成员

```
参数说明：
    min:最小值，类型number
    max:最大值，类型number
    offset:偏移值，一般为0，
    count:获取成员的个数，-1为获取全部
```

```
例：获取70分到80分的数据 
    G.api.zrangebyscore(sid, DATA_ID, 'TEST',70,80,0,-1,dataArr=>{
        console.log('0分到80分的数据',dataArr)
    })
 
```

## zremrangebyscore

* G.api.zremrangebyscore(sid, DATA_ID, key,min,max)

> 返回有序集合中给定的分数区间的所有成员

```
参数说明：
    min:最小值，类型number
    max：最大值，类型number
```

```
例：获取70分到80分的数据
    G.api.zremrangebyscore(sid, DATA_ID, 'TEST',70,80,dataArr=>{
        console.log('0分到80分的数据',dataArr)
    })
```

## zmclear

* G.api.zmclear(sid, DATA_ID, ...keys)

> 清除有序集合

```
例：清空TEST集合和TEST1集合
    let arr=['TEST','TEST1'];
    G.api.zmclear(sid, DATA_ID,...arr)
```

## zclear

* G.api.zclear(sid, DATA_ID, key)

> 清除有序集合

```
例：清空TEST集合
    G.api.zclear(sid, DATA_ID, 'TEST')
```

<!-- 
不对外公开
* G.api.copyblock(sid, DATA_ID,from)

> 将备份数据库

* G.api.scan(sid, DATA_ID, begin, match,count,inclusive,tp)

> 迭代当前数据库中的数据库键。 -->

<h1 id="api-data-file">文件API</h1>

 参数 | 类型 | 说明 
- | - | -
tempFileId | String | 文件临时ID
fileId | String | 正式文件id
fileName |String |文件名称
start | Number | 数据开始写入的位置，一般为0
FileData |二进制文件 | 二进制文件
type |String | 文件类型  tar or zip
appName |String | 应用名称

## opentempfile

* G.api.opentempfile(sid)

> 申请临时文件id

## setlfiledata

* G.api.setlfiledata(sid,tempFileId, start, FileData)

> 生成临时文件，生成使用空间

## temp2lfile

* G.api.temp2lfile(sid,tempFileId)

> 生成正式文件id

## uploadapp

* G.api.uploadapp(sid, fileId,type)

> 发布应用,返回应用信息

```
例：上传test应用，并发布
    let file;//原生文件
    let type;//文件类型 tar or zip
    upload();
    async upload function(){
        let tempFileId=await G.api.opentempfile(sid);//申请临时文件id
        let FileData=await readBlob(file); //将原文件转换成二进制
        await G.api.setlfiledata(sid,tempFileId, 0, FileData); //生成临时文件，生成使用空间
        let fileId=await G.api.temp2lfile(sid,tempFileId); //生成正式文件id
        G.api.uploadapp(sid, fileId,type) //发布应用
    }

    readBlob(blob) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.readAsArrayBuffer(blob)
        })
    }
```

## uploadappfile

* G.api.uploadappfile(sid, appName, fileName, fileId)

> 更新应用中部分的源文件

```
例：更新test应用中main.html文件
    let file;//上传的main.html文件
    uploadfile();
    async uploadfile function(){
        let tempFileId=await G.api.opentempfile(sid);//申请临时文件id
        let FileData=await readBlob(file); //将原文件转换成二进制
        await G.api.setlfiledata(sid,tempFileId, 0, FileData); //生成临时文件，生成使用空间
        let fileId=await G.api.temp2lfile(sid,tempFileId); //生成正式文件id
        G.api.uploadapp(sid, 'test','main.html',fileId) //更新文件
    }

    readBlob(blob) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.readAsArrayBuffer(blob)
        })
    }
```

## createfilebydata

* G.api.createfilebydata(sid,conent)

> 更新文件内容

```
例：在线更新test应用中main.html文件
    let conent;//修改后文本内容
    uploadfile();
    async uploadfile function(){
        let fileId=await G.api.createfilebydata(sid, conent);
        G.api.uploadapp(sid, 'test','main.html',fileId) //更新文件
    }
```

<h1 id="api-data-app">应用API</h1>

## version

* G.api.version(sid, appName,'lastver','')

> 生成新的版本

## uninstallapp

* G.api.uninstallapp(sid, appName)

> 应用卸载

## appinfo

* G.api.getvar(sid, "appinfo", "appName or appId") 

> 获取应用信息

参数 | 类型 | 说明 
- | - | -
appId | String | 应用id
appName |String | 应用名称

```
例：获取TEST应用信息
    G.api.getvar(sid, "appinfo", "TEST",appinfo=>{
        console.log('TEST应用信息',appinfo)
    }) 
```

## appversions

* G.api.getvar(sid, "appversions", "appName or appId") 

> 获取应用版本信息

参数 | 类型 | 说明 
- | - | -
appId | String | 应用id
appName |String | 应用名称

```
例：获取TEST应用的版本信息
    G.api.getvar(sid, "appversions", "TEST",versionArr=>{
        console.log('TEST应用的版本信息',versionArr)
    }) 
 
```

## apppackage

* G.api.getvar(sid, "apppackage", "appName or appId",version) 

> 获取应用最新文件信息

参数 | 类型 | 说明 
- | - | -
appId | String | 应用id
appName |String | 应用名称
version |String|版本号，一般为last

```
例：获取TEST应用最新文件信息
    G.api.getvar(sid, "apppackage", "TEST",'last',apppackage=>{
        console.log('TEST应用文件信息',apppackage)
    }) 
```

## appids

* G.api.getvar(sid, "appids") 

> 获取应用id列表

```
例：获取本用户应用id列表
    G.api.getvar(sid, "appids",appidArr=>{
        console.log('本用户应用id列表',appidArr)
    }) 
 
```

## appinfos

* G.api.getvar(sid, "appinfos") 

> 获取具体应用信息列表  

```
例：获取本用户全部应用列表
    G.api.getvar(sid, "appinfos",appArr=>{
        console.log('本用户全部应用',appArr)
    }) 
 
```

<h1 id="api-system-stub">系统的API</h1>

## getvar

 G.api.getver(sid, name, ...arg)

> 根据 name 来获取对应的值，name 为 String 类型

| name (String) | arg | 返回值
 - | - | -
| now | 无 | 获取系统时间 
| capturemac | 无 | 获取探针开启状态，默认为 0 （开启），1 为 用户开启，2 为用户关闭
| ver | 无 | 获取版本号
| port | 无 | 获取端口号
| hostid | 无 | 获取hostid
| bindinfo | 无 | 获取用户设备信息
| usergroup | 'GLOBAL_USER', 'name' | 获取管理员组
| appinfo | 'appName' or 'appId' | 获取应用信息
| appversions | 'appName' or 'appId' | 获取应用版本信息
| apppackage | 'appName' or 'appId' | 获取应用最新文件信息
| appids | 无 | 获取应用id列表
| appinfos | 无|获取具体应用信息列表

```
例：G.api.getver(sid, 'now')    
    // 获取系统时间
    G.api.getvar(sid, 'usergroup', 'GLOBAL_USER', 'name')  
    //查找管理员组
```

## act

G.api.act(sid, name, ...arg)

> 根据 name 来获取对应的值，name 为 String 类型

| name (String) | arg | 返回值
 - | - | -
| subscrimacInfo | 无 | 订阅mac数据
| capturemac |'start' | 打开网卡探测

```
例：1. 订阅mac数据
    G.api.act(sid, 'subscrimacInfo')

    2.打开网卡探测
    G.api.act(sid, 'capturemac', 'start')
```



## proxy

| 参数 | 类型 | 说明 
- | - | -
| url | String | 要代理的路径
| header | Object | 请求头部，默认为null
| postContent | * | 发送的内容

1. G.api.proxyget(sid, url)
> 开启 get 代理

```
例：开启代理请求http://localhost:5758/mytest接口,并发送TEST字符串
    G.api.proxyget(sid, 'http://localhost:5758/mytest?data='TEST'')
    
```

2. G.api.proxypost(sid, url, header, postContent)
> 开启 post 代理

```
 例：开启代理请求http://localhost:5758/mytest接口,并发送TEST字符串
    G.api.proxypost(sid, 'http://localhost:5758/mytest',null,JSON.stringify({data:'TEST'})) 
```


