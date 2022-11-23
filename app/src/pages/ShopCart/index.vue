<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1"
              @change="dateById(cart.skuId,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('reduction',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
              @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.cartPrice}}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartList.length >0"
          @click="changeAllChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart" style="cursor: pointer;">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  data() {
    return {

    }
  },
  mounted() {
    this.getShopCart()
  },
  methods: {
    // 获取个人购物车数据 ---- 发请求
    getShopCart() {
      this.$store.dispatch('getShopCart')
    },
    // 修改某一个产品的数量   添加节流
    handler: throttle(function (type, disNum, cart) {
      // console.log(type, disNum, cart)
      // 当点击添加的时候
      let Num = null
      switch (type) {
        // 用户点击 + 1
        case 'add':
          Num = 1
          break
        // 用户点击 -1
        case 'reduction':
          // 判断 产品个数大于1 才可以给服务器传递 -1
          // 如果出现产品的个数小于等于1，传递给服务器的个数0（原封不动）
          Num = cart.skuNum > 1 ? -1 : 0
          break
        // 用户输入来的是最终量 ---------如果输入的是非法的 带给服务器的参数为0
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            Num = 0;
          } else {
            // 属于正常情况（如果有小数 取整）
            disNum = Math.ceil(disNum) - cart.skuNum
            Num = disNum
          }
      }

      try {
        // 派发请求
        this.$store.dispatch('addOrUpdateCard', { skuId: cart.skuId, skuNum: Num })
        this.getShopCart()
      } catch (error) {

      }
    }, 500),
    // 删除指定某一个产品
    async deleteCartById(id) {
      try {
        // 如果删除成功 再次发请求获取新的数据进行展示
        await this.$store.dispatch('deleteCartList', id)
        this.getShopCart()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改某一个产品是否选中
    async dateById(id, checked) {
      let Checked = checked ? 1 : 0
      // console.log(id,checked,Checked)
      try {
        await this.$store.dispatch('dateCartChecked', { skuId: id, isChecked: Checked })
        this.getShopCart()
      } catch (error) {
        alert(error)
      }

    },
    // 删除所有选中的产品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCart')
        this.getShopCart()
      } catch (error) {
        alert(error.message)
      }
    },
    // 勾选全部韩品 or 取消全部产品
    async changeAllChecked(event) {
      let checked = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('UpdateAllChecked', checked)
        this.getShopCart()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    // 获取仓库中的 购物车中数据
    cartList() {
      return this.$store.state.shopcart.cartList
    },
    // 计算购买产品的总价
    totalPrice() {
      let sum = 0;
      this.cartList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    // 判断底部的复选框是否勾选【全部产品都选中，才勾选】
    isAllCheck() {
      return this.cartList.every(item => item.isChecked == 1)
    },
  }
}


</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>