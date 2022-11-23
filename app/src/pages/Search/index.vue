<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removecategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removekeyword">x</i></li>
            <!-- tranmark面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removetrademark">x</i></li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}<i @click="removeattrValue(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trnkmarkInfo="trnkmarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li :class="{ 'active': activeOne }" @click="changeOrder(1)">
                  <a>综合 <span v-show="activeOne"
                      :class="{ 'iconfont icon-arrowup': isAsc, 'iconfont icon-arrowdown': isDesc }"></span></a>
                  <!-- icon-arrowup -->
                </li>
                <li :class="{ 'active': activeTwo }" @click="changeOrder(2)">
                  <a>价格 <span v-show="activeTwo"
                      :class="{ 'iconfont icon-arrowup': isAsc, 'iconfont icon-arrowdown': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a  @click="toDetail(good.id)"><img :src="good.defaultImg" /></a> -->
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
            @getpageNo="getpageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 子组件
import SearchSelector from './SearchSelector/SearchSelector'
// 三级联动组件
import TypeNav from '@/components/TypeNav/index.vue';
// 分页器组件
import Pagination from '@/components/Pagination';
export default {
  name: 'Search',
  components: {
    SearchSelector,
    TypeNav,
    Pagination
  },
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        "categoryId": '',
        // 一级菜单的ID
        "category1Id": "",
        // 二级菜单的ID
        "category2Id": "",
        // 三级菜单的ID
        "category3Id": "",
        // 分类名字
        "categoryName": "",
        // 搜索input的关键字
        "keyword": "",
        // 排序 初始默认状态应该是综合|降序
        "order": "1:desc",
        // 分页器用的：代表当前第几页
        "pageNo": 1,
        // 每一页展示数据的个数
        "pageSize": 3,
        // 平台售卖属性带的参
        "props": [],
        // 品牌
        "trademark": ""
      }
    }
  },
  beforeMount() {
    // Object.assign:ES6语法 合并对象
    // 在发请求之前，把接口需要传递的参数，进行整理（）
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    // 再发请求之前 进行data中的参数【searchData】更新
    this.getData()
  },
  computed: {
    // 获取search仓库中的 手机详情页数据
    goodsList() {
      return this.$store.state.search.ListPhone.goodsList
    },
    // 判断综合选项是否有背景色（类名）
    activeOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    // 判断价格选项是否有背景色（类名）
    activeTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    // 判断综合箭头是否为升序
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    // 判断综合箭头是否为降序
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    // 获取仓库中总数据
    total() {
      return this.$store.state.search.ListPhone.total
    }
  },
  methods: {
    // 向服务器发请求获取search模块数据
    getData() {
      this.$store.dispatch('getSearchData', this.searchParams)
    },
    // 点击删除面包屑的 categoryName
    removecategoryName() {
      // 把带给服务器的参数置空了，还需再向服务器发请求
      this.searchParams.categoryName = ''
      this.searchParams.categoryId = ''
      this.getData()
      // 地址栏也需要修改---进行路由跳转
      this.$router.push({ name: 'Search', params: this.$route.params })
    },
    // 删除面包屑关键字
    removekeyword() {
      this.searchParams.keyword = ''
      this.getData()
      // 通知兄弟组件 Header 把keyword input关键字清空
      this.$bus.$emit('clear')
      // 进行路由的跳转
      this.$router.push({ name: 'Search', query: this.$route.query })
    },
    // 通过自定义事件获取 子组件传过来的品牌 参数
    trnkmarkInfo(tran) {
      this.searchParams.trademark = tran.tmId + ':' + tran.tmName
      this.getData()
    },
    // 通过自定义事件获取 子组件传递过来的售卖属性（列如：内存 颜色 屏幕）参数 
    attrInfo(attr, attrValue) {
      // ["属性ID:属性值:属性名"]
      let props = attr.attrId + ':' + attrValue + ':' + attr.attrName
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    // 点击删除tranmark的面包屑
    removetrademark() {
      this.searchParams.trademark = undefined
      // 再次发请求
      this.getData()
    },
    // 点击删除平台售卖属性的面包屑
    removeattrValue(index) {
      // 再次整理参数
      this.searchParams.props.splice(index, 1)
      // 再次发参数
      this.getData();
    },
    // 排序操作
    changeOrder(flag) {
      // flag形参：标记用户点击的是综合(1)还是价格(2)
      let OrderSort = this.searchParams.order.split(':')[1]
      console.log(OrderSort);
      let NewOrder = ''
      // 点击的是综合
      if (flag == 1) {
        NewOrder = `1:${OrderSort == 'asc' ? 'desc' : 'asc'}`
        // 点击的是价格
      } else if (flag == 2) {
        NewOrder = `2:${OrderSort == 'desc' ? 'asc' : 'desc'}`
      }
      // 将新的order赋予searchParams.order
      this.searchParams.order = NewOrder
      // 再次发送请求
      this.getData()
    },
    // 自定义事件------获取子组件传过来点击哪个选项
    getpageNo(pageNo) {
      // console.log('我是父组件',pageNo)
      // 整理带给服务器的参数
      this.searchParams.pageNo = pageNo
      // 再次发送请求
      this.getData()
    },
    // 点击跳转产品详情页携带Id发请求
    // getDetail(goodId){
    //   this.$store.dispatch('getDetailData',goodId)
    // }
  },
  watch: {
    // 监听路由信息:如果发生变化  继续发送请求
    $route: {
      handler(newValue, olValue) {
        // 再次发送请求之前 整理带给服务器参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        // 再次发送请求
        this.getData()
      }
    }
  },
}
</script>



<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>