// 引入Vue
import Vue from 'vue'
import Vuex from 'vuex'
import search from '@/store/search/index' // 引入search模块仓库
import home from '@/store/home'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import user from '@/store/user'
import trade from '@/store/trade'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        search,
        home,
        detail,
        shopcart,
        user,
        trade
    }
})