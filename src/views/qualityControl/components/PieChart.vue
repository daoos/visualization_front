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
      totalNum: {
        type: Array,
        default: function() {
          return [0, 0]
        }
      }
    },
    data() {
      return {
        chart: null,
        total: this.totalNum
      }
    },
    computed: {
    },
    watch: {
      total: function() {
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
        var exemptData = [{
          value: this.total[1],
          name: '未监控设备数'
        }, {
          value: 70,
          name: '',
          labelLine: {
            normal: {
              show: false
            }
          }
        }]
        var examNum = [{
          value: this.total[0],
          name: '已监控设备数'
        }, {
          value: 28,
          name: '',
          labelLine: {
            normal: {
              show: false
            }
          }
        }]
        var scale = 1
        /* ---------------------颜色配置----------------------------*/
        var exemptcolor = [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          // color: '#E87C25',
          colorStops: [{
            offset: 0.2,
            color: 'rgba(232,124,37,1.0)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(232,124,37,1.0)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }, 'none']

        var examNumcolor = [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0.3,
            color: 'rgba(0,158,255,1.0)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(0,158,255,1.0)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }, 'none']
        /* ---------------------富文本----------------------------*/
        var rich = {
          exemptname: {
            color: '#fff',
            fontSize: 14 * scale,
            padding: [0, 0]
          },
          examptdata: {
            color: '#E87C25',
            fontSize: 30 * scale,
            padding: [0, 0],
            fontWeight: 'bold'
          },
          exemname: {
            color: '#fff',
            fontSize: 14 * scale,
            padding: [0, 0]
          },
          examdata: {
            color: '#009eff',
            fontSize: 30 * scale,
            padding: [0, 0],
            fontWeight: 'bold'
          },
          rectblue: {
            width: 14,
            height: 14,
            borderRadius: 3,
            backgroundColor: '#009eff'
          },
          rectred: {
            width: 14,
            height: 14,
            borderRadius: 3,
            backgroundColor: '#E87C25'
          },
          space: {
            padding: [0, 10, 0, 0]
          }
        }
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          legend: {
            itemGap: 12,
            right: 10,
            bottom: 10,
            icon: 'none',
            align: 'left',
            orient: 'vertical',
            textStyle: {
              color: '#fff',
              fontSize: 14 * scale,
              rich: rich
            },
            data: ['已监控设备数', '未监控设备数'],
            formatter: function(name) {
              if (name === '已监控设备数') {
                return '{rectblue|}' + '{space|}' + name
              } else {
                return '{rectred|}' + '{space|}' + name
              }
            }
          },
          series: [
            // 内圈圆环
            {
              name: '内边框',
              type: 'pie',
              startAngle: 260,
              clockWise: false, // 顺时加载
              hoverAnimation: false, // 鼠标移入变大
              center: ['50%', '55%'],
              radius: ['40%', '40%'],
              label: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 10,
                name: '',
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: '#3a4b61'
                  }
                }
              }, {
                value: 2,
                name: '',
                itemStyle: {
                  normal: {
                    borderWidth: 0,
                    borderColor: 'none'
                  }
                }
              }]
            },
            // 未监控设备数圆环
            {
              name: '未监控设备数',
              type: 'pie',
              clockWise: false, // 顺时加载
              hoverAnimation: false, // 鼠标移入变大
              startAngle: 270,
              center: ['50%', '55%'],
              radius: ['60%', '50%'],
              color: exemptcolor,
              label: {
                normal: {
                  formatter: function(params) {
                    if (params.dataIndex === 0) {
                      return '{examptdata|' + params.value + '}\n{exemptname|' + params.name + '}'
                    }
                  },
                  rich: rich
                }
              },
              labelLine: {
                normal: {
                  length: 90,
                  length2: 20,
                  lineStyle: {
                    color: '#E87C25'
                  }
                }
              },
              data: exemptData
            },
            // 正常考试人数圆环
            {
              name: '已监控设备数',
              type: 'pie',
              clockWise: false, // 顺时加载
              hoverAnimation: false, // 鼠标移入变大
              center: ['50%', '55%'],
              radius: ['75%', '65%'],
              color: examNumcolor,
              label: {
                normal: {
                  formatter: function(params) {
                    if (params.dataIndex === 0) {
                      return '{examdata|' + params.value + '}\n{exemname|' + params.name + '}'
                    }
                  },
                  rich: rich
                }
              },
              labelLine: {
                normal: {
                  length: 70,
                  length2: 20,
                  lineStyle: {
                    color: '#009eff'
                  }
                }
              },
              data: examNum
            },
            // 内圈圆环
            {
              name: '外边框',
              type: 'pie',
              // startAngle: 260,
              clockWise: false, // 顺时加载
              hoverAnimation: false, // 鼠标移入变大
              center: ['50%', '55%'],
              radius: ['85%', '85%'],
              label: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 9,
                name: '',
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: '#3a4b61'
                  }
                }
              }, {
                value: 2,
                name: '',
                itemStyle: {
                  normal: {
                    borderWidth: 0,
                    borderColor: 'none'
                  }
                }
              }]
            }
          ]
        })
      }
    }
  }
</script>
