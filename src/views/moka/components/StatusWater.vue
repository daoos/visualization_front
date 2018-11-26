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
        default: '100%'
      },
      device: {
        type: Array
      }
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
        chart: null

      }
    },
    computed: {},
    watch: {
      device: function() {
        this.initChart()
      }
    },
    mounted() {
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
        this.chart = echarts.init(this.$el, 'macarons')

        var data = []
        var labelData = []

        var deviceObj = this.device
        for (var index in deviceObj) {
          labelData.push({
            value: deviceObj[index].proportion,
            name: deviceObj[index].deviceName
          })
          data.push({
            value: deviceObj[index].proportion,
            name: deviceObj[index].deviceName

          })
        }
        // for (var i = 0; i < 5; ++i) {
        //   data.push({
        //     value: Math.random() * 10 + 10 - Math.abs(i - 12),
        //     name: i + ':00'
        //   })
        //   labelData.push({
        //     value: 1,
        //     name: '设备' + (i + 1)
        //   })
        // }

        this.chart.setOption({

          color: ['#32aca9'],
          // tooltip: {
          //   trigger: 'axis'
          // },
          series: [{
            type: 'pie',
            label: { // 饼图图形上的文本标签
              normal: {
                show: true,
                position: 'inner', // 标签的位置
                textStyle: {
                  fontSize: 12, // 文字的字体大小
                  color: '#fff'
                },
                formatter: '{d}'

              }
            },
            data: data,
            roseType: 'area',
            itemStyle: {
              normal: {
                color: '#ff0200',
                borderColor: '#fff'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }, {
            type: 'pie',
            data: labelData,
            radius: ['75%', '100%'],
            zlevel: -2,
            itemStyle: {
              normal: {
                color: '#32aca9',
                borderColor: '#fff'
              }
            },
            label: {
              normal: {
                position: 'inside'
              }
            }
          }]

        })
      }
    }
  }
</script>
