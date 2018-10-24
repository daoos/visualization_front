<template>
  <div id="bodyContainer2" class="backgroundStyle" :style="backgroundStyle">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <el-row :gutter="20">
      <el-col :span="14">
        <div class=" grid-content2 left" >
          <div class="s_container1">
            <div class="title">
              <span>安全设备环比</span>
            </div>
            <div class="s_mainContainer">
              <pie-chart  width="90%" height="90%"></pie-chart>
            </div>
          </div>
          <div class="s_container2">
            <div class="title">
              <span>安全设备状态</span>
            </div>
            <div class="s_mainContainer">
              <cross-bar width="90%" height="90%"></cross-bar>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content2 right" >
          <div class="title">
            <span>应用异常详情</span>
          </div>
          <div style="width: 95%; height: 80%; margin: 20px; padding: 10px;">
            <!--<bar-line :normal-count="normalCount" :exception-count="exceptionCount" width="100%" height="100%"></bar-line>-->
            <el-table :data="tableData" style="width: 100%;margin: auto;padding: 5px;"  max-height="800" stripe>
              <el-table-column
                label="状态码" align="center"
                width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.statusCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="设备名称"
                width="200" align="center" >
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>设备名称: {{ scope.row.name }}</p>
                    <p>url: {{ scope.row.url }}</p>
                    <div slot="reference" class="name-wrapper">{{ scope.row.name }}
                      <!--<el-tag type="danger">{{ scope.row.name }}</el-tag>-->
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column align="center"  width="200" label="查看详细信息" >
                <template slot-scope="scope">
                  <el-button type="danger"  plain icon="el-icon-question" @click="handleCheck(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
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
  import PieChart from './components/PieChart2'
  import CrossBar from './components/CrossBar2'
  // 接口
  import { getApplication } from '@/api/customView/index'

  export default {
    name: 'customView',
    components: {
      // BarChart,
      PieChart,
      CrossBar,
      // Chart,
      // RaddarChart,
      // GuageChart,
      // PictorialBar,
    },
    data() {
      return {
        // 设置背景div的样式
        backgroundStyle: {
          // background: 'url("/src/assets/customView/background8.jpg") no-repeat center fixed',
          // backgroundSize: 'cover'
        },
        // 传递给子组件的数值
        normalCount: [], // 应用正常数量
        exceptionCount: [], // 应用异常数量
        // test
        tableData: [{
          statusCode: '',
          name: '',
          url: '',
          serverIp: ''
        }]
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    created() {
    },
    mounted() {
      this.getAppInfo()
    },
    methods: {
      getAppInfo() {
        // 获取json数据
        getApplication()
          .then(response => {
            // 清空表格数据
            this.tableData = []
            // 获取异常信息
            const peopleApp = response.data.peopleApp // 服务人民群众应用资源
            const executionApp = response.data.executionApp // 服务审判执行应用资源
            const managerApp = response.data.managerApp // 服务司法管理应用资源
            const exception1 = peopleApp.exceptionApplication
            const exception2 = executionApp.exceptionApplication
            const exception3 = managerApp.exceptionApplication
            // 数据放入table中
            this.getExceptionData(exception1)
            this.getExceptionData(exception2)
            this.getExceptionData(exception3)
          })
      },
      // 遍历取出异常的详细信息
      getExceptionData(exception) {
        for (var k in exception) {
          const exceptionName = exception[k].name
          const exceptionStatus = exception[k].statusCode
          const exceptionUrl = exception[k].url
          const exceptionServerIp = exception[k].serverIp
          this.tableData.push({ name: exceptionName, url: exceptionUrl, statusCode: exceptionStatus, serverIp: exceptionServerIp })
        }
      },
      // 操作栏点击事件 查看异常详情
      handleCheck(row) {
        console.log(row.serverIp)
        // const h = this.$createElement
        this.$msgbox({
          title: '详细信息',
          message: row.serverIp,
          // h('p', null, [
          // h('span', null, '内容可以是 '),
          // h('i', { style: 'color: teal' }, 'VNode')
          // ]),
          // showCancelButton: true,
          confirmButtonText: '确定'
          // cancelButtonText: '取消'
          // beforeClose: (action, instance, done) => {
          //   if (action === 'confirm') {
          //     instance.confirmButtonLoading = true;
          //     instance.confirmButtonText = '执行中...';
          //     setTimeout(() => {
          //       done()
          //       setTimeout(() => {
          //         instance.confirmButtonLoading = false;
          //       }, 300)
          //     }, 3000)
          //   } else {
          //     done()
          //   }
          // }
        })
      }
    }
  }
</script>

<style>
  /*html body {*/
    /*height: 100%;*/
    /*width: 100%;*/
  /*}*/
  body {
    height: 100%;
    width: 100%;
    color: #fff;
    background-color: #000;
  }
  #bodyContainer2{
    /*background: #191970;*/
    height: 100%;
    width: 100%;
  }

  .grid-content2 {
    /*border:1px solid #bfd1eb;*/

    /*background: linear-gradient(to left, #f00, #f00) left top no-repeat,*/
    /*linear-gradient(to bottom, #f00, #f00) left top no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) right top no-repeat,*/
    /*linear-gradient(to bottom, #f00, #f00) right top no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) left bottom no-repeat,*/
    /*linear-gradient(to bottom, #f00, #f00) left bottom no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) right bottom no-repeat,*/
    /*linear-gradient(to left, #f00, #f00) right bottom no-repeat;*/
    /*background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;*/

    /*background:#f3faff;*/
    /*background:rgba(255,255,255,0.1);*/
    /*border-radius: 4px;*/
    min-height: 36px;
    /*background-color: */

    height: 800px;
    margin-top: 20px;
    margin-bottom: 20px;
    /*margin-bottom: 5%;*/
    /*margin-top: 20px;*/
    /*margin-bottom: 20px;*/

  }


  .s_container1{
     height: 60%;
     margin: auto;
   }

  .s_container2{
    height: 40%;
    margin: auto;
  }

  /*.container1 {*/
    /*height: 95%;*/
    /*width: 98%;*/
    /*margin: auto;*/
  /*}*/

  .s_mainContainer {
    height: 95%;
    width: 98%;
    margin: auto;
  }

  .title{
    font-weight: bold;
    width: 80%;
    height: 30px;
    margin-left: 10px;
    padding: 10px;
    /*margin-top: 15px;*/
  }

  .left{
    margin-left: 20px;
  }

  .right{
    margin-right: 20px;
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
