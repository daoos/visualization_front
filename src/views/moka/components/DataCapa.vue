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
        chart: null,
        dataList: []
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
            trigger: 'item',
            formatter: '{c}',
            position: ['50%', '50%'],
            backgroundColor: 'transparent',
            textStyle: {
              color: '#ff0200',
              fontSize: 30,
              fontWeight: 'bold',
              width: 200,
              height: 100,
              lineHeight: 100,
              textAlign: 'center',
              rich: {}
            }
          },
          calculable: true,
          polar: {
            center: ['50%', '50%'],
            radius: '80%'
          },
          radiusAxis: {
            // 极坐标半径刻度
            min: 0,
            max: 100,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#01eced'
              }
            }
          },
          angleAxis: {
            type: 'category',
            clockwise: false,
            splitLine: {
              show: true,
              interval: 'auto',
              lineStyle: {
                width: 1,
                type: 'dashed',
                color: '#01eced'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#01eced'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: ['', 2, 3, 4, 5, 6, 7, 8]

          },
          series: [{
            name: '超期收益金额',
            type: 'pie',
            clockwise: false,
            radius: ['15.6%', '80%'],
            center: ['50%', '50%'],
            roseType: 'area',
            hoverOffset: 0,
            label: {
              show: true,
              rotate: 90,
              fontSize: 18,
              color: '#9beeed',
              offset: 18,
              textPosition: [10, 10]
            },
            labelLine: {
              show: false,
              length: 0,
              length2: 0
            },
            itemStyle: {
              color: '#05bbc9',
              borderWidth: 4,
              borderColor: 'rgba(0,0,0,.8)',
              emphasis: {
                color: '#ff0200'
              }
            },
            // 全景视图-安全-数据容量
            data: [{
              value: 7,
              name: '新视云主控机'
            }, {
              value: 5,
              name: '华夏数字法庭'
            }, {
              value: 15,
              name: '办公自动化服务器'
            }, {
              value: 25,
              name: '讯飞语音识别1'
            }, {
              value: 20,
              name: '华夏裁判文书'
            }, {
              value: 35,
              name: '老审判系统（瑞星）'
            }, {
              value: 5,
              name: '华夏文书裁判1'
            }, {
              value: 50,
              name: '日志审计服务器'
            }]
          }]
        })
      }
    }
  }
</script>
