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
        this.chart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '0%',
            right: '10%',
            top: '20%',
            bottom: '2%',
            containLabel: true
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            "axisTick": {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
          },
          yAxis:{ show:false},
            /*[
              {
                type: 'value',
                axisLine: {
                  show:false,
                  lineStyle: {
                    color: '#fff'
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: '#fff'
                  }
                },
                name: '访问量/人',
                position: 'left',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                axisLine: {
                  show:false,
                  lineStyle: {
                    color: '#fff'
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: '#fff'
                  }
                },
                name: '响应时长/ms',
                // min: 0,
                // max: 10000,
                position: 'right',
                axisLabel: {
                  formatter: '{value}'
                }
              },
            ],*/

          series: [
            {
              name:'访问量(人)',
              type:'line',
              itemStyle :{
                normal :{
                  color:'#01bc8f',
                },
              },
              data:[92, 96, 99, 91, 96, 103, 500,92, 96, 99,110,120],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值',
                    itemStyle :{
                      normal :{
                        color:'#d90051',
                      },
                    },
                  },
                  {type: 'min', name: '最小值',
                    itemStyle :{
                      normal :{
                        color:'#32aca9',
                      },
                    },
                  }
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'响应时长(ms)',
              type:'line',
              itemStyle :{
                normal :{
                  color:'#02b5d5',
                },
              },
              data:[310, 400, 960, 510, 800, 900, 400,810, 900, 960, 800, 860],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值',
                    itemStyle :{
                      normal :{
                        color:'#d90051',
                      },
                    },
                  },
                  {type: 'min', name: '最小值',
                    itemStyle :{
                      normal :{
                        color:'#32aca9',
                      },
                    },
                  }
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        })
      }
    }
  }
</script>
