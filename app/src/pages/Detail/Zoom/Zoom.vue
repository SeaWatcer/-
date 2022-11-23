<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handele"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 蒙版--遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0 // 兄弟传过来的索引进行替换 响应式数据
    }
  },
  props: ['skuImageList'],
  computed: {
    // props接收父组件的数据 进行二次处理 防止出现undefined
    imgObj() {
      return this.skuImageList[this.currentIndex] || {} // 
    }
  },
  mounted() {
    // 全局事件总线：获取兄弟组件传过来的数据(索引值)
    this.$bus.$on('getIndex', (index) => {
      // 修改当前 data中的响应式数据
      this.currentIndex = index
    })
  },
  methods:{
    handele(event){
      let mask = this.$refs.mask
      let big = this.$refs.big
      // 获取遮罩层 left--------距离 左侧大盒子边缘的距离 鼠标的offsetX - 盒子自身宽度的一半
      let left = event.offsetX - mask.offsetWidth/2;
      // 获取遮罩层 top--------距离 左侧大盒子上方的距离 鼠标的offsetY - 盒子自身高度的一半
      let top = event.offsetY - mask.offsetHeight/2;

      // 约束范围
      if(left <= 0) left = 0
      if(left >= mask.offsetWidth) left = mask.offsetWidth
      if(top <= 0) top = 0
      if(top >= mask.offsetHeight) top = mask.offsetHeight
      // 修改元素的left|top属性值
      mask.style.left = `${left}px` // ES6模板字符串写法
      mask.style.top = top +'px'

      // 右侧大图也需要修改
      big.style.left = `${-left*2}px`
      big.style.top = -top * 2 +'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>