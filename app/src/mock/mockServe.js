// 引入mock
import Mock from 'mockjs'
// 引入banner数据
import banner from './banner.json'
// 引入floor数据
import floor from './floor.json'

// mock数据：第一个参数请求地址 第二个擦书：请求数据
Mock.mock('/mock/banner',{code:200,data:banner}) // 首页轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})