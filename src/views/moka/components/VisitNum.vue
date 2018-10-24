<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '@/utils'

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
        default: '100%'
      },
      // deviceName: {
      //   type: Array,
      //   default: function() {
      //     return ['', '']
      //   }
      // },
      // overviewData: {
      //   type: Array,
      //   default: function() {
      //     return [10, 10]
      //   }
      // }
    },
    data() {
      return {
        chart: null,

      }
    },
    computed: {},
    watch: {
      // ovData: function() {
      //   this.getData()
      //   this.initChart()
      // },
      // deviceName: function() {
      //   this.getData()
      //   this.initChart()
      // }
    },
    mounted() {
      this.initChart()
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
      initChart() {
        var timeData = ['0:00', '0:30',
          '1:00', '1:30',
          '2:00', '2:30',
          '3:00', '3:30',
          '4:00', '4:30',
          '5:00', '5:30',
          '6:00', '6:30',
          '7:00', '7:30',
          '8:00', '8:30',
          '9:00', '9:30',
          '10:00', '10:30',
          '11:00', '11:30',
          '12:00', '12:30',
          '13:00', '13:30',
          '14:00', '14:30',
          '15:00', '15:30',
          '16:00', '16:30',
          '17:00', '17:30',
          '18:00', '18:30',
          '19:00', '19:30',
          '20:00', '20:30',
          '21:00', '21:30',
          '22:00', '22:30',
          '23:00', '23:30'
        ];

        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },
          dataZoom: [{
            show: true,
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
          }, {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
          }],
          grid: [{
            top:'15%',
            left: 35,
            right: 10,
          }, {
            top:'15%',
            left: 35,
            right: 10,
          }],
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              onZero: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle:{
                color:'#FFF',
                fontSize:12
              }
            },
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            data: timeData
          }, {
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            gridIndex: 1
          }],
          yAxis: [{
            type: 'value',
            max: 500,
            name: '用户访问量:',
            min: 0,
            axisLine: {
              show: false
            },
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle:{
                color:'#FFF',
                fontSize:12
              }
            },
            interval: 100,
          }, {
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            gridIndex: 1
          }],
          series: [{
            name: '数值',
            type: 'line',
            itemStyle :{
              normal :{
                color:'#01bc8f',
              },
            },
            smooth: true,
            symbol: 'circle',
            symbolSize: 9,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            markPoint: {
              data: [{
                type: 'max',
                name: '最大值'
              }, {
                type: 'min',
                name: '最小值'
              }]
            },
            data: [113, 132, 123, 122, 132, 132, 123, 225, 223, 232, 223, 222, 223, 312, 223, 222, 223, 222, 232, 262, 232, 232, 223, 222, 223, 332, 223, 232, 223, 322, 123, 222, 231, 322, 233, 122, 223, 232, 232, 222, 223, 232, 232, 222, 232, 132, 123, 212]
          }]
        })
      }
    }
  }
</script>
