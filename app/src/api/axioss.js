// axios的二次封装
import axios from 'axios'
import nProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import detail from '@/store/detail'
import user from '@/store/user/index'
const axioss = axios.create({
    baseURL: '/api',
    timeout: 5000
})
// 请求拦截器
axioss.interceptors.request.use((config) => {
    // 请求头添加一个字段 把uuid临时身份传过去 userTempId
    if (detail.state.uuid) {
        config.headers.userTempId = detail.state.uuid
    }
    // 请求头传递 token
    if(user.state.token){
        config.headers.token = user.state.token
    }
    nProgress.start() // 进度条开始
    // config：配置对象，对象里面有一个属性 hearder请求头
    return config
})

// 相应拦截器
axioss.interceptors.response.use((response) => {
    // 成功回调的函数：服务器响应的数据回来以后，响应拦截器可以检测到，可以处理一些事情
    nProgress.done()  // 进度条结束

    return response.data

}, (error) => {

    return Promise.reject(new Error('faile'))
})

// 对外暴露
export default axioss