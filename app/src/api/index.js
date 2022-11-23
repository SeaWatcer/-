// 当前这个模块：API进行统一管理
import axios from '@/api/axioss'
import mock from '@/api/mockAjax'
// 三级联动的接口   /api/product/getBaseCategoryList   get请求  无参数

export const reqCate = () => { // 三级联动数据接口
    // 发请求：axios发请求返回的是promise对象
    return axios({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}
// 获取banner（Home首页轮播图数据接口）
export const getBanner = () => mock.get('/banner')

// 获取floor （floor组件中的轮播图数据接口）
export const getfloor = () => mock.get('/floor')

// 获取搜索模块数据 接口地址：/api/list   请求方式是post  需要带参数
export const getSearchData = (params) => axios({
    url: '/list',
    method: 'post',
    data: params
})

// 获取产品详情数据接口--------/api/item/{ skuId }
export const getSkuid = (skuId) => axios({
    url: `/item/${skuId}`,
    method: 'get'
})

// 添加到购物车接口（对已有的商品数量进行改动）     /api/cart/addToCart/{ skuId }/{ skuNum }
export const getAddCar = (skuId, skuNum) => axios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// 获取购物车列表数据接口     /api/cart/cartList    get 请求
export const getCartList = () => axios({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车某个产品数据接口  /api/cart/deleteCart/{skuId}   DELETE请求
export const deleteList = (skuId) => axios({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 切换商品选中状态接口          /api/cart/checkCart/{skuId}/{isChecked}
export const getUpOrdateById = (skuId, isChecked) => axios({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
// 获取验证码接口   /api/user/passport/sendCode/{phone}  GET请求
export const getCode = (phone) => axios({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})
// 注册用户接口 /api/user/passport/register  POST请求 参数：{phone,password,code}
export const getUserRegister = (data) => axios({
    url: '/user/passport/register',
    data,
    method: 'post'
})

// 登录页面接口   /api/user/passport/login  post请求     带参   phone password
export const getUserLogin = (data) => axios({
    url: '/user/passport/login',
    data,
    method: 'post'
})
// token检验 获取用户信息接口 /api/user/passport/auth/getUserInfo  get请求 请求头带token值
export const getUserInfo = () => axios({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})
// 退出登录  /api/user/passport/logout  get请求
export const LoginOut = () => axios({
    url: '/user/passport/logout',
    method: 'get'
})
// 获取用户地址信息接口  /api/user/userAddress/auth/findUserAddressList get请求 无参数
export const getUserAddress = () => axios({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
// 获取产品交易页信息   /api/order/auth/trade   get请求
export const getTrade = () => axios({
    url: '/order/auth/trade',
    method: 'get'
})
// 提交订单到支付页面携带参数接口  /api/order/auth/submitOrder?tradeNo={tradeNo}  post请求
export const getPay = (tradeNo, data) => axios({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})
// 获取订单支付信息接口  /api/payment/weixin/createNative/{orderId}
export const getPayment = (orderId) => axios({
    url: `/payment/weixin/createNative/${orderId}`,
    method:'get'
}) 
// 查询支付订单状态接口  /api/payment/weixin/queryPayStatus/{orderId}   GET请求
export const geQueryPaymentStatus = (orderId)=>axios({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
// 获取我的订单列表接口 /api/order/auth/{page}/{limit}    get请求
// page	string	Y	页码         limit	string	Y	每页显示数量
export const getMyOrder = (page,limit)=>axios({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})



