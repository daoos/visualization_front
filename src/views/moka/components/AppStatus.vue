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

        var colors = [
          '#57617B',
          '#57617B',
          '#57617B',
          'black'];

        this.chart.setOption({
          color: colors,
          // backgroundColor: '#313642',
          title: {
            text: "应用状态",
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#fff'
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },

          legend: {
            right: '10%',
            top: '5%',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['正常状态', '故障状态', '劣化状态', '已纳入监控'],
            right: '40%',
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          grid: {
            left: '5%',
            right: '10%',
            bottom: '6%',
            top: '20%',
            containLabel: true
          },

          // toolbox: {
          //   feature: {
          //     dataView: {
          //       show: true,
          //       readOnly: false
          //     },
          //     restore: {
          //       show: true
          //     },
          //     saveAsImage: {
          //       show: true
          //     }
          //   }
          // },

          dataZoom: [{
            show: false,
            start: 0,
            end: 80,
            bottom: '8%'
          }, ],

          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#d05f61'
              }
            },
            data: ['外部专网', '互联网', '数据专网', '涉密专网', '视频专网', '移动专网']
          }],
          yAxis: [{
            type: 'value',
            name: '正常状态数量',
            min: 0,
            max: 1000,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#32bef2'
              }
            },
            axisLabel: {
              formatter: '{value} 台'
            },
            splitLine: {
              lineStyle: {
                color: '#32bef2'
              }
            },
          }, {
            type: 'value',
            name: '故障状态数量',
            min: 0,
            max: 50,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: '#32bef2'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#32bef2'
              }
            },
            axisLabel: {
              formatter: '{value} 台'
            }
          }, {
            type: 'value',
            name: '性能劣化数量',
            min: 0,
            max: 100,
            position: 'right',
            offset: 160,
            axisLine: {
              lineStyle: {
                color: '#32bef2'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              formatter: '{value} 台'
            }
          }, {
            type: 'value',
            name: '已纳入监控数量',
            min: 0,
            max: 1000,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#32bef2'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              formatter: '{value} 台'
            }
          }],
          series: [
            {
            name: '正常状态',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(219, 50, 51, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {

                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: [200, 259, 170, 182, 256, 507, 456, 220, 256, 300, 244, 263]
          }, {
            name: '故障状态',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

              }
            },
            yAxisIndex: 1,
            data: [6, 9, 1, 4, 7, 7, 6, 2, 7, 8, 0, 3]
          }, {
            name: '劣化状态',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(137, 189, 27, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12

              }
            },
            yAxisIndex: 2,
            data: [20, 22, 33, 45, 63, 102, 203, 34, 30, 65, 120, 62]
          }, {
            name: '已纳入监控',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(50, 172, 169, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(50, 172, 169, 0)'
                }], false),
                shadowColor: 'rgba(50, 172, 169, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(50, 172, 169)',
                borderColor: 'rgba(50, 172, 169,0.27)',
                borderWidth: 12

              }
            },
            yAxisIndex: 3,
            data: [200, 202, 33, 405, 603, 102, 203, 23.4, 230, 160, 120, 602]
          }]
        })
      }
    }
  }
</script>
