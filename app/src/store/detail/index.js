// detail仓库
import { getSkuid, getAddCar } from '@/api/index'
// 引入封装好的游客身份uuis----->生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'
export default {
    state: {
        detailData: {}, // 手机详情页数据
        uuid: getUUID()
    },
    mutations: {
        // 修改手机详情页数据
        GETDETAILDATA(state, result) {
            state.detailData = result
        }
    },
    actions: {
        // 发送产品详情页请求
        async getDetailData({ commit }, skuId) {
            let result = await getSkuid(skuId)
            if (result.code == 200) {
                commit('GETDETAILDATA', result.data)
            }
        },
        // 将产品添加到购物车中 或更新产品个数
        async addOrUpdateCard({ commit }, { skuId, skuNum }) {
            let result = await getAddCar(skuId, skuNum)
            if (result.code == 200) {
                return 'OK'
            } else {
                return Promise(new Error('失败了'))
            }
        }
    },
    getters: {
    },
}