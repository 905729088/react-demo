import { G } from '../../components/ACommon/Api.js'
import { withRouter } from 'react-router-dom'
const lApi = G.api

class UserServer {
    constructor(){
        this.userData = null
        this.userGroup = null
        this.userInfo = null
        this.autoLogin()
    }
    getUserInfo(){
        this.isLogin() || this.toLogin()
        return this.userInfo
    }
    login(name, pass){
        return lApi.login(name, pass, 'byname').then(async userData => {
            localStorage.setItem('username', name)
            localStorage.setItem('password', pass)
            const userGroup = await this.getUserGroup()
            const userId = userData.user.id
            const isAdmin = userGroup.manangers.find(adminUserId => adminUserId === userId)
            this.userInfo = {
                name,
                userId,
                sid: userData.sid,
                bid: userGroup.id,
                userType: isAdmin ? 'user': 'admin',
                isAdmin: !!isAdmin,
            }
            sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            return userData
        })
    }
    getUserGroup(){
        return this.userGroup || (this.userGroup = lApi.getVar('', 'usergroup', 'GLOBAL_USER', 'name'))
    }
    logout(sid){
        return lApi.logout(sid, '').then(result => (this.clear(), result))
    }
    isLogin(){
        return !!this.userInfo
    }
    autoLogin(){
        const name = localStorage.getItem('username')
        const pass = localStorage.getItem('password')
        const userInfo = sessionStorage.getItem('userInfo')
        this.userInfo = JSON.parse(userInfo)
        if (name && pass) {
            !userInfo && this.login(name, pass)
        }else{
            this.clear()
        }
    }
    toLogin(){
        location.replace(location.origin + '/#/login')
    }
    clear(){
        localStorage.clear()
        sessionStorage.clear()
        this.userInfo = null
        this.userGroup = this.userData = Promise.reject()
    }
}
const userServer = new UserServer()
export default userServer
window.userServer = userServer
