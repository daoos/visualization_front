<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>
启动：npm run dev

打包：npm run bulid:prod
运维可视化前端接口对接实例
1 配置要访问的接口的ip地址和端口号
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic1.png">
</p>
2. 导出接口方法
<p align="center">
  <img  src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic2.png">
</p>
2. 导出接口方法
<p align="center">
  <img  src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic3.png">
</p>
3.在页面导入接口方法
<p align="center">
  <img  src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic4.png">
</p>
4.从接口取数据
（1）在data里声明一个变量用来接收从接口取出来的数据
<p align="center">
  <img  src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic5.png">
</p>
（2）方法调用取数据赋值
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic6.png">
</p>
注意 全景视图里的方法需要在mounted里调用一下（一进页面就会执行），其他两个页面的接口可以在切换视图的时候调，即调用写在toIndex1.toIndex2里
（3）将数据放进视图
在页面上找到组件
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic7.png">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic8.png">
</p>
传值：
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic9.png">
</p>
打开子组件文件
在props里写入接口的变量
<p align="center">
  <img  src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic10.png">
</p>
watch监控该变量
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic11.png">
</p>
赋值到图上（视具体需要的数据情况而改动）
<p align="center">
  <img  src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic12.png">
</p>
效果：
<p align="center">
  <img src="https://raw.githubusercontent.com/rockdeaf/visualization_front/master/%E5%A4%A7%E5%B1%8F%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E5%AF%B9%E6%8E%A5/pic13.png">
</p>
图上数据为真实数据


Copyright (c) 2018-Meartec
