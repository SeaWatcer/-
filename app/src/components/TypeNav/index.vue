<template>
    <div>
        <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
                <!--  -->
                <h2 class="all" @mouseenter="all" @mouseleave="leave">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 三级联动 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委托 + 编程式路由导航完成路由跳转 和 传递参数 -->
                        <div class="all-sort-list2">
                            <!-- 一级分类 -->
                            <div class="item" v-for="(c1,index) in tabList" :key="c1.categoryId"
                                :class="{cur: currentIndex == index}">
                                <h3 @mouseenter="changeIndex(index)" @mouseleave="leaveIndex"
                                    :style="{cursor:'pointer'}">
                                    <a @click="toSearch(c1)">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级、三级分类的区域 -->
                                <div class="item-list clearfix">
                                    <!-- 二级分类 -->
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a @click="toSearch(c2)"
                                                    :style="{cursor:'pointer'}">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a @click="toSearch(c3)"
                                                        :style="{cursor:'pointer'}">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
// 按需引入 : 节流
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储三级联动的索引值（同用替换类名 修改样式）
            currentIndex: -1,
            show: true
        }
    },
    // 组件挂载完毕：App组件获取三级联动数据 
    mounted() {
        // this.$store.dispatch('cateList')
        // 组件挂载完毕，让show的属性变为false TypeNav 的显示与隐藏
        if (this.$route.path != '/home') {
            this.show = false
        } else {
            this.show = true
        }
    },
    computed: {
        // 获取Home仓库中的三级联动数据 进行遍历渲染
        tabList() {
            return this.$store.state.home.tabList
        },
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性
        // 添加节流 throttle
        changeIndex: throttle(function (index) {
            this.currentIndex = index
            console.log('节流');
        }, 50),
        // 鼠标移出 索引为-1
        leaveIndex() {
            this.currentIndex = -1
        },
        // 给全部商品分类添加鼠标进入事件
        all() {
            this.currentIndex = 0
        },
        // 全部商品移出鼠标去除 下方列表样式
        leave() {
            this.currentIndex = -1
        },
        // 1\2\3级菜单点击跳转Search 页面并携带参数
        toSearch(cc) {
            // 最好的解决方案：编程时路由导航 + 事件委托
            // 事件委托存在一些问题：点击一定是a标签 2.如何获取参数【1、2、3级分类产品的名字、ID】
            // console.log(cc);
            // let routeParams = {params:this.$route.params,query:this.$route.query}
            if (this.$route.params) { // 如果当前route 有params参数
                this.$router.push({
                    name: 'Search',
                    query: { categoryName: cc.categoryName, categoryId: cc.categoryId },
                    params: this.$route.params

                })
            }
        },
        // 控制show 鼠标移入的 值为 true 显示三级联动
        enterShow() {
            this.show = true
        },
        // 控制show 鼠标移入的 值为 false 隐藏三级联动
        leaveShow() {
            if (this.$route.name != 'Home') {
                this.show = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }

                        // :style="{display:currentIndex == index? 'block' : 'none'}"
                    }
                }
            }
        }

        // 过度动画样式
        //过度动画开始状态（进入）
        .sort-enter {
            height: 0px;
            background-color: skyblue;
        }

        //过度动画结束状态
        .sort-enter-to {
            height: 461px;
        }

        // 定义动画时间、速率
        .sort-enter-active {
            transition: all 0.5s;
        }
    }

    .cur {
        background: skyblue;
    }

}
</style>