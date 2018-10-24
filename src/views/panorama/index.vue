<template>
<div id="bodyContainer" class="backgroundStyle" :style="backgroundStyle">
  <div class="stars"></div>
  <div class="twinkling"></div>
  <el-row :gutter="20">
    <el-col :span="6">
      <div id="box1" class="colBox0 grid-content left" >
        <div class="title">
          <span>主机设备数量总览</span>
        </div>
        <div class="container0" >
          <cross-bar :device-count="hostDeviceCount" width="100%" height="100%" style="margin: auto;"></cross-bar>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="box2" class="colBox0 grid-content" >
        <div class="title">
          <span>存储设备数量总览</span>
        </div>
        <div class="container0" >
          <cross-bar :device-count="storageDeviceCount" width="100%" height="100%" style="margin: auto;"></cross-bar>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="box3"  class="colBox0 grid-content" >
        <div class="title">
          <span>网络设备数量总览</span>
        </div>
        <div class="container0" >
          <cross-bar :device-count="networkDeviceCount" width="100%" height="100%" style="margin: auto;"></cross-bar>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="smallBox4" class="colBox0 grid-content right" >
        <div class="title">
          <span>应用统计</span>
        </div>
        <div class="container0">
          <!--:normal-count="normalCount" :exception-count="exceptionCount"-->
          <app-bar :normal-count="normalCount" :exception-count="exceptionCount" width="100%" height="100%"></app-bar>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="6">
      <div id="middleBox1" class="colBox2 grid-content left" >
        <div class="title">
          <span>存储增量图</span>
        </div>
        <div class="container2" >
          <pictorial-bar :storage-count="storageCount" width="100%" height="100%" style="margin: auto"></pictorial-bar>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div id="box7" class="colBox2 grid-content">
        <div class="title">
          <span>设备警告数</span>
        </div>
        <div class="mainContainer">
          <div class="radar">
            <div class="warning">{{ hostWarningCount }}</div>
          </div>
          <div class="deviceName device1"><span>主机设备</span></div>
          <div class="radar">
            <div class="warning">{{ netWarningCount }}</div>
          </div>
          <div class="deviceName device2"><span>网络设备</span></div>
          <div class="radar">
            <div class="warning"> {{ storageWarningCount }}</div>
          </div>
          <div class="deviceName device3"><span>存储设备</span></div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="middleBox2" class="colBox2 grid-content right">
        <div class="title">
          <span>网络设备总览</span>
        </div>
        <div class="containerTie" >
          <pie-chart :device-name="netDeviceOverviewName" :overview-data="netDeviceOverview"  width="90%" height="90%" style="margin: auto;"></pie-chart>
        </div>
        <div class="title">
          <span>服务器总览</span>
        </div>
        <div class="containerTie" >
          <pie-chart :device-name="serverOverviewName" :overview-data="serverOverview" width="90%" height="90%" style="margin: auto;"></pie-chart>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="6">
      <div id="smallBox1" class="colBox1 grid-content left" >
        <div class="title">
          <span>主机设备CPU利用率Top10</span>
        </div>
        <div class="container1" >
          <chart :type="'bar'" :data="waveData" :options="options" style="width: 100%; height: 100%; padding-top: 10px"></chart>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="smallBox2" class="colBox1 grid-content ">
        <div class="title">
          <span>主机设备内存利用率Top10</span>
        </div>
        <div class="container1" >
          <chart :type="'bar'" :data="waveData2" :options="options" style="width: 100%; height: 100%; padding-top: 10px"></chart>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="smallBox3" class="colBox1 grid-content" >
        <div class="title">
          <span>网络设备CPU利用率Top10</span>
        </div>
        <div class="container1 chartContainer">
          <chart :type="'bar'" :data="waveData3" :options="options" style="width: 100%; height: 100%; padding-top: 10px"></chart>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div id="box6" class="colBox1 grid-content right" >
        <div class="title">
          <span>网络设备带宽利用率Top10</span>
        </div>
        <div class="container1" >
          <chart :type="'bar'" :data="waveData4" :options="options" style="width: 100%; height: 100%; padding-top: 10px"></chart>
        </div>
      </div>
    </el-col>
  </el-row>
  <!--<el-row :gutter="20">-->
    <!--<el-col :span="6"><div id="middleBox3" class="colBox3 grid-content bg-purple left"></div></el-col>-->
    <!--<el-col :span="6"><div id="middleBox4" class="colBox3 grid-content bg-purple "></div></el-col>-->
    <!--<el-col :span="6"><div id="middleBox5" class="colBox3 grid-content bg-purple "></div></el-col>-->
    <!--<el-col :span="6"><div id="middleBox6" class="colBox3 grid-content bg-purple right"></div></el-col>-->
  <!--</el-row>-->
</div>

</template>

<script>
  import { mapGetters } from 'vuex'
  // 组件
  import CrossBar from './components/CrossBar'
  import AppBar from './components/CrossBar3'
  import PieChart from './components/PieChart'
  // import BreakPie from './components/PieChart2'
  import PictorialBar from './components/PictorialBar'
  import Chart from 'vue-bulma-chartjs'
  // 接口
  // import getHostPanorama from '@/api/customView/index'
  import { getDeviceCount } from '@/api/customView/index'
  import { getHostDevice } from '@/api/customView/index'
  import { getNetworkDevice } from '@/api/customView/index'
  import { getStorageDevice } from '@/api/customView/index'
  import { getApplication } from '@/api/customView/index'

  export default {
    name: 'panorama',
    components: {
      PieChart,
      Chart,
      PictorialBar,
      CrossBar,
      AppBar
    },
    data() {
      return {
        // 设置背景div的样式
        backgroundStyle: {
          // background: 'url("/src/assets/customView/background8.jpg") no-repeat center fixed ',
          // backgroundSize: 'cover'
        },
        // 接口数据
        deviceCount: [], // 设备总量和被监控数
        jsonData0_key: [],
        jsonData0_value: [],
        jsonData1: [],
        jsonData2: [],
        jsonData3: [],
        jsonData4: [],
        hostDeviceCount: [], // 主机设备总数和监控数
        networkDeviceCount: [], // 网络设备总数和监控数
        storageDeviceCount: [], // 存储设备总数和监控数
        hostWarningCount: undefined, // 主机设备警告数
        netWarningCount: undefined, // 网络设备警告数
        storageWarningCount: undefined, // 存储设备警告数
        storageCount: [], // 上月存储量，本月存储量，存储总量
        serverOverviewName: [], // 服务器总览 （设备名称）
        serverOverview: [], // 服务器总览 （设备数量和占比）
        netDeviceOverviewName: [], // 网络设备总览 （设备名称）
        netDeviceOverview: [], // 网络设备总览 （设备名称）
        normalCount: [], // 应用正常数量
        exceptionCount: [], // 应用异常数量
        // 动态柱状图公共配置
        options: {
          legend: {
            labels: {
              fontColor: '#FFFFFF'
            }
          },
          segmentShowStroke: false
        },
        // 动态柱状图颜色配置
        backgroundColor: [
          '#E87C25',
          '#009eff',
          '#C1232B',
          '#B5C334',
          '#FCCE10'
          // '#27727B',
          // '#FB3B4E',
          // '#1D4D8F',
          // '#05F1D6',
          // '#FFCD26',
          // '#c3b4df',
          // '#FC7A26',
          // '#eb2f06',
          // '#1e3799',
          // '#3c6382',
          // '#38ada9'
        ],
        //   // '#FFFFFF'
        // ],
        // 动态柱状图数据展示
        // label_1: ['May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        label_1: ['', '', '', '', '', ''],
        label_2: ['', '', '', '', '', '', '', '', '', '', ''],
        data_1: [],
        data_2: [],
        data_3: [],
        data_4: [],
        data_5: [],
        data_6: []
        // series: ['Product A', 'Product B']
      }
    },
    computed: {
      // 动态柱状图的数据绑定
      waveData() {
        return {
          // 横坐标
          labels: this.label_2,
          // 纵坐标
          datasets: [{
            label: 'CPU利用率',
            data: this.data_1,
            backgroundColor: this.backgroundColor[0]
          }]
        }
      },
      waveData2() {
        return {
          labels: this.label_2,
          datasets: [{
            label: '内存利用率',
            data: this.data_2,
            backgroundColor: this.backgroundColor[1]
          }]
        }
      },
      waveData3() {
        return {
          labels: this.label_2,
          datasets: [{
            label: 'CPU利用率',
            data: this.data_3,
            backgroundColor: this.backgroundColor[2]
          }]
        }
      },
      waveData4() {
        return {
          labels: this.label_1,
          datasets: [{
            label: '输入率',
            data: this.data_4,
            backgroundColor: this.backgroundColor[0]
          }, {
            label: '输出率',
            data: this.data_5,
            backgroundColor: this.backgroundColor[1]
          }]
        }
      },
      // waveData5() {
      //   return {
      //     labels: this.label_2,
      //     datasets: [{
      //       label: '内存利用率',
      //       data: this.data_6,
      //       backgroundColor: this.backgroundColor[3]
      //     }]
      //   }
      // },
      ...mapGetters([
      ])
    },
    created() {
    },
    mounted() {
      // this.redirect()
      this.initView()
      // 柱状图轮播效果
      setInterval(() => {
        this.data_1.unshift(this.data_1.pop())
        this.data_2.unshift(this.data_2.pop())
        this.data_3.unshift(this.data_3.pop())
        this.data_4.unshift(this.data_4.pop())
        this.data_5.unshift(this.data_5.pop())
      }, 2000)
    },
    methods: {
      redirect() {
        var flag = 0
        setInterval(() => {
          if (flag === 0){
            window.location.href = 'http://47.96.163.237:9527/#/panorama/index2'
            flag = 1
          }else {
            window.location.href = 'http://47.96.163.237:9527/#/panorama/index'
            flag = 0
          }
        },10000)
      },
      initView() {
        // 接口
        // 1.设备数量信息
        getDeviceCount()
          .then(response => {
            const data0 = response.data
            // 取出接口数据
            for (var k in data0) {
              this.jsonData0_key.push(k)
              this.jsonData0_value.push(data0[k])
            }
            // 把接口数据放到对应的数组里，然后再将数据与标签动态绑定，传值给子组件
            this.serverOverviewName.push(this.jsonData0_key[0], this.jsonData0_key[1])
            this.netDeviceOverviewName.push(this.jsonData0_key[2], this.jsonData0_key[3])
            this.serverOverview.push(this.jsonData0_value[0], this.jsonData0_value[1])
            this.netDeviceOverview.push(this.jsonData0_value[2], this.jsonData0_value[3])
          })
        // 2.主机设备信息
        getHostDevice()
          .then(response => {
            const data1 = response.data
            for (var k in data1) {
              this.jsonData1.push(data1[k])
            }
            const monitor_1 = this.jsonData1[0] // 设备总数量
            this.hostWarningCount = this.jsonData1[1] // 设备警告数
            const total_1 = this.jsonData1[2] // 设备监控数
            const cpuUsedRate_1 = this.jsonData1[3] //  CPU利用率
            const memoryUsedRate_1 = this.jsonData1[4] // 内存利用率
            // const diskUsedRate_1 = this.jsonData1[5] // 存储利用率
            // this.hostDeviceCount = []
            this.hostDeviceCount.push(monitor_1, total_1)
            for (var index1 in cpuUsedRate_1) {
              this.data_1.push(cpuUsedRate_1[index1].usedRate)
            }
            for (var index2 in memoryUsedRate_1) {
              this.data_2.push(memoryUsedRate_1[index2].usedRate)
            }
            // console.log(this.data_1)
          })
        // 3.网络设备信息
        getNetworkDevice()
          .then(response => {
            const data2 = response.data
            for (var k in data2) {
              this.jsonData2.push(data2[k])
            }
            const monitor_2 = this.jsonData2[0] // 设备总数量
            this.netWarningCount = this.jsonData2[1] // 设备警告数
            const total_2 = this.jsonData2[2] // 设备监控数
            const cpuUsedRate_2 = this.jsonData2[3] //  CPU利用率
            const ioRate = this.jsonData2[4] // 输入输出率
            // const diskUsedRate_2 = this.jsonData1[5] // 存储利用率
            this.networkDeviceCount.push(monitor_2, total_2)
            for (var index1 in cpuUsedRate_2) {
              this.data_3.push(cpuUsedRate_2[index1].usedRate) // 内存利用率
            }
            for (var index2 in ioRate) {
              this.data_4.push(ioRate[index2].inputRate)
              this.data_5.push(ioRate[index2].outputRate)
            }
          })
        // 4.存储设备信息
        getStorageDevice()
          .then(response => {
            const data3 = response.data
            for (var k in data3) {
              this.jsonData3.push(data3[k])
            }
            // const total_3 = this.jsonData3[0] // 设备总数量
            this.storageWarningCount = this.jsonData3[1] // 设备警告数
            // const monitor_3 = this.jsonData3[2] // 设备监控数
            const totalStorage = this.jsonData3[3]
            const thisMonthStorage = this.jsonData3[4]
            const lastMonthStorage = this.jsonData3[5]
            this.storageDeviceCount.push(this.jsonData3[2], this.jsonData3[0])
            this.storageCount.push(lastMonthStorage, thisMonthStorage, totalStorage)
          })
        // 5.应用信息
        getApplication()
          .then(response => {
            const allData = response.data
            // 服务人民群众应用资源
            const peopleApp = allData.peopleApp
            const exceptionCount1 = peopleApp.exceptionCount
            const normalCount1 = peopleApp.totalCount - exceptionCount1 - peopleApp.degradationCount
            // 服务司法管理应用资源
            const managerApp = allData.managerApp
            const exceptionCount2 = managerApp.exceptionCount
            const normalCount2 = managerApp.totalCount - exceptionCount2 - managerApp.degradationCount
            // 服务审判执行应用资源
            const executionApp = allData.managerApp
            const exceptionCount3 = executionApp.exceptionCount
            const normalCount3 = executionApp.totalCount - exceptionCount3 - executionApp.degradationCount
            // 传递给子组件的数组
            this.normalCount.push(normalCount1, normalCount2, normalCount3)
            this.exceptionCount.push(exceptionCount1, exceptionCount2, exceptionCount2)
            // 异常应用的服务器信息
            // const exception = executionApp.exceptionApplication
            // // console.log(exception)
            // const serverIp = []
            // for (var k in exception) {
            //   // console.log(exception[k])
            //   // console.log(exception[k].serverIp)
            //   serverIp.push(exception[k].serverIp)
            // }
            // console.log(serverIp)
          })
      }
    }
    // watch: {
    //   hostDeviceCount: function() {
    //   }
    // }
  }
