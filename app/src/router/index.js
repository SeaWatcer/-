import Vue from 'vue'// 引入Vue
import VueRouter from 'vue-router' // 引入路由
Vue.use(VueRouter) // 使用路由
import store from '@/store/index' // 引入仓库

import routes from '@/router/routes' // 引入路由配置对象
// 重写 push | replace
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 重写 push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
// 重写 replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch((err) => err)
}




// 创建路由实例
let router = new VueRouter({
  // 配置路由
  routes: routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 } // Y代表滚动条的位置
  }
})

// 全局路由守卫 前置守卫
router.beforeEach(async (to, from, next) => {
  // next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.loginName
  // 用户已经登录了
  if (token) {
    // 登录状态下还想去登陆页面login 直接pass
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
      console.log(111)
    } else {
      // 登陆了 但是去 不是登录页面login  有可能去的是search|detail|shopcart
      if (name) {
        next()
      } else {
        try {
          // 获取用户信息成功
          // 向服务器发请求 获取用户的个人信息 (user仓库)
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token 失效了 获取不到用户信息  重新登陆
          alert('获取用户信息失败，请重新登陆')
          // 清除token
          await store.dispatch('userLogOut') // user仓库中的退出登录清空token事件
          next('/login')
        }
      }
    }
  } else {
    // 用户没登录状态
    let arr = ['/shopcart', '/trade', '/pay', '/paysuccess', '/center', '/center/myorder', '/Center', '/Center/myorder']
    // console.log(arr)
    arr.forEach(item => {
      if (to.path == item) {
        alert('请先登录')
        next(`/login?redirect=${item}`)
      } else {
        next()
      }
    })

    // let toPath = to.path
    // if(toPath.indexOf('/shopcart') !=-1 || toPath.indexOf('/center') !=-1 || toPath.indexOf('/pay') !=-1){
    //   alert('请先登录')
    //   next('/login')
    // }
  }
})


export default router