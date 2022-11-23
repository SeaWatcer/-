// home仓库
import { reqCate ,getBanner,getfloor } from '@/api/index'
export default {
    state: {
        tabList: [], // TypeNav三级列表数据
        bannerList:[], // ListContainer 轮播图数据
        floorList:[] // floor组件 中轮播图数据
    },
    mutations: {
        CATELIST(state, resultdata) { // 把三级联动的数据存储到 state中--tabList
            state.tabList = resultdata
            state.tabList.length = 16
        },
        GETBANNERDATA(state,resultdata){ // 把向mock获取的数据 存储到state中--bannerList
            state.bannerList = resultdata
        },
        GETFLOORDATA(state,resultdata){
            state.floorList = resultdata
        }
    },
    actions: {
        // 通过api中的接口函数 向服务器获取三级列表数据
        async cateList(contest) {
            let result = await reqCate()
            if (result.code === 200) {
                contest.commit('CATELIST', result.data)
            }
        },
        //发送mock 获取 首页轮播图数据
        async getBannerData(contest){
            let result = await getBanner()
            if(result.code = 200){
                contest.commit('GETBANNERDATA',result.data)
            }
        },
        // 发送mock请求 获取floor轮播图数据
        async getfloorData(context){
            let result = await getfloor()
            if(result.code == 200){
                context.commit('GETFLOORDATA',result.data)
            }
        }
    },
    getters: {},
}