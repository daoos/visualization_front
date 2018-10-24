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
      appNum: {
        type: Array,
        default: function () {
          return [0,0,0]
        }
      }
    },
    data() {
      return {
        chart: null,
        breakNumber: undefined,
        appNumber: this.appNum,
        normalRate: undefined,
        vTp2: 35,
        vTp1: 15,
        vTp0: 18
      }
    },
    computed: {
    },
    watch: {
      appNumber: function () {
        this.normalRate  = parseInt(this.appNumber[0]/(this.appNumber[0]+this.appNumber[1]+this.appNumber[2])*100)
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
          backgroundColor: 'transparent',
          graphic: [
            /* 最外层圆线*/
            {
              type: 'circle',
              left: 'center',
              top: 'middle',
              shape: {
                r: 380
              },
              style: {
                // fill: '#113048'
                fill: 'transparent'
              }
            },
            /* 最底层圆*/
            {
              type: 'ring',
              left: 'center',
              top: 'middle',
              shape: {
                r: 390,
                r0: 392
              },
              style: {

              }
            }
          ],
          series: [{
            type: 'gauge',
            name: '业务指标',
            radius: '60%',
            startAngle: '0',
            endAngle: '-359.99',
            splitNumber: '100',
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
              value: 95,
              name: '完成率'
            }],
            axisLine: {
              lineStyle: {
                color: [
                  [1, new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: 'rgba(4, 234,255, 1)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(74, 87,254, 1)'
                  }, {
                    offset: 1,
                    color: 'rgba(59, 119,254, 1)'
                  }])]
                ],
                width: 20,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: 'rgba(255,255,255,1)',
                width: 2,
                type: 'solid'
              }
            },
            axisLabel: {
              show: false
            }

          },
            /* 内心原型图，展示整体数据概览*/
          {
            name: 'pie',
            type: 'pie',
            clockWise: true,
            startAngle: -270,
            radius: ['48%', '50%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
              value: this.normalRate,
              label: {
                normal: {
                  formatter: '正常状态\n'+this.normalRate+'%',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'normal'
                    // color: '#fff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#009eff',
                  shadowColor: '#009eff',
                  shadowBlur: 10
                }
              }
            }, {
              value: this.vTp0 + this.vTp1,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: 'rgba(247,67,105,0)', // 未完成的圆环的颜色
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
                }
              }
            }]
          },
            /* 外层环形图，展示详细占比*/
          {
            name: 'pie',
            type: 'pie',
            clockWise: true,
            startAngle: -270,
            radius: ['60%', '65%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
              value: this.appNumber[1],
              name: '性能劣化',
              itemStyle: {
                normal: {
                  color: '#E87C25'
                }
              }
            }, {
              value: this.appNumber[0],
              name: '正常状态',
              itemStyle: {
                normal: {
                  color: '#009eff'
                }
              }
            }, {
              value: this.appNumber[2],
              name: '故障状态',
              itemStyle: {
                normal: {
                  color: '#e12945'
                }
              }
            }],
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#3a4b61'
              }
            }
          }

          ]
        })
      }
    }
  }
</script>
