<template>
  <div id="view-container">
    <div class="view-title">
      <div :class=" index1?'primary-title':'secondary-title' " @click="toIndex1">效能评估</div>
      <div :class=" index2?'primary-title':'secondary-title' " @click="toIndex2">全景视图</div>
      <div :class=" index3?'primary-title':'secondary-title' " @click="toIndex3">质控态势</div>
    </div>
    <div id="index1" class="index" v-if="indexStatus === 1">
      <div class="effect-eval app-efficacy">
        <div class="main-title app-efficacy-title ">应用效能</div>
        <div class="app-efficacy-all every-app-efficacy">
          <div class="common-title">
            <img src="../../assets/moka/title.png"/>
            <label>各应用系统</label>
          </div>
          <div class="every-app-view">
            <avnu-time></avnu-time>
          </div>
        </div>
        <div class="app-efficacy-all app-efficacy-status">
          <div class="app-eff-status-view eff-status1">
            <div class="common-title" style="position: absolute">
              <img src="../../assets/moka/title.png"/>
              <label>基础设施状态</label>
            </div>
            <div class="base-app-eff">
              <status-water></status-water>
            </div>
            <!---->
          </div>
          <div class="app-eff-status-view eff-status1">
            <div class="common-title eff-status-title" style="position: absolute">
              <img src="../../assets/moka/title.png"/>
              <label>应用状态</label>
            </div>
            <div class="base-app-eff" style="left: 6%">
              <status-water></status-water>
            </div>
          </div>
          <div class="app-eff-status-view eff-status2">
            <div class="reason-and-time">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>状态来源</label>
              </div>
              <div class="eff-status-source">
                <label>数据来源于网络</label>
              </div>
            </div>
            <div class="reason-and-time">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>时间</label>
              </div>
              <div class="eff-status-source">
                <label>2018-6-10 18:30</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="effect-eval operation-manage">
        <div class="main-title">运维管理效能</div>
        <div class="operation-manage-view">
          <div class="common-title">
            <img src="../../assets/moka/title.png"/>
            <label>系统投诉处理统计</label>
          </div>
          <div class="accuse-all">
            <work-order></work-order>
          </div>
        </div>
        <div class="operation-manage-view accuse-view">
          <div class="common-title" style="width: 200px;">
            <img src="../../assets/moka/title.png" style="width: 70%;"/>
            <label>各应用系统投诉情况</label>
          </div>
          <div class="accuse-status">
            <div class="tip-title">
              <div class="tip-img"></div>
              <label>网上申诉平台</label>
            </div>
            <div class="accuse-status-view">
              <accuse-status></accuse-status>
            </div>
          </div>
          <div class="accuse-status">
            <div class="tip-title">
              <div class="tip-img"></div>
              <label>办公平台</label>
            </div>
            <div class="accuse-status-view">
              <accuse-status></accuse-status>
            </div>
          </div>
        </div>
      </div>
      <div class="effect-eval app-sys-efficacy">
        <div class="main-title app-sys-title">各应用系统效能</div>
        <div class="operation-manage-view">
          <div class="common-title operation-manage-title">
            <img src="../../assets/moka/title.png"/>
            <label>中国裁判文书网</label>
          </div>
          <div class="warn-status">
            <label style="font-size: 12px;color: #fff">是否告警</label>
            <img src="../../assets/moka/warn.png" style="width: 60%; height: 80%;margin-left: 20%;padding-bottom: 12%"/>
          </div>
          <div class="warn-status" style="left:60%;width: 40%;height: 22%">
            <time-anal></time-anal>
          </div>
          <div class="app-sys-detail">
            <visit-num></visit-num>
          </div>
        </div>
        <div class="operation-manage-view accuse-view">
          <div class="common-title" style="width: 100%;">
            <img src="../../assets/moka/title.png" style="width: 30%;"/>
            <label>最高人民法院机关办公平台</label>
          </div>
          <div class="warn-status" style="left:50%; top: -1%;">
            <label style="font-size: 12px;color: #fff">是否告警</label>
            <img src="../../assets/moka/no-warn.png"
                 style="width: 60%; height: 80%;margin-left: 20%;padding-bottom: 12%"/>
          </div>
          <div class="warn-status" style="left:70%;top:-1%;width: 40%;height: 22%">
            <time-anal></time-anal>
          </div>
          <div class="app-sys-detail">
            <visit-num></visit-num>
          </div>
        </div>
      </div>
    </div>
    <div id="index2" class="index" v-if="indexStatus === 2">
      <div class="data-view">
        <div class="main-title">数据</div>
        <div class="data-status">
          <div class="common-title">
            <img src="../../assets/moka/title.png"/>
            <label>安全设备状态</label>
          </div>
          <div class="data_status_view">
            <equip-status></equip-status>
          </div>
        </div>
        <div class="safe-event">
          <div class="common-title">
            <img src="../../assets/moka/title.png"/>
            <label>安全事件</label>
          </div>
          <div class="safe-event-view">
            <safe-event></safe-event>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="Infrastructure-view">
          <div class="main-title">基础设施</div>
          <div class="Infrastructure-select">
            <div :class=" sel1 ? 'selected' : 'un-select'" @click="hostClick">主机</div>
            <div :class=" sel2 ? 'selected' : 'un-select'" @click="storageClick">存储</div>
            <div :class=" sel3 ? 'selected' : 'un-select'" @click="networkClick">网络</div>
            <div :class=" sel4 ? 'selected' : 'un-select'" @click="otherClick">其他</div>
            <div :class=" sel5 ? 'selected' : 'un-select'" @click="levelFourClick">四级网络</div>
          </div>
          <div class="Infrastructure-show" v-if="infraStatus === 1">
            <div class="device-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <!--<label>主机设备总数及纳入监控数</label>-->
                <label>设备监控情况</label>
              </div>
              <equip-num :monitorNum="monitorNum"></equip-num>
            </div>
            <div class="warn-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>告警数</label>
              </div>
              <div class="warn-num-view">
                <warn-num></warn-num>
              </div>
            </div>
            <div class="host-use-rate">
              <host-view :hostDisks="hostDisks" :hostCPU="hostCPU" :hostMem="hostMem"></host-view>
            </div>
            <!--   <div class="use-ratio first-ratio">
                 <div class="common-title">
                   <img src="../../assets/moka/title.png"/>
                   <label>磁盘利用率</label>
                 </div>
                 <div class="use-ratio-view">
                   <use-rate></use-rate>
                 </div>
               </div>
               <div class="use-ratio">
                 <div class="common-title">
                   <img src="../../assets/moka/title.png"/>
                   <label>CPU利用率</label>
                 </div>
                 <div class="use-ratio-view">
                   <use-rate></use-rate>
                 </div>
               </div>
               <div class="use-ratio">
                 <div class="common-title">
                   <img src="../../assets/moka/title.png"/>
                   <label>内存利用率</label>
                 </div>
                 <div class="use-ratio-view">
                   <use-rate></use-rate>
                 </div>
               </div>-->
          </div>
          <div class="Infrastructure-show" v-if="infraStatus === 2">
            <div class="device-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>存储设备总数及纳入监控数</label>
              </div>
              <equip-num></equip-num>
            </div>
            <div class="warn-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>告警数</label>
              </div>
              <div class="warn-num-view">
                <warn-num></warn-num>
              </div>
            </div>
            <div class="use-ratio first-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>磁盘利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>CPU利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>内存利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
          </div>
          <div class="Infrastructure-show" v-if="infraStatus === 3">
            <div class="device-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>网络设备总数及纳入监控数</label>
              </div>
              <equip-num></equip-num>
            </div>
            <div class="warn-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>告警数</label>
              </div>
              <div class="warn-num-view">
                <warn-num></warn-num>
              </div>
            </div>
            <div class="use-ratio first-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>磁盘利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>CPU利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>内存利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
          </div>
          <div class="Infrastructure-show" v-if="infraStatus === 4">
            <div class="device-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>其他设备总数及纳入监控数</label>
              </div>
              <equip-num></equip-num>
            </div>
            <div class="warn-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>告警数</label>
              </div>
              <div class="warn-num-view">
                <warn-num></warn-num>
              </div>
            </div>
            <div class="use-ratio first-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>磁盘利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>CPU利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>内存利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
          </div>
          <div class="Infrastructure-show" v-if="infraStatus === 5">
            <div class="device-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>四级设备总数及纳入监控数</label>
              </div>
              <equip-num></equip-num>
            </div>
            <div class="warn-num">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>告警数</label>
              </div>
              <div class="warn-num-view">
                <warn-num></warn-num>
              </div>
            </div>
            <div class="use-ratio first-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>磁盘利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>CPU利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
            <div class="use-ratio">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>内存利用率</label>
              </div>
              <div class="use-ratio-view">
                <use-rate></use-rate>
              </div>
            </div>
          </div>
        </div>
        <div class="safe-view">
          <div class="main-title safe-title">安全</div>
          <div class="safe-main-container">
            <div class="data-capacity safe-container">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>数据容量</label>
              </div>
              <div class="data-capacity-view">
                <data-capa></data-capa>
              </div>
            </div>
            <div class="backup-rate safe-container">
              <div class="common-title">
                <img src="../../assets/moka/title.png"/>
                <label>备份率</label>
              </div>
              <div class="backup-rate-view">
                <equip-status></equip-status>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="law-firm">
          <div class="big-title">法务系统驾驶舱</div>
          <div class="l-spec">100%</div>
        </div>
        <div class="application-view">
          <div class="app-title">应用</div>
          <div class="common-title app-common-title">
            <img src="../../assets/moka/title.png"/>
            <label>应用</label>
          </div>
          <div class="application-main-view">
            <app-num></app-num>
          </div>
        </div>
      </div>
    </div>
    <div id="index3" class="index" v-if="indexStatus === 3">
      <div class="quality-top-view">
        <div class="quality-base-equip">
          <div class="base-equip-title">基础设施</div>
        </div>
        <div class="base-equip-view" >
          <div class="common-title" style="position:absolute; left: 60%;">
            <img src="../../assets/moka/title.png"/>
            <label>总体监控情况</label>
          </div>
          <over-all></over-all>
        </div>
        <div class="all-app-eff">
          <div class="common-title" style="left: 83%; top: 83%;">
            <img src="../../assets/moka/title.png"/>
            <label>各应用系统效能</label>
          </div>
          <div class="net-num-view">
            <!--<div class="net-num-title">-->
            <!--<label style=" left: 10%;">设备总数量</label>-->
            <!--<label style=" right: 10%;">已监控数量</label>-->
            <!--</div>-->
            <!--<div class="host-num-view">-->
            <host-num></host-num>
            <!--</div>-->
          </div>
          <div class="monitor-num-index">
            <div class="net-name"  :class="netSel1 ? 'selected' : 'un-select'" @click="outsideNetClick">外部专网</div>
            <div class="net-name " :class="netSel2 ? 'selected' : 'un-select'" @click="internetClick">互联网</div>
            <div class="net-name " :class="netSel3 ? 'selected' : 'un-select'" @click="dataNetClick">数据专网</div>
            <div class="net-name " :class="netSel4 ? 'selected' : 'un-select'" @click="videoNetClick">视频专网</div>
            <div class="net-name " :class="netSel5 ? 'selected' : 'un-select'" @click="secretNetClick">涉密专网</div>
            <div class="net-name " :class="netSel6 ? 'selected' : 'un-select'" @click="moveNetClick">移动专网</div>
          </div>
          <div class="monitor-num-view" v-if="netStatus === 1">
            <div class="monitor-num-tip">
              <label>已监控数量：</label>
              <br/>
              <label style="font-size: 1.3rem">16</label>
            </div>
            <monitor-num></monitor-num>
          </div>
          <div class="monitor-num-view" v-if="netStatus === 2">
            <div class="monitor-num-tip">
              <label>已监控数量：</label>
              <br/>
              <label style="font-size: 1.3rem">20</label>
            </div>
            <monitor-num></monitor-num>
          </div>
          <div class="monitor-num-view" v-if="netStatus === 3">
            <div class="monitor-num-tip">
              <label>已监控数量：</label>
              <br/>
              <label style="font-size: 1.3rem">10</label>
            </div>
            <monitor-num></monitor-num>
          </div>
          <div class="monitor-num-view" v-if="netStatus === 4">
            <div class="monitor-num-tip">
              <label>已监控数量：</label>
              <br/>
              <label style="font-size: 1.3rem">89</label>
            </div>
            <monitor-num></monitor-num>
          </div>
          <div class="monitor-num-view" v-if="netStatus === 5">
            <div class="monitor-num-tip">
              <label>已监控数量：</label>
              <br/>
              <label style="font-size: 1.3rem">65</label>
            </div>
            <monitor-num></monitor-num>
          </div>
          <div class="monitor-num-view" v-if="netStatus === 6">
            <div class="monitor-num-tip">
              <label>已监控数量：</label>
              <br/>
              <label style="font-size: 1.3rem">6</label>
            </div>
            <monitor-num></monitor-num>
          </div>
        </div>
        <div class="quality-all-equip">
          <div class="all-equip-title">报警情况总览</div>
          <div class="error-num-view">
            <error-num></error-num>
          </div>
        </div>
      </div>
      <div class="quality-bottom-view">
        <div class="quality-safe-view">
          <div class="main-title" style="top:6%;letter-spacing: 0;left: -5%;">安全态势</div>
          <div class="safe-status-view">
            <safe-status></safe-status>
          </div>
        </div>
        <div class="quality-data-view">
          <div class="main-title" style="letter-spacing: 0;font-size: 1.2rem;left: -4%;">数据态势</div>
          <div class="data-increase-view">
            <data-increase></data-increase>
          </div>
          <div class="backup-status">
            <div class="common-title" style=" position:absolute;top: 52%">
              <img src="../../assets/moka/title.png"/>
              <label>备份率</label>
            </div>
            <div class="backup-status-view">
              <backup-rate></backup-rate>
            </div>
          </div>
        </div>
        <div class="quality-app-view">
          <div class="main-title" style="letter-spacing: 0; top:2%;">应用态势</div>
          <div class="qua-app-status">
            <app-status></app-status>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  // import { mapGetters } from 'vuex'
  // 组件
  import SafeEvent from './components/SafeEvent'
  import EquipNum from './components/EquipNum'
  import AppNum from './components/AppNum'
  import WarnNum from './components/WarnNum'
  import VisitNum from './components/VisitNum'
  import EquipStatus from './components/EquipStatus'
  import UseRate from './components/UseRate'
  import DataCapa from './components/DataCapa'
  import AvnuTime from './components/AvnuTime'
  import TimeAnal from './components/TimeAnal'
  import WorkOrder from './components/WorkOrder'
  import AccuseStatus from './components/AccuseStatus'
  import HostView from './components/HostView'
  import HostNum from './components/HostNum'
  import MonitorNum from './components/MonitorNum'
  import ErrorNum from './components/ErrorNum'
  import DataIncrease from './components/DataIncrease'
  import BackupRate from './components/BackupRate'
  import SafeStatus from './components/SafeStatus'
  import AppStatus from './components/AppStatus'
  import OverAll from './components/OverAll'
  import StatusWater from './components/StatusWater'

  // 接口
  import { getMonitorCount } from '../../api/moka'
  import { getHostView } from '../../api/moka'

  export default {
    name: 'moka',
    components: {
      SafeEvent,
      EquipNum,
      AppNum,
      EquipStatus,
      WarnNum,
      UseRate,
      DataCapa,
      AvnuTime,
      VisitNum,
      TimeAnal,
      WorkOrder,
      AccuseStatus,
      HostView,
      HostNum,
      MonitorNum,
      ErrorNum,
      DataIncrease,
      BackupRate,
      SafeStatus,
      AppStatus,
      OverAll,
      StatusWater
    },
    data: function() {
      return {
        // 切换视图
        indexStatus: 2,
        index1: false,
        index2: true,
        index3: false,
        // 全景视图 基础设施切换视图
        infraStatus: 1,
        sel1: true,
        sel2: false,
        sel3: false,
        sel4: false,
        sel5: false,
        //  质控态势 各应用系统效能 切换视图
        netStatus: 1,
        netSel1: true,
        netSel2: false,
        netSel3: false,
        netSel4: false,
        netSel5: false,
        netSel6: false,
        //  主机设备已监控和为监控数量
        monitorNum: [0, 0],
        //  主机设备cpu、磁盘、内存利用率
        hostDisks: [],
        hostCPU: [],
        hostMem: []
      }
    },
    mounted() {
      this.getMonitorNum()
      this.getHostViewNum()
      var self = this
      setInterval(function() {
        this.hostDisks = []
        this.hostCPU = []
        this.hostMem = []
        self.getHostViewNum()
      }, 30000)
    },
    methods: {
      getMonitorNum() {
        this.monitorNum = []
        getMonitorCount()
          .then(response => {
            // console.log(111, response)
            var res = response.data
            this.monitorNum.push(res.monitorCount, res.offlineCount)
          })
      },
      // getUseRate(){
      //
      // }

      getHostViewNum() {
        var self = this
        getHostView()
          .then(response => {
            var res = response.data
            console.log(res)
            for (var k in res.disks) {
              self.hostDisks.push(res.disks[k].usedRate)
              self.hostCPU.push(res.cpuUsedRates[k].usedRate)
              self.hostMem.push(res.memoryUsedRates[k].usedRate)
            }
          })
      },

      // 切换视图
      toIndex1() {
        this.indexStatus = 1
        this.index1 = true
        this.index2 = false
        this.index3 = false
      },
      toIndex2() {
        this.indexStatus = 2
        this.index1 = false
        this.index2 = true
        this.index3 = false

        this.getMonitorNum()
      },
      toIndex3() {
        this.indexStatus = 3
        this.index1 = false
        this.index2 = false
        this.index3 = true
      },
      // 切换 全景视图 基础设施界面
      hostClick() {
        this.sel1 = true
        this.sel2 = false
        this.sel3 = false
        this.sel4 = false
        this.sel5 = false
        this.infraStatus = 1
      },
      storageClick() {
        this.sel2 = true
        this.sel1 = false
        this.sel3 = false
        this.sel4 = false
        this.sel5 = false
        this.infraStatus = 2
      },
      networkClick() {
        this.sel3 = true
        this.sel1 = false
        this.sel2 = false
        this.sel4 = false
        this.sel5 = false
        this.infraStatus = 3
      },
      otherClick() {
        this.sel4 = true
        this.sel1 = false
        this.sel2 = false
        this.sel3 = false
        this.sel5 = false
        this.infraStatus = 4
      },
      levelFourClick() {
        this.sel5 = true
        this.sel1 = false
        this.sel2 = false
        this.sel4 = false
        this.sel3 = false
        this.infraStatus = 5
      },
      // 切换  质控态势 各应用系统效能
      outsideNetClick() {
        this.netSel1 = true
        this.netSel2 = false
        this.netSel3 = false
        this.netSel4 = false
        this.netSel5 = false
        this.netSel6 = false
        this.netStatus = 1
      },
      internetClick() {
        this.netSel1 = false
        this.netSel2 = true
        this.netSel3 = false
        this.netSel4 = false
        this.netSel5 = false
        this.netSel6 = false
        this.netStatus = 2
      },
      dataNetClick() {
        this.netSel1 = false
        this.netSel2 = false
        this.netSel3 = true
        this.netSel4 = false
        this.netSel5 = false
        this.netSel6 = false
        this.netStatus = 3
      },
      videoNetClick() {
        this.netSel1 = false
        this.netSel2 = false
        this.netSel3 = false
        this.netSel4 = true
        this.netSel5 = false
        this.netSel6 = false
        this.netStatus = 4
      },
      secretNetClick() {
        this.netSel1 = false
        this.netSel2 = false
        this.netSel3 = false
        this.netSel4 = false
        this.netSel5 = true
        this.netSel6 = false
        this.netStatus = 5
      },
      moveNetClick() {
        this.netSel1 = false
        this.netSel2 = false
        this.netSel3 = false
        this.netSel4 = false
        this.netSel5 = false
        this.netSel6 = true
        this.netStatus = 6
      }
    }
  }
