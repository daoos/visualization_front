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
      monitorNum: {
        type: Array,
        default: function() {
          return [0, 0]
        }
      }
    },
    data() {
      return {
        chart: null,
        percent: 400
      }
    },
    computed: {},
    watch: {
      monitorNum: function() {
        this.initChart()
      }
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
      deepCopy(obj) {
        if (typeof obj !== 'object') {
          return obj
        }
        var newobj = {}
        for (var attr in obj) {
          newobj[attr] = obj[attr]
        }
        return newobj
      },
      initChart() {
        var xData = []
        var yData = []
        var monitored = 0
        var unMonitored = 0
        if (this.monitorNum.length) {
          monitored = this.monitorNum[0]
          unMonitored = this.monitorNum[1]
        }
        var data = [{
          'name': '未纳入监控数',
          'value': unMonitored
        }, {
          'name': '已纳入监控数',
          'value': monitored
        }]
        data.map((a, b) => {
          xData.push(a.name)
          yData.push(a.value)
        })
        // var startColor = ['rgba(143,76,255,.06)', 'rgba(143,76,255,.06)']
        // var endColor = ['rgba(143,76,255,.06)', 'rgba(143,76,255,.06)']
        // var borderStartColor = ['#32bef2', '#ff0200']
        var borderStartColor = ['#ff0200', '#32bef2']
        var borderEndColor = ['#ff0200', '#32bef2']
        var bordersStartColor = ['rgba(64,97,208,.3)', 'rgba(164,29,110,.3)']
        var bordersEndColor = ['rgba(64,97,208,.3)', 'rgba(164,29,110,.3)']
        var RealData = []
        var borderData = []
        var bordersData = []
        data.map((item, index) => {
          var newobj = this.deepCopy(item)
          var newobj1 = this.deepCopy(item)
          var newobj2 = this.deepCopy(item)
          RealData.push(newobj)
          borderData.push(newobj1)
          bordersData.push(newobj2)
        })
        RealData.map((item, index) => {
          item.itemStyle = {
            normal: {
              color: ['rgba(143,76,255,.06)', 'rgba(143,76,255,.06)']
            }
          }
        })
        borderData.map((item, index) => {
          item.itemStyle = {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: borderStartColor[index] // 0% 处的颜色
                }, {
                  offset: 1,
                  color: borderEndColor[index] // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        })
        bordersData.map((item, index) => {
          item.itemStyle = {
            normal: {
              color: {
                type: 'Mirroring',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: bordersStartColor[index] // 0% 处的颜色
                }, {
                  offset: 1,
                  color: bordersEndColor[index] // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        })

        this.chart = echarts.init(this.$el, 'macarons')

        // var data = [{
        //   "name": "未处理",
        //   "value": 90
        // }, {
        //   "name": "已处理",
        //   "value": 10
        // }]
        this.chart.setOption({
          // legend: {
          //   bottom: "0",
          //   // left: 10,
          //   textStyle: {
          //     color: '#fff',
          //     fontSize: 12,
          //     fontFamily: '微软雅黑'
          //   },
          //   itemWidth: 15,  //图例标记的图形宽度
          //   itemHeight: 3, //图例标记的图形高度
          //   data: data,
          // },
          series: [
            // 主要展示层的
            {
              radius: ['37%', '45%'],
              center: ['50%', '40%'],
              type: 'pie',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  },
                  formatter: '{b} : {c}'
                  //  /{d}%
                },
                emphasis: {
                  show: true
                }

              },
              labelLine: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              animation: false,
              data: borderData
            },
            {
              radius: ['45%', '65%'],
              center: ['50%', '40%'],
              type: 'pie',
              // selectedMode: 'single',
              // selectedOffset: 10,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              },
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              name: '问题总数',
              data: RealData
              // tooltip: {
              //     formatter: "{a}：<br/>{b}: {c}人"
              // }
            },
            // 边框的设置

            // 中心的圆圈
            {
              radius: ['20%', '38%'],
              center: ['50%', '40%'],
              type: 'pie',
              selectedMode: 'single',
              selectedOffset: 10,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              },
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              tooltip: {
                show: false
              },
              data: bordersData,
              animation: false
            }
          ]
        })
      }
    }
  }
</script>
