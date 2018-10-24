<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    deviceName: {
      type: Array,
      default: function() {
        return ['', '']
      }
    },
    overviewData: {
      type: Array,
      default: function() {
        return [10, 10]
      }
    }
  },
  data() {
    return {
      chart: null,
      ovData: this.overviewData,
      ovName: this.deviceName,
      // nameList: ['linux', 'windows', '路由器', '交换机', '网关', '安全设备', 'mac', '防火墙'],
      legendData: [],
      seriesData: [],
      selected: []
    }
  },
  computed: {
    // timeOut: {
    //   set(val) {
    //     this.$store.state.timeout.compileTimeout = val
    //   },
    //   get() {
    //     return this.$store.state.timeout.compileTimeout
    //   }
    // }
  },
  watch: {
    ovData: function() {
      this.getData()
      this.initChart()
    },
    deviceName: function() {
      this.getData()
      this.initChart()
    }
  },
  mounted() {
    // console.log(this)
    // this.getData()
    // this.initChart()
    // const that = this
    // setInterval(function() {
    //   // console.log(this)
    //   that.getData()
    //   that.initChart()
    // }, 2000)
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getData() {
      this.legendData = []
      this.seriesData = []
      this.selected = []
      for (var i = 0; i < this.deviceName.length; i++) {
        var name = this.deviceName[i]
        this.legendData.push(name)
        this.seriesData.push({
          name: name,
          value: this.ovData[i]
        })
        this.selected[name] = i
      }
    },
    initChart() {
      var i = 0
      var colors = [
        '#E87C25',
        '#009eff',
        '#C1232B',
        '#B5C334',
        '#FCCE10'
      ]
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   type: 'scroll',
        //   orient: 'vertical',
        //   right: 10,
        //   top: 20,
        //   bottom: 20,
        //   data: this.legendData,
        //   selected: this.selected
        // },
        series: [
          {
            name: '设备总览',
            type: 'pie',
            label: {
              normal: {
                show: true,
                position: 'right',
              }
            },
            radius: '55%',
            center: ['50%', '50%'],
            data: this.seriesData,
            itemStyle: {
              normal: {
                color: function() {
                  if (i === 5) {
                    i = 0
                  }
                  return colors[i++]
                }
                // label: {
                //   show: false
                // },
                // labelLine: {
                //   show: false
                // }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
