import { getCode, getUserRegister, getUserLogin, getUserInfo, LoginOut } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'
// 登录与注册仓库
export default {
    state: {
        code: '', // 验证码
        token: getToken(), // 登录令牌
        userInfo: {}
    },
    mutations: {
        // 将验证码存放到state中的code里
        GETCODE(state, code) {
            state.code = code
        },
        // 存储token
        GOLOGIN(state, token) {
            state.token = token
        },
        // 存储用户登录成功的信息
        GETUSERINFO(state, user) {
            state.userInfo = user
        },
        // 清除用户信息 token userInfo
        CLEARUSER(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    },
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            let result = await getCode(phone)
            console.log(result)
            if (result.code == 200) {
                commit('GETCODE', result.data)
                return 'OK'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 注册用户
        async getUser({ commit }, { phone, password, code }) {
            let result = await getUserRegister({ phone, password, code })
            console.log(result)
            if (result.code == 200) {
                return 'OK'
            } else {
                // return Promise.reject(new Error('faile'))
                return Promise.reject(new Error(`注册失败:${result.message}`))
                // return result.message
            }
        },
        // 登录页面
        async goLogin({ commit }, { phone, password }) {
            let result = await getUserLogin({ phone, password })
            if (result.code == 200) {
                // 持久化token
                setToken(result.data.token)
                commit('GOLOGIN', result.data.token)
                return 'OK'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //获取用户信息接口
        async getUserInfo({ commit }) {
            let result = await getUserInfo()
            if(result.code == 200){
                commit('GETUSERINFO', result.data)
                return 'OK'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 退出登录
        async userLogOut({ commit }) {
            let result = await LoginOut()
            console.log(result)
            if(result.code==200){
                commit('CLEARUSER')
                return 'OK'
            }else{
                return Promise(new Error('faile'))
            }
        }
    },
    getters: {},
}