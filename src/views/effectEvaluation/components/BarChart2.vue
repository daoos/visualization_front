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
      }
    },
    data() {
      return {
        chart: null,
        breakNumber: undefined,
        vTp2: 35,
        vTp1: 15,
        vTp0: 18
      }
    },
    computed: {
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
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // legend: {
          //   show: true,
          //   // left: '10%',
          //   textStyle: {
          //     fontSize: 14,
          //     color: '#fff'
          //   },
          //   itemWidth: 19,
          //   data: [{
          //     name: '响应时长',
          //     textStyle: {
          //       color: '#E87C25'
          //     }
          //   }, {
          //     name: '标准时长',
          //     textStyle: {
          //       color: '#27727B'
          //     }
          //   }]
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#3a4b61'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: ['响应时长(ms)', '标准时长(ms)'],
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            }
          },
          series: [
            {
              name: '响应时长(ms)',
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      '#E87C25',
                      // '#27727B',
                      '#009eff',
                      '#C1232B',
                      '#B5C334',
                      '#FCCE10']
                    return colorList[params.dataIndex]
                  }
                }
              },
              type: 'bar',
              data: [25203, 19325]
            }

          ]
        })
      }
    }
  }
</script>
