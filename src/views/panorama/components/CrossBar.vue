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
      deviceCount: {
        type: Array,
        default: function() {
          return [10, 10]
        }
      }
    },
    data() {
      return {
        chart: null,
        dcount: this.deviceCount
      }
    },
    watch: {
      dcount: function() {
        this.initChart()
      }
    },
    mounted() {
      // console.log(this.deviceCount)
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
          //     // color: 'white'
          //   }
          //
          // },
          grid: {
            top: '10%',
            left: '3%',
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
              // color: 'white'
            }
          },
          yAxis: {
            type: 'category',
            data: [{
              value: '总数',
              textStyle: {
                color: 'white'
              }
            }, {
              value: '监控数',
              textStyle: {
                color: 'white'
              }
            }],
            axisLabel: {
              color: 'white'
            }
          },
          series: [
            {
              name: '数量',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'right',
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      // '#FF7F00',
                      // '#FFFF33',
                      // '#E41A1C',
                      // '#377EB8',
                      // '#4DAF4A'
                      '#E87C25',
                      '#009eff',
                      '#C1232B',
                      '#B5C334',
                      '#FCCE10'
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              },
              barWidth: 25,
              data: [{
                name: 'test',
                value: this.dcount[0],
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                      // color: 'white'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    // color:'red',
                  }
                }
              }, this.dcount[1]]
            }
          ]
        })
      }
    }
  }
</script>
