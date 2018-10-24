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
          legend: {
            top: 20,
            textStyle: {
              color: '#fff'
            },
            data: ['应用设备总数', '已监控设备数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },

          tooltip: {
            show: 'true',
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            padding: [8, 10], // 内边距
            extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', // 添加阴影
            formatter: function(params) {
              return params.name + '<br>' + params.seriesName + ' ：' + params.value + '个'
            }
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: true
            },
            // axisLine: {
            //   show: false,
            //   lineStyle: {
            //     color: '#363e83'
            //   }
            // },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#3a4b61 '
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12'
              }
            }
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            // axisLine: {
            //   show: true,
            //   lineStyle: {
            //     color: '#363e83'
            //   }
            // },
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12'
              }
              // formatter:function(val){
              //     return val.split("").join("\n")
              // },
            },
            data: ['核心应用', '重要应用', '一般应用']
          }
          ],
          series: [
            {
              name: '应用设备总数',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color:  '#009eff',
                  //   new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  //   offset: 0,
                  //   color: '#f7734e'
                  // }, {
                  //   offset: 1,
                  //   color: '#e12945'
                  // }]),
                  // barBorderRadius: 50,
                  borderWidth: 0
                }
              },
              zlevel: 2,
              barWidth: '10%',
              data: [80, 150, 100]
            }, {
              name: '已监控设备数',
              type: 'bar',
              barWidth: '10%',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#E87C25',
                  //   new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  //   offset: 0,
                  //   color: '#1a98f8'
                  // }, {
                  //   offset: 1,
                  //   color: '#7049f0'
                  // }]),
                  // barBorderRadius: 50,
                  borderWidth: 0
                }
              },
              zlevel: 2,
              barGap: '100%',
              data: [58, 87, 66]
            }]
        })
      }
    }
  }
</script>
