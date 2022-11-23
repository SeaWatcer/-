<template>
    <div class="pagination">
        <!-- <h1>{{startNumAndendNum}}---当前页码{{pageNo}}</h1> -->
        <button :disabled="pageNo==1" @click="$emit('getpageNo',pageNo -1)" >上一页</button>
        <button v-show="startNumAndendNum.start >= 2" @click="$emit('getpageNo',1)" :class="{'active':pageNo== 1}">1</button>
        <button v-show="startNumAndendNum.start >= 3">···</button>

        <!-- 中间结构 -->
        <button v-for="(page,index) in startNumAndendNum.end" :key="index" v-show="page>=startNumAndendNum.start" @click="$emit('getpageNo',page)" :class="{'active':pageNo==page}"> {{page}}</button>


        <button v-show="startNumAndendNum.end < totalPage - 1">···</button>
        <button v-show="startNumAndendNum.end < totalPage" @click="$emit('getpageNo',totalPage)" :class="{'active':pageNo==totalPage}">{{totalPage}}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getpageNo',pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 计算出一共有多少页
        totalPage() {
            // 向上取整
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算连续页码的起始数字和结束数字
        startNumAndendNum() {
            let { continues, pageNo, totalPage } = this // 把需要的数据从this解构出来
            // 先定义两个变量存储起始数字额结束数字
            let start = 0 // 起始数字
            let end = 0 // 结束数字
            // 连续页码数字5【就是最少5页】,如果出现不正常现象【就是总页数不够5页】
            if (continues > totalPage) { // 不正常现象 总页数没有连续页码多！
                start = 1 // 当总页数没有连续页数多 起始的数为 1
                end = totalPage // 当总页数没有连续页数多 结束的数为 当前的总页数最后一个
            } else {
                // 正常现象：连续页数是5 总页数一定大于5
                start = pageNo - Math.floor(continues / 2)  // 起始数字（页数）
                end = pageNo + Math.floor(continues / 2) // 结束数字 （页数）
                if(start < 1){ // 不正常现象
                    start = 1
                    end = continues
                }else if(end > totalPage){ // end数字>总页数了
                    start = totalPage - continues + 1
                    end = totalPage
                }
            }
            return {start,end}
        }
    },
    methods:{
        clickpageNo(page){
            this.$emit('getpageNo',page)
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
.active{
    background-color: skyblue;
}
</style>