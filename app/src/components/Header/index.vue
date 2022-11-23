<template>
    <div>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <!-- 没有用户名：未登录 -->
                        <p v-if="!userName">
                            <span>请</span>
                            <!-- 路由跳转 -->
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <!-- 登陆了 -->
                        <p v-else>
                            <a>{{ userName }}</a>
                            <a class="register" @click="exitUser" style="cursor: pointer;">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <a @click="goMyorder" style="cursor: pointer;">我的订单</a>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"
                            @keyup.enter="toSearch" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        // Home页面中的搜索按钮 点击跳转到 搜索路由组件
        toSearch() {
            // 路由传递参数：
            // 第一种：字符串形式
            // this.$router.push('/Search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
            // 第二种：模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种：对象方式
            // this.$router.push({
            //     name:'Search',
            //     params:{keyword:'' || undefined},
            //     query:{k:this.keyword.toUpperCase()}
            // })
            // let routeQuery = this.$route.query
            // console.log(routeQuery);
            if (this.$route.query) {
                this.$router.push({
                    name: 'Search',
                    params: { keyword: this.keyword || undefined },
                    query: this.$route.query
                })
            }
        },
        // 点击退出登录  需要发请求通知服务器退出[请求一些数据 如token]
        exitUser() {
            // try {
            //     // 如果退出成功  回到首页
            //     this.$store.dispatch('userLogOut')
            //     this.$router.push({ name: 'Home' })
            // } catch (error) {
            //     alert(error.message)
            // }
            if (confirm('是否退出登录？')) {
                // 如果退出成功  回到首页
                this.$store.dispatch('userLogOut')
                this.$router.push({ name: 'Home' })
            }else{
                alert('退出失败')
            }
        },
        // 点击 跳转到我的订单页面
        goMyorder() {
            this.$router.push({ name: 'MyOrder' })
        }
    },
    mounted() {
        // 通过全局事件总线清楚 input中的关键字
        this.$bus.$on('clear', () => {
            this.keyword = ''
        })
    },
    computed: {
        // 从user仓库中捞取用户名 
        userName() {
            return this.$store.state.user.userInfo.loginName
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>