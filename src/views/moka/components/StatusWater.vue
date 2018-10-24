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
        this.chart = echarts.init(this.$el, 'macarons')

        var data = [];
        var labelData = [];
        for (var i = 0; i < 5; ++i) {
          data.push({
            value: Math.random() * 10 + 10 - Math.abs(i - 12),
            name: i + ':00'
          });
          labelData.push({
            value: 1,
            name: '设备'+(i+1)
          });
        }

        this.chart.setOption({

          color: ['#32aca9'],
          // tooltip: {
          //   trigger: 'axis'
          // },
          series: [{
            type: 'pie',
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
            },
            label: {
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
