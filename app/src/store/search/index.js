// search仓库
import { getSearchData } from '@/api/index'
export default{
    state:{
        ListPhone:{},// 手机品牌详情信息
    },
    mutations:{
        // 修改手机品牌详情信息
        GETSEARCHDATA(state,resultData){
            state.ListPhone = resultData
        },
    },
    actions:{
        // 获取手机品牌详情信息
        async getSearchData(contest,params={}){
            let result = await getSearchData(params) // 切记传默认的空对象 不然获取不到
            console.log(result);
            if(result.code == 200){
                contest.commit('GETSEARCHDATA',result.data)
            }
        }
    },
    getters:{
        goodsList(state){
            return state.ListPhone.goodsList
        },
        trademarkList(state){
            return state.ListPhone.trademarkList
        },
        attrsList(state){
            return state.ListPhone.attrsList
        }
    },
}
