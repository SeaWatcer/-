<template>
  <div> 
    <Header/>
    <!-- 路由组件显示的地方 -->
      <router-view></router-view>
      <!-- Footer组件在 Home、Search显示，在login、register是隐藏 -->
    <Footer v-show="showFooter"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  computed:{
    // 根据路由中的meta属性判断 Footer组件是否显示
    showFooter(){
      return this.$route.meta.showFooter
    }
  },
  mounted(){
    // 组件挂载完毕：就可以向服务器发请求 获取三级列表的数据
    this.$store.dispatch('cateList')
  }
}
</script>

<style>

</style>
