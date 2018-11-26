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
      xTime: {
        type: Array
      },
      yValue: {
        type: Array
      },
      max: {
        type: Number,
        default: 0
      },
      min: {
        type: Number,
        default: 0
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
      // ovData: function() {
      //   this.getData()
      //   this.initChart()
      // },
      // deviceName: function() {
      //   this.getData()
      //   this.initChart()
      // }
      xTime: function() {
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
        this.chart.setOption({
          grid: {
            left: '1%',
            right: '1%',
            bottom: '5%',
            top: '1%'
          },
          tooltip: {
            trigger: 'axis'
          },
          // legend: {
          //   data:['频率'],
          //   textStyle:{
          //     color:'#FFF',
          //     fontSize:12
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dotted'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#FFF',
                fontSize: 8
              }
            },
            axisLine: {
              lineStyle: {
                color: '#FFF'
              }
            },
            data: this.xTime
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} Hz',
              textStyle: {
                color: '#FFF',
                fontSize: 12
              }
            },
            min: this.min,
            max: this.max,
            axisLine: {
              lineStyle: {
                color: '#FFF'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dotted'
              }
            }
          },
          series: [
            {
              name: '频率',
              type: 'line',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: '#32bef2'
                }
              },
              data: this.yValue,
              markPoint: {
                symbolSize: 1,
                data: [
                  { type: 'max', name: '最大值', itemStyle: { normal: { color: '#32bef2' }}},
                  { type: 'min', name: '最小值', itemStyle: { normal: { color: '#32bef2' }}}
                ],
                label: { normal: { textStyle: { color: '#32bef2', fontSize: 14 }}}
              },
              lineStyle: {
                normal: {
                  color: '#32bef2',
                  width: 3
                }
              },
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'solid',
                    width: 2
                  }
                },
                data: [
                  { type: 'average', name: '平均值', itemStyle: { normal: { color: '#FFFFFF' }}}
                ],
                label: { normal: { textStyle: { color: '#FFF', fontSize: 12 }}}
              }
            }
          ]
        })
      }
    }
  }
</script>
