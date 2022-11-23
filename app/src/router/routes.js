// 路由配置信息
export default [
    // Home首页
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/Home'),
        meta: { showFooter: true } // 组件是否显示v-show
    },
    // 登录页
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login')
    },
    // 注册页
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/pages/Register')
    },
    // search模块搜索
    {
        path: '/search/:keyword?', //:keyword? params传递 ?是可传可不传
        name: 'Search',
        component: () => import('@/pages/Search'),
        meta: { showFooter: true }, // footer组件是否显示v-show
        // props:true // 路由传递props参数
        props: ({ params, query }) => ({ keyword: params.keyword, k: query.k })
    },
    // 产品详情页
    {
        path: '/detail/:skuid?',
        name: 'Detail',
        component: () => import('@/pages/Detail'),
        meta: { showFooter: true } // footer组件是否显示v-show
    },
    {
        // 路由重定向
        path: '*',
        redirect: '/home'
    },
    {
        // 添加到购物车成功
        path: '/addcartsuccess/:color?',
        name: 'AddCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { showFooter: true } // footer组件是否显示v-show
    },
    // 购物车页面
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: () => import('@/pages/ShopCart'),
        meta: { showFooter: true } // footer组件是否显示v-show
    },
    // 提交订单页面
    {
        path: '/trade',
        name: 'Trade',
        component: () => import('@/pages/Trade'),
        meta: { showFooter: true }, // footer组件是否显示v-show
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 如果想去交易页面 必须从购物车页面过来
            if (from.path == '/shopcart') {
                next()
            } else {
                // 其他页面过来的原路返回(路径)
                next(false)
            }
        }
    },
    // 支付页面
    {
        path: '/pay',
        name: 'Pay',
        component: () => import('@/pages/Pay'),
        meta: { showFooter: true }, // footer组件是否显示v-show
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 如果从trade 提交订单页面来的放行
            if (from.path == '/trade') {
                next()
            } else {
                // 如果不是从提交订单页来的 原路返回
                next(false || '/')
            }
        }
    },
    // 支付成功页面
    {
        path: '/paysuccess',
        name: 'PaySuccess',
        component: () => import('@/pages/PaySuccess'),
        // meta: { showFooter: true } // footer组件是否显示v-show
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    // 个人中心查看订单页面
    {
        path: '/center',
        name: 'CenTer',
        component: () => import('@/pages/Center'),
        meta: { showFooter: true }, // footer组件是否显示v-show
        children: [ // 二级路由
            // 我的订单页面
            {
                path: 'myorder',
                name: 'MyOrder',
                component: () => import('@/pages/Center/myorder')
            },
            // 团购订单页面
            {
                path: 'grouporder',
                name: 'GroupOrder',
                component: () => import('@/pages/Center/grouporder')
            },
            {
                // 路由重定向
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    }
]