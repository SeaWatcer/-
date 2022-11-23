<template>
  <div>
    <!-- 三级联动导航组件 -->
    <TypeNav/>

    <!-- 轮播图及右边快捷快报组件 -->
    <ListContainer/>

    <!-- 今日推荐 -->
    <TodayRecommend/>

    <!-- 热卖排行 -->
    <Rank/>

    <!-- 猜你喜欢 --> 
    <Like/>

    <!-- 楼层 -->
    <Floor v-for="item in floorList" :key="item.id" :list="item"/>

    <!-- 商标 -->
    <Brand/>
  </div>
</template>

<script>
  import TypeNav from '@/components/TypeNav'
  import ListContainer from '@/pages/Home/ListContainer'
  import TodayRecommend from '@/pages/Home/TodayRecommend'
  import Rank from '@/pages/Home/Rank'
  import Like from '@/pages/Home/Like'
  import Floor from '@/pages/Home/Floor'
  import Brand from '@/pages/Home/Brand'
export default {
  name: 'Home',
  components:{
    TypeNav,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
      mounted(){
        // 向Home仓库发送请求 获取轮播图数据
        this.$store.dispatch('getfloorData')
        // // 向服务器发请求 获取用户的个人信息 (user仓库)
        // this.$store.dispatch('getUserInfo')
    },
    computed:{
        floorList(){
            return this.$store.state.home.floorList
        }
    }
}
</script>

<style>

</style>