1.Vue.cli脚手架初始化项目
node +1 webpack + 淘宝镜像

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置一些静态资源（图片）。需要注意，放在public文件中的静态资源，webpack进行打包的时候会原封不动的打包到dist文件夹中.

src文件夹（程序员源代码文件夹）：
assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放在assets文件中的静态资源，webpack进行打包的时候会原封不动的打包到dist文件夹中.


9)路由传参相关面试题
1；路由传递参数（对象写法）path是否可以结合params一起使用
2.如何指定params参数可传可不传？
3：params参数可以传递也可以不传递，但如果传的空串如何解决？
4：路由组件能不能传递props数据？