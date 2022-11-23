// 对外暴露  专门处理token的

// 存储Token
export const setToken = (token) => {
    localStorage.setItem('token', token)
}
// 读取Token
export const getToken = () => {
    return localStorage.getItem('token')
}
// 清空本地存储
export const removeToken = ()=>{
    localStorage.removeItem('token')
}