</script>

<style>
  * { margin: 0; padding: 0; border: 0; }
  html {
    width: 100%;
    height: 100%;
  }
  #bodyContainer{
    height: 100%;
    width: 100%;
    margin: auto;
    color: white;
    background-color: #000;
    /*background-color: #04243E;*/
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    /*border:1px solid #bfd1eb;*/

    /*******div边框*************/
    /*background: linear-gradient(to left, #f00, #f00) left top no-repeat,*/
    /*linear-gradient(to bottom, #f00, #f00) left top no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) right top no-repeat,*/
    /*linear-gradient(to bottom, #f00, #f00) right top no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) left bottom no-repeat,*/
    /*linear-gradient(to bottom, #f00, #f00) left bottom no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) right bottom no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) right bottom no-repeat;*/
    /*background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;*/
    /***********************/
    /*background:#f3faff;*/
    /*background:rgba(255,255,255,0.1);*/
    /*border-radius: 4px;*/
    min-height: 36px;
  }

  .colBox0{
    z-index:2;
    margin-top: 20px;
    height: 300px;
  }

  .colBox1{
    z-index:2;
    /*margin-top: 20px;*/
    height: 250px;
  }
  .colBox2{
    z-index:2;
    /*margin-top: 10px;*/
    height: 600px;
  }
  .colBox3{
    /*margin-top: 10px;*/
    height: 500px;
  }

  .title{
    font-weight: bold;
    width: 80%;
    height: 0;
    margin-left: 10px;
    padding: 10px;
    /*margin-top: 15px;*/
  }

  .container0 {
    width: 90%;
    height: 80%;
    margin: auto;
    /*position: relative*/
  }

  #box7 {
    position: relative;
  }

  .container1{
    width: 98%;
    height: 98%;
    margin: auto;
  }

  .containerTie{
    width: 98%;
    height: 44%;
    margin: 5px auto
  }
  .container2{
    width: 98%;
    height: 550px;
    margin: auto;
  }

  .left{
    margin-left: 20px;
  }

  .right{
    margin-right: 20px;
  }

  canvas.chartjs {
    max-width: 80%;
    max-height: 100%;
  }

  #box6{
    position: relative;
  }




  .mainContainer {
    /*left: 10%;*/
    /*top: 10%;*/
    background-image: linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, 0.15) 25%, rgba(32, 255, 77, 0.15) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.15) 75%, rgba(32, 255, 77, 0.15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, 0.15) 25%, rgba(32, 255, 77, 0.15) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.15) 75%, rgba(32, 255, 77, 0.15) 76%, transparent 77%, transparent);
    background-size: 5rem 5rem;
    background-position: -5.2rem -5.2rem;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
  }

  .deviceName {
    height: 30px;
    font-size: 18px;
    top: 22%;
    /*left: 14%;*/
    text-align: center;
    position: absolute;
  }

  .device1 {
    left: 14%;
  }
  .device2 {
    left: 45%;
  }
  .device3 {
    left: 76%;
  }

  .warning {
    margin-top: 35%;
    left: 25%;
    color: #f00;
    height: 30%;
    width: 50%;
    text-align: center;
    position: relative;
    font-size: 200%;
  }

  .radar {
    float: left;
    width: 30%;
    height: 0;
    margin: 5px;
    padding-bottom: 30%;
    max-height: 75%;
    max-width: 75%;
    position: relative;
    left: 18%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 0.2rem solid #009eff;
    overflow: hidden;
  }
  .radar:before {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: blips 5s infinite;
    animation-timing-function: linear;
    animation-delay: 1.4s;
  }
  .radar:after {
    content: ' ';
    display: block;
    background-image: linear-gradient(44deg, rgba(0, 255, 51, 0) 50%, #009eff 100%);
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    animation: radar-beam 5s infinite;
    animation-timing-function: linear;
    transform-origin: bottom right;
    border-radius: 100% 0 0 0;
  }

  @keyframes radar-beam {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  /*@keyframes blips {*/
    /*14% {*/
      /*background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);*/
    /*}*/
    /*14.0002% {*/
      /*background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);*/
    /*}*/
    /*25% {*/
      /*background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);*/
    /*}*/
    /*26% {*/
      /*background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);*/
      /*opacity: 1;*/
    /*}*/
    /*100% {*/
      /*background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);*/
      /*opacity: 0;*/
    /*}*/
  /*}*/


  /******背景动画效果********/
  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @-webkit-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @-moz-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @-ms-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }

  .stars, .twinkling {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    display:block;
  }

  .stars {
    background:#000 url(/src/assets/customView/img/stars.png) repeat top center;
    background-size: 100% 100%;
    background-attachment: fixed;
    z-index:0;
  }

  .twinkling{
    background:transparent url(/src/assets/customView/img/twinkling.png) repeat top center;
    z-index:0;
    -moz-animation:move-twink-back 200s linear infinite;
    -ms-animation:move-twink-back 200s linear infinite;
    -o-animation:move-twink-back 200s linear infinite;
    -webkit-animation:move-twink-back 200s linear infinite;
    animation:move-twink-back 200s linear infinite;
  }



</style>
