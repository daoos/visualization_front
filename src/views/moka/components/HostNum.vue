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
        option: []
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
      this.initOption()
      this.initChart(this.option)
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
      initOption() {
        var myData = ['核心应用', '重要应用', '一般应用']
        var lineData = [180, 90, 120]
        var lastYearData = {
          1: [3, 20, 62]
        }
        var thisYearData = {
          1: [11, 38, 23]
        }
        var timeLineData = [1]

        this.option = {
          baseOption: {
            tooltip: {
              trigger: 'axis'
            },
            timeline: {
              show: false,
              top: 0,
              data: []
            },
            legend : {
              top : '5%',
              left : '6%',
              itemWidth : 12,
              itemHeight : 12,
              itemGap: 70,
              icon : 'horizontal',
              textStyle : {
                color : '#ffffff',
                fontSize : 12,
              },
              data: ['已监控数占比','总数量', '告警数占比']
            },
            grid: [{
              show: false,
              left: '5%',
              top: '10%',
              bottom: '8%',
              containLabel: true,
              width: '50%'
            }, {
              show: false,
              left: '53%',
              top: '16%',
              bottom: '8%',
              width: '0%'
            }, {
              show: false,
              right: '2%',
              top: '10%',
              bottom: '8%',
              containLabel: true,
              width: '50%'
            }],
            xAxis: [{
              type: 'value',
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            }, {
              gridIndex: 1,
              show: false
            }, {
              gridIndex: 2,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            }],
            yAxis: [{
              type: 'category',
              inverse: true,
              position: 'right',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: myData
            }, {
              gridIndex: 1,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#ffffff',
                  fontSize: 14
                }

              },
              data: myData.map(function(value) {
                return {
                  value: value,
                  textStyle: {
                    align: 'center'
                  }
                }
              })
            }, {
              gridIndex: 2,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false

              },
              data: myData
            }],
            series: []

          },
          options: []
        }

        this.option.baseOption.timeline.data.push(timeLineData[0])
        this.option.options.push({
          series: [
            {
              type: 'pictorialBar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              symbol: 'rect',
              itemStyle: {
                normal: {
                  color: 'rgba(3,147,114,0.27)'
                }
              },
              barWidth: 10,
              symbolRepeat: true,
              symbolSize: 14,
              data: lineData,
              barGap: '-100%',
              barCategoryGap: 0,
              label: {
                normal: {
                  show: true,
                  formatter: (series) => {
                    return lastYearData[timeLineData[0]][series.dataIndex] + '%('+ lineData[series.dataIndex] + ')'
                  },
                  position: 'insideTopLeft',
                  textStyle:{
                    color: '#ffffff',
                    fontSize: 16,
                  },
                  offset: [0, -35],
                }
              },
              z: -100,
              animationEasing: 'elasticOut',
              animationDelay: function (dataIndex, params) {
                return params.index * 30;
              }
            }, {
              name: '已监控数占比',
              type: 'pictorialBar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              symbol: 'rect',
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: '#039372'
                }
              },
              symbolRepeat: true,
              symbolSize: 14,
              data: lastYearData[timeLineData[0]],
              animationEasing: 'elasticOut',
              animationDelay: function (dataIndex, params) {
                return params.index * 30 * 1.1;
              }
            },
            {
              type: 'pictorialBar',
              name: '总数量',
              xAxisIndex: 2,
              yAxisIndex: 2,
              symbol: 'rect',
              itemStyle: {
                normal: {
                  color: 'rgba(54,215,182,0.27)'
                }
              },
              barWidth: 10,
              symbolRepeat: true,
              symbolSize: 14,
              data: lineData,
              barGap: '-100%',
              barCategoryGap: 0,
              label: {
                normal: {
                  show: true,
                  formatter: (series) => {
                    return thisYearData[timeLineData[0]][series.dataIndex] + '%('+ lineData[series.dataIndex] + ')'
                  },
                  position: 'insideTopRight',
                  textStyle:{
                    color: '#ffffff',
                    fontSize: 16,
                  },
                  offset: [0, -35],
                }
              },
              z: -100,
              animationEasing: 'elasticOut',
              animationDelay: function (dataIndex, params) {
                return params.index * 30;
              }
            }, {
              name: '告警数占比',
              type: 'pictorialBar',
              xAxisIndex: 2,
              yAxisIndex: 2,
              symbol: 'rect',
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: '#ff0200'
                }
              },
              symbolRepeat: true,
              symbolSize: 14,
              data: thisYearData[timeLineData[0]],
              animationEasing: 'elasticOut',
              animationDelay: function (dataIndex, params) {
                return params.index * 30 * 1.1;
              }
            }
          ]
        })
      },

      initChart(val) {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption(val)
      }
    }
  }
</script>
