import { getCartList, deleteList, getUpOrdateById } from '@/api/index'
export default {
    state: {
        cartList: [] // 存储 添加到购物车购物车数据
    },
    mutations: {
        GETSHOPCART(state, cartList) {
            state.cartList = cartList
        }
    },
    actions: {
        // 获取购物车列表数据
        async getShopCart({ commit }) {
            let result = await getCartList()
            if (result.code == 200) {
                commit('GETSHOPCART', result.data[0].cartInfoList)
            }
            // console.log(result.data[0].cartInfoList)
        },
        // 删除某个产品的数据
        async deleteCartList({ commit }, skuId) {
            let result = await deleteList(skuId)
            if (result.code == 200) {
                return 'OK'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 修改某个产品的复选框状态
        async dateCartChecked({ commit }, { skuId, isChecked }) {
            let result = await getUpOrdateById(skuId, isChecked);
            // console.log(result)
            if (result.code == 200) {
                return 'OK'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除所有选中的产品
        deleteAllCart({ dispatch, state }) {
            // 拿到购物车中所有的产品进行遍历
            let cartList = state.cartList
            let promiseAll = []
            // ---------------------------------------
            // let promise = item.isChecked == 1? dispatch('deleteCartList',item.skuId) : '';
            cartList.forEach(item => {
                if (item.isChecked == 1) {
                    let promise = dispatch('deleteCartList', item.skuId)
                    promiseAll.push(promise)
                }
            })
            // 只要p1|p2|p3...都成功 返回的就是成功 有一个失败则为失败
            return Promise.all(promiseAll)
        },
        // 点击全选 or 取消全选产品状态
        UpdateAllChecked({state,dispatch},isChecked){
            let promiseAll = []
            let cartList = state.cartList
            console.log(isChecked)
            cartList.forEach(item =>{
                let promise = dispatch('dateCartChecked',{skuId:item.skuId,isChecked})
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    getters: {},
}