import { getUserAddress,getTrade } from '@/api/index'
// 提交订单仓库
export default {
    state: {
        address:[], // 存储用户地址信息
        OrderInfo:{} // 存储商品数据清单
    },
    mutations: {
        // 存储用户信息
        GETUSERADDRESS(state,address){
            state.address = address
        },
        // 存储商品交易页数据清单
        GETTRADE(state,OrderInfo){
            state.OrderInfo = OrderInfo
        }
    },
    actions: {
        // 获取用户地址信息
        async getUserAddress({ commit }) {
            let result = await getUserAddress()
            // console.log(result)
            if(result.code == 200){
                commit('GETUSERADDRESS',result.data)
            }
        },
        // 获取商品交易页数据信息
        async getTrade({commit}){
            let result = await getTrade()
            // console.log(result)
            if(result.code == 200){
                commit('GETTRADE',result.data)
            }
        }
    },
    getters: {},
}