</script>

<style scoped>

  #view-container {
    padding: 0px;
    margin: 0px;
    top: 0px;
    left: 0px;
    border: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("../../assets/moka/bg.png") no-repeat center fixed;
    background-size: 100% 100%;
    font-family: "Microsoft YaHei";
    overflow: hidden;
  }

  .index {
    height: 90%;
    position: relative;
    top: 10%;
  }

  .effect-eval {
    position: relative;
    height: 92%;
    width: 30%;
    /*background-color: #fff;*/
    display: inline-block;
    float: left;
    margin-left: 2.3%;
    margin-top: 2%;
  }

  .app-efficacy {
    background: url("../../assets/moka/yyxn-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .app-efficacy-all {
    position: relative;
    /*background-color: #fff;*/
    width: 85%;
    margin-left: 5%;
    margin-top: 10%;
    height: 38%;
  }

  .every-app-efficacy {
    background: url("../../assets/moka/gyyxt-bg.png");
    background-size: 100% 100%;
  }

  .every-app-view {
    position: relative;
    width: 96%;
    margin-left: 2%;
    height: 66%;
    top: 10%;
    /*background-color: #fff;*/
  }

  .app-efficacy-status {
    margin-top: 1%;
    height: 45%;
    margin-left: 8%;
    /*background-color: #fff;*/
  }

  .app-eff-status-view {
    position: relative;
    /*background-color: #fff;*/
    width: 96%;
    margin-left: 2%;
    height: 26%;
    margin-top: 1%;
  }

  .base-app-eff {
    position: absolute;
    /*background-color: #fff;*/
    width: 50%;
    height: 100%;
    left: 30%;
    top: 3%;
  }

  .eff-status1 {
    height: 32%;
  }

  .eff-status2 {
    height: 30%;
  }

  .reason-and-time {
    position: relative;
    display: inline-block;
    float: left;
    width: 48%;
    margin-right: 1%;
    height: 100%;
    /*background-color: #fff;*/
  }

  .eff-status-source {
    position: relative;
    /*background-color: #fff;*/
    width: 90%;
    height: 38%;
    margin: auto;
    background: url("../../assets/moka/sj.png");
    background-size: 100% 100%;
  }

  .eff-status-source label {
    position: relative;
    color: #fff;
    left: 30%;
    top: 22%;
    font-size: 18px;
  }

  .operation-manage {
    background: url("../../assets/moka/ywglxn.png") no-repeat;
    background-size: 100% 100%;
  }

  .operation-manage-view {
    position: relative;
    /*background-color: #fff;*/
    width: 88%;
    height: 40%;
    margin-left: 6%;
    margin-top: 10%;
  }

  .app-sys-detail {
    position: relative;
    width: 90%;
    height: 80%;
    margin-left: 5%;
    margin-top: 2%;
    background: url("../../assets/moka/gyyxtxn-d-bg.png");
    background-size: 100% 100%;
  }

  /*.call-back-time {*/
  /*position: relative;*/
  /*display: inline-block;*/
  /*float: left;*/
  /*background: #fff;*/
  /*width: 60%;*/
  /*height: 20%;*/
  /*margin-left: 5px;*/
  /*}*/

  .warn-status {
    position: absolute;
    top: -2%;
    left: 40%;
    /*display: inline-block;*/
    /*float: left;*/
    width: 25%;
    height: 25%;
    margin-left: 5px;
    /*background: #fff;*/
  }

  /*.if-warn {*/
  /*position: absolute;*/
  /*!*display: inline-block;*!*/
  /*!*float: left;*!*/
  /*background: #fff;*/
  /*width: 60%;*/
  /*height: 100%;*/
  /*top:0;*/
  /*right: 0;*/
  /*}*/

  .accuse-all {
    position: relative;
    /*background-color: #fff;*/
    width: 100%;
    height: 80%;
    /*margin: auto;*/
    background: url("../../assets/moka/tscltj.png");
    background-size: 100% 100%;
  }

  .accuse-view {
    margin-top: 2%;
    height: 38%;
  }

  .accuse-status {
    position: relative;
    width: 100%;
    height: 40%;
    /*margin-top: 1%;*/
    /*background-color: #fff;*/
  }

  .tip-title {
    position: relative;
    width: 100%;
    height: 20px;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    vertical-align: middle;
  }

  .tip-img {
    position: absolute;
    width: 10px;
    height: 20px;
    background-color: #32bef2;
  }

  .tip-title label {
    position: absolute;
    left: 15px;
  }

  .accuse-status-view {
    position: relative;
    width: 100%;
    height: 70%;
    margin-top: 2%;
    /*background-color: #fff;*/
    background: url("../../assets/moka/tsqkbg.png");
    background-size: 100% 100%;
  }

  .app-sys-efficacy {
    background: url("../../assets/moka/gyyxtxn-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .right-container {
    position: relative;
    height: 60%;
  }

  .bottom-container {
    position: relative;
    height: 35%;
    margin-top: 10px;
  }

  .common-title {
    position: relative;
    top: 14px;
    left: 14px;
    width: 140px;
    height: 60px;
    text-align: left;
    color: #fff;
  }

  .common-title img {
    position: absolute;
    width: 100%;
    height: 50%;
  }

  .common-title label {
    position: absolute;
    top: 40%;
    left: 8%;
    font-size: 1rem;
  }

  .view-title {
    position: fixed;
    width: 24%;
    height: 8%;
    margin: 2% 38%;
    /*background-color: #fff;*/
    text-align: center;
  }

  .view-title div {
    padding: 0;
    display: inline-block;
    position: relative;
    height: 100%;
    color: #fff;
  }

  .eff-status-title {
    left: 64%;
  }

  /*.operation-manage-title {*/
  /*display: inline-block;*/
  /*float: left;*/
  /*}*/

  .primary-title {
    width: 34%;
    font-size: 1.8rem;
    font-weight: 900;
  }

  .secondary-title {
    width: 30%;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .data-view {
    display: inline-block;
    float: left;
    z-index: 1;
    position: relative;
    width: 20%;
    height: 95%;
    top: 2%;
    left: 3%;
    background: url("../../assets/moka/aqsj-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .main-title {
    position: relative;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    width: 40%;
    margin: auto;
    top: 3%;
    letter-spacing: 3px;
    text-align: center;
  }

  .app-efficacy-title {
    top: 1%;
  }

  .base-equip-title {
    position: relative;
    color: #fff;
    width: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    top: 22%;
    letter-spacing: 3px;
    left: 4%;
  }

  .app-sys-title {
    top: 4%;
    letter-spacing: 2px;
  }

  .Infrastructure-select {
    position: relative;
    width: 90%;
    height: 10%;
    margin: auto;
    top: 8%;
    text-align: center;
  }

  .Infrastructure-select div {
    display: inline-block;
    position: relative;
    background-size: 100% 100%;
    height: 100%;
    line-height: 100%;
    vertical-align: middle;
    padding-top: 2%;
    font-size: 1.2rem;
    width: 19%;
    color: #fff;
  }

  .selected {
    background: url("../../assets/moka/selected.png") no-repeat;
    background-size: 100% 100%;
  }

  .un-select {
    background: url("../../assets/moka/unselect.png") no-repeat;
    background-size: 100% 100%;
  }

  .Infrastructure-show {
    position: relative;
    width: 90%;
    margin: auto;
    height: 70%;
    top: 10%;
    /*background-color: #fff;*/
  }

  .device-num {
    display: inline-block;
    float: left;
    position: relative;
    /*background-color: #2276d2;*/
    width: 60%;
    height: 60%;
  }

  .warn-num {
    display: inline-block;
    float: left;
    /*background-color: #22dfd2;*/
    position: relative;
    width: 40%;
    height: 60%;
  }

  .warn-num-view {
    position: relative;
    width: 100%;
    height: 70%;
    /*background-color: #fff;*/
  }

  .host-use-rate {
    position: absolute;
    top:60%;
    width: 100%;
    height: 44%;
    /*background-color: #fff;*/
  }

  .use-ratio {
    display: inline-block;
    /*background-color: #227656;*/
    position: relative;
    width: 32%;
    height: 40%;
    margin: 0 2px;
  }

  .use-ratio-view {
    position: relative;
    /*background-color: #fff;*/
    width: 70%;
    height: 70%;
    left: 35%;
    top: -10%;
  }

  .first-ratio {
    margin-left: 1%;
  }

  .data-status {
    position: relative;
    top: 8%;
    width: 88%;
    height: 28%;
    margin: auto;
    background: url("../../assets/moka/aqsbzt-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .data_status_view {
    position: relative;
    width: 96%;
    height: 70%;
    margin: auto;
    /*background-color: #fff;*/
  }

  .safe-event {
    position: relative;
    top: 10%;
    width: 88%;
    height: 52%;
    margin: auto;
    /*background-color: #fff;*/
  }

  .safe-event-view {
    z-index: 100;
    position: relative;
    /*background-color: #fff;*/
    width: 90%;
    margin: auto;
    height: 80%;
    top: 5%;
  }

  .Infrastructure-view {
    display: inline-block;
    z-index: 1;
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
    top: 2%;
    left: 5%;
    background: url("../../assets/moka/jcss-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .safe-view {
    display: inline-block;
    z-index: 1;
    position: relative;
    float: left;
    width: 20%;
    height: 100%;
    top: 2%;
    left: 7%;
    background: url("../../assets/moka/aq.png") no-repeat;
    background-size: 100% 100%;
  }

  .safe-title {
    right: -30%;
    font-size: 1.3rem;
    top: 4%;
  }

  .safe-main-container {
    position: relative;
    width: 90%;
    height: 80%;
    top: 6%;
    margin: auto;
    /*background-color: #fff;*/
  }

  .safe-container {
    position: relative;
    height: 49%;
    width: 100%;
    margin-top: 1%;
  }

  .data-capacity {
    /*background-color: #2276d2;*/
  }

  .data-capacity-view {
    position: relative;
    width: 100%;
    height: 75%;
    /*background-color: #fff;*/
  }

  .backup-rate {
    /*background-color: #f0dacf;*/
  }

  .backup-rate-view {
    position: relative;
    /*background-color: #fff;*/
    width: 100%;
    height: 70%;
    margin: auto;
  }

  .law-firm {
    display: inline-block;
    z-index: 1;
    position: relative;
    float: left;
    width: 22%;
    height: 80%;
    top: 10%;
    left: 3%;
    background: url("../../assets/moka/fwxtjsc.png") no-repeat;
    background-size: 100% 100%;
  }

  .big-title {
    position: relative;
    height: 100%;
    width: 48%;
    left: 12%;
    top: 26%;
    color: #fff;
    font-size: 2rem;
    font-weight: bolder;
    text-align: center;
  }

  .l-spec {
    position: absolute;
    color: #fff;
    font-size: 20px;
    bottom: 18%;
    right: 7%;
  }

  .application-view {
    display: inline-block;
    z-index: 1;
    position: relative;
    float: left;
    width: 52%;
    height: 100%;
    top: 3%;
    left: 3%;
    background: url("../../assets/moka/yy.png") no-repeat;
    background-size: 100% 100%;
  }

  .app-title {
    position: relative;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    top: 10%;
    left: 4%;
    letter-spacing: 8px;
  }

  .app-common-title {
    position: absolute;
    left: 20%;
    top: 16%;
  }

  .application-main-view {
    /*background-color: #fff;*/
    position: relative;
    width: 62%;
    left: 36%;
    height: 70%;
    top: 5%;
  }

  .quality-top-view {
    position: relative;
    height: 40%;
    width: 96%;
    margin-left: 2%;
    /*background: #fff;*/
  }

  .quality-bottom-view {
    position: relative;
    height: 55%;
    width: 96%;
    margin-left: 2%;
    /*background: #fff;*/
    margin-top: 1%;
  }

  .quality-base-equip {
    position: relative;
    display: inline-block;
    float: left;
    width: 80%;
    height: 100%;
    background: url("../../assets/moka/jcss.png") no-repeat;
    background-size: 100% 100%;
  }

  .base-equip-view {
    position: absolute;
    /*background: #fff;*/
    width: 22%;
    height: 80%;
    left: 8%;
    top: 11%;
  }

  .all-app-eff {
    position: absolute;
    /*background: #fff;*/
    width: 44%;
    height: 80%;
    left: 33%;
    top: 11%;
  }

  .net-num-view {
    position: absolute;
    width: 55%;
    height: 100%;
    /*background-color: #fff;*/
    top: 0%;
  }

  .net-num-title {
    position: absolute;
    width: 100%;
    height: 10%;
    top:0;
    /*background-color: #fff;*/
  }

  .net-num-title label{
    /*width: 50%;*/
    position: absolute;
    height: 100%;
    color: #fff;
    /*top:10%;*/
  }

  .host-num-view {
    position: absolute;
    width: 100%;
    height: 90%;
    top:5%;
    /*background-color: #0a76a4;*/
  }

  .monitor-num-index {
    position: absolute;
    width: 10%;
    height: 100%;
    top: 0;
    left:65%;
    /*background: #fff;*/
  }

  .net-name {
    position: relative;
    width: 90%;
    height: 14%;
    margin-top: 5%;
    color: #fff;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    font-size: 1rem;
    /*background: #fff;*/
  }

  .monitor-num-view {
    position: absolute;
    width: 30%;
    height: 80%;
    top:0;
    left: 73%;
    /*background: #f0dacf;*/
  }

  .monitor-num-tip {
    position: absolute;
    width: 50%;
    height: 40%;
    margin-left: 26%;
    top:40%;
    color: #fff;
    text-align: center;
    font-size: 1rem;
  }

  .quality-all-equip {
    position: relative;
    display: inline-block;
    float: left;
    width: 18%;
    left: 1%;
    height: 100%;
    background: url("../../assets/moka/ztjkqk.png") no-repeat;
    background-size: 100% 100%;
  }

  .all-equip-title {
    position: absolute;
    color: #fff;
    width: 84%;
    height: 10%;
    margin-left: 8%;
    top: 11%;
    /*line-height: 40px;*/
    vertical-align: center;
    font-size: 1.3rem;
    text-align: center;
  }

  .error-num-view {
    position: absolute;
    width: 87%;
    height: 66%;
    margin-left: 6%;
    top: 25%;
    /*background-color: #fff;*/
  }

  .quality-safe-view {
    position: relative;
    display: inline-block;
    float: left;
    width: 30%;
    height: 100%;
    background: url("../../assets/moka/aqts-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .safe-status-view {
    position: absolute;
    width: 90%;
    height: 78%;
    margin-left: 5%;
    /*background-color: #fff;*/
    top: 15%;
  }

  .quality-data-view {
    position: relative;
    display: inline-block;
    float: left;
    width: 18%;
    margin-left: 1%;
    height: 100%;
    background: url("../../assets/moka/sjts-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .data-increase-view {
    position: absolute;
    width: 100%;
    height: 40%;
    top:10%;
    /*background-color: #fff;*/
  }

  .backup-status-view {
    position: absolute;
    /*background-color: #fff;*/
    width: 90%;
    margin-left: 5%;
    height: 30%;
    top:60%;
  }

  .quality-app-view {
    position: relative;
    display: inline-block;
    float: left;
    width: 49%;
    margin-left: 1%;
    height: 100%;
    background: url("../../assets/moka/yyts-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .qua-app-status {
    position: absolute;
    width: 90%;
    margin-left: 5%;
    height: 86%;
    margin-top:  2%;
    /*background-color: #fff;*/
  }

</style>
