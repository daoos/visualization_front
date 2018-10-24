<template>
  <div id="quaContainer" style="height: 100%">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <el-row :gutter="20" >
      <el-col :span="12">
        <div  class="quaBox1 quaLeft">
          <div class="qua1">
            <div class="quaTitle">
              <span>总体监控情况</span>
            </div>
            <div class="boxContainer">
              <pie-chart v-bind:total-num="total" width="100%" height="100%"></pie-chart>
            </div>
          </div>
          <div class="qua1">
            <div class="quaTitle">
              <span>应用监控情况</span>
            </div>
            <div class="boxContainer">
              <bar-chart width="100%" height="100%"></bar-chart>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div  class="quaBox1 quaRight">
          <div class="quaTitle">
            <span>应用统计概览</span>
          </div>
          <div class="boxContainer">
            <num-bar :device-count="deviceCount" :monitor-count="monitorCount" :waring-count="waringCount" width="100%" height="100%"></num-bar>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  // 组件
  import PieChart from './components/PieChart'
  import NumBar from './components/BarChart1'
  import BarChart from './components/BarChart2'
  // 接口
  import { getQualityControl } from '@/api/customView/index'
  import { getAppNum } from '@/api/customView/index'

  export default {
    name: 'qualityControl',
    components: {
      PieChart,
      BarChart,
      NumBar
    },
    data() {
      return {
        // 传递给自组件的数据
        deviceCount: [], // 设备总数量
        monitorCount: [], // 监控数
        waringCount: [], // 警告数
        total: [] // 总览
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    mounted() {
      // 清空数据
      // this.deviceCount = []
      // this.monitorCount = []
      // this.waringCount = []
      // 质控态势 主机，应用和基础设备的总数量，监控数量和告警数
      this.getQualityInfo()
      // 应用设备的正常劣化故障数量
      this.getAppInfo()
    },
    methods: {
      getQualityInfo() {
        getQualityControl()
          .then(response => {
            // 获取json数据
            const allData = response.data
            const baseDeviceSituation = allData.baseDeviceSituation // 基础设备信息
            const hostDeviceSituation = allData.hostDeviceSituation // 主机设备信息
            const appDeviceSituation = allData.appDeviceSituation // 应用设备信息
            // 赋值到要传递的数组中
            this.deviceCount.push(baseDeviceSituation.deviceCount, hostDeviceSituation.deviceCount, appDeviceSituation.deviceCount)
            this.monitorCount.push(baseDeviceSituation.monitorCount, hostDeviceSituation.monitorCount, appDeviceSituation.monitorCount)
            this.waringCount.push(baseDeviceSituation.waringCount, hostDeviceSituation.waringCount, appDeviceSituation.waringCount)
            // console.log(this.deviceCount, this.monitorCount, this.waringCount)
            // 总览数据
            const device = baseDeviceSituation.deviceCount + hostDeviceSituation.deviceCount + appDeviceSituation.deviceCount
            const monitor = baseDeviceSituation.monitorCount + hostDeviceSituation.monitorCount + appDeviceSituation.monitorCount
            const unMonitor = device - monitor
            this.total.push(monitor, unMonitor)
          })
      },
      getAppInfo() {
        getAppNum()
          .then(response => {
            console.log(response.data)
          })
      }
    }
  }
</script>

<style>

  html,body,#app,#quaContainer {
    height: 100%;
    color: white;
    background-color: #000;
  }

  .quaLeft{
    margin-left: 5%;
  }

  .quaRight{
    margin-right: 5%;
  }

  .quaBox1 {
    /*border:1px solid #bfd1eb;*/
    /*background:#f3faff;*/
    height: 900px;
    margin-top: 5%;
    margin-bottom: 5%;
  }

  .qua1 {
    width: 100%;
    height: 50%;
    margin-top: 5%;
  }


  .quaTitle {
    height: 8%;
    width: 90%;
    position: relative;
    margin-top: 2%;
    margin-left: 5%;
  }

  .boxContainer {
    height: 95%;
    width: 95%;
    margin: auto;
  }

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
