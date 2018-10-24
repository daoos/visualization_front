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
      normalCount: {
        type: Array,
        default: function() {
          return [10, 10]
        }
      },
      exceptionCount: {
        type: Array,
        default: function() {
          return [10, 10]
        }
      }
    },
    data() {
      return {
        chart: null,
        nCount: this.normalCount,
        eCount: this.exceptionCount
      }
    },
    computed: {
    },
    watch: {
      nCount: function() {
        this.initChart()
      },
      eCount: function() {
        this.initChart()
      }
    },
    mounted() {
      // this.initChart()
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
          //   data: [{
          //     name: '数量'
          //   }],
          //   textStyle: {
          //     color: 'white'
          //   }
          //
          // },
          grid: {
            top: '10%',
            left: '0%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {
              show: false
            },
            axisLabel: {
              color: 'white'
            }
          },
          yAxis: {
            type: 'category',
            data: ['服务人民群众', '服务司法管理', '服务审判执行'],
            //   data: [{
            //     value: '服务人民群众',
            //     textStyle: {
            //       color: 'white'
            //     }
            //   }, {
            //     value: '服务司法管理',
            //     textStyle: {
            //       color: 'white'
            //     }
            //   }, {
            //     value: '服务审判执行',
            //     textStyle: {
            //       color: 'white'
            //     }
            //   }],
            axisLabel: {
              color: 'white'
            }
          },
          series: [
            {
              name: '正常数量',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'right',
                }
              },
              // data: this.nCount,
              data: [45, 78, 12],
              barWidth: 'auto',
              itemStyle: {
                normal: {
                  color: '#009eff'
                  //   {
                  //   type: 'linear',
                  //   x: 0,
                  //   y: 0,
                  //   x2: 0,
                  //   y2: 1,
                  //   colorStops: [
                  //     {
                  //       offset: 0,
                  //       color: 'rgba(255,37,117,0.7)'
                  //     },
                  //     {
                  //       offset: 0.5,
                  //       color: 'rgba(0,133,245,0.7)'
                  //     },
                  //     {
                  //       offset: 1,
                  //       color: 'rgba(0,133,245,0.3)'
                  //     }
                  //   ],
                  //   globalCoord: false
                  // }
                }
              }
            },
            {
              name: '异常数量',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'right',
                }
              },
              // data: this.eCount,
              data: [12, 23, 1],
              barWidth: 'auto',
              itemStyle: {
                normal: {
                  color: '#E87C25'
                  //   {
                  //   type: 'linear',
                  //   x: 0,
                  //   y: 0,
                  //   x2: 0,
                  //   y2: 1,
                  //   colorStops: [
                  //     {
                  //       offset: 0,
                  //       color: 'rgba(255,37,117,0.7)'
                  //     },
                  //     {
                  //       offset: 0.5,
                  //       color: 'rgba(0,255,252,0.7)'
                  //     },
                  //     {
                  //       offset: 1,
                  //       color: 'rgba(0,255,252,0.3)'
                  //     }
                  //   ],
                  //   globalCoord: false
                  // }
                }
              },
              barGap: '0'
            }
            // {
            //   name: '完成率',
            //   type: 'line',
            //   yAxisIndex: 1,
            //   data: [
            //     100,
            //     33,
            //     100,
            //     100,
            //     100,
            //     100
            //   ],
            //   itemStyle: {
            //     normal: {
            //       color: '#ffaa00'
            //     }
            //   },
            //   smooth: true
            // }
          ]
          // series: [
          //   {
          //     name: '数量',
          //     type: 'bar',
          //     label: {
          //       normal: {
          //         show: true,
          //         position: 'right',
          //         textStyle: {
          //           color: 'white'
          //         }
          //       }
          //     },
          //     itemStyle: {
          //       normal: {
          //         color: function(params) {
          //           var colorList = ['blue', 'red', 'green']
          //           return colorList[params.dataIndex]
          //         }
          //       }
          //     },
          //     barWidth: 25,
          //     data: [{
          //       name: '3',
          //       value: 3,
          //       label: {
          //         normal: {
          //           show: true,
          //           position: 'right',
          //           textStyle: {
          //             color: 'white'
          //           }
          //         }
          //       },
          //       itemStyle: {
          //         normal: {
          //           // color:'red',
          //         }
          //       }
          //     }, 1, 5]
          //   }
          // ]
        })
      }
    }
  }
</script>
