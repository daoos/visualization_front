<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  import { getDeviceAlertOverView } from '@/api/moka'

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
        data: 0
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
      data: function() {
        this.initChart()
      }
    },
    mounted() {
      this.getDeviceAlertOverView()
      setInterval(() => {
        this.getDeviceAlertOverView()
      }, 5000)
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
      getDeviceAlertOverView() {
        getDeviceAlertOverView().then(response => {
          this.data = response.data
        })
      },
      initChart() {
        var data = this.data
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          grid: [{
            show: false,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            top: '-20%'
          }],
          title: {
            text: data + '%',
            x: '50%',
            y: parseInt('100%') * 0.44 + '%',
            textAlign: 'center',
            textStyle: {
              fontWeight: 'normal',
              color: '#fff',
              fontSize: 16
            },
            borderColor: 'transparent',
            z: 100
          },
          legend: {
            bottom: '0',
            textStyle: {
              color: '#fff'
            },
            data: ['设备报警数占比']
          },
          tooltip: {
            show: false
          },
          series: [
            // 最底层圆圈
            {
              name: '遮罩1',
              type: 'pie',
              hoverAnimation: false,
              hoverOffset: 0,
              clickable: false,
              tooltip: {
                show: false
              },
              z: 1,
              radius: ['0%', '60%'],
              itemStyle: {
                normal: {
                  color: 'rgba(3,12,60,.9)',
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 100
              }]
            }, {
              name: '遮罩2',
              type: 'pie',
              hoverAnimation: false,
              hoverOffset: 0,
              //                startAngle: 85,
              stillShowZeroSum: true,
              clickable: false,
              tooltip: {
                show: false
              },
              z: 2,
              radius: ['0%', '15%'],
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderColor: '#424663',
                  borderType: 'dashed'
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 25
              }]
            }, {
              name: '遮罩4',
              type: 'pie',
              hoverAnimation: false,
              hoverOffset: 0,
              stillShowZeroSum: true,
              clickable: false,
              tooltip: {
                show: false
              },
              z: 2,
              radius: ['30%', '45%'],
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderColor: '#424663',
                  borderWidth: 2,
                  borderType: 'dashed'
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 25
              }]
            }, {
              name: '遮罩5',
              type: 'pie',
              hoverAnimation: false,
              hoverOffset: 0,
              //                startAngle: 85,
              stillShowZeroSum: true,
              clickable: false,
              tooltip: {
                show: false
              },
              z: 2,
              radius: ['45%', '60%'],
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderColor: '#424663',
                  borderWidth: 3,
                  borderType: 'dashed'
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 25
              }]
            },
            // 斜线
            {
              type: 'pie',
              hoverAnimation: false,
              z: 7,
              startAngle: 240,
              hoverOffset: 0,
              clickable: false,
              radius: '43%',
              roseType: 'area',
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,0)',
                  borderColor: '#fff',
                  borderWidth: 2
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 50
              }, {
                value: 50
              }]
            }, {
              type: 'pie',
              hoverAnimation: false,
              z: 7,
              startAngle: 240,
              hoverOffset: 0,
              clickable: false,
              radius: '15%',
              roseType: 'area',
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderColor: '#1a224d',
                  borderWidth: 4
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 50
              }, {
                value: 50
              }]
            },
            // 内圈
            {
              name: '遮罩',
              type: 'pie',
              hoverAnimation: false,
              hoverOffset: 0,
              clickable: false,
              tooltip: {
                show: false
              },
              z: 7,
              radius: ['38%', '45%'],
              itemStyle: {
                normal: {
                  color: 'rgb(255,255,255)',
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: 100
              }]
            },
            // 外圈
            {
              type: 'pie',
              radius: ['45%', '60%'],
              hoverAnimation: false,
              z: 12,
              color: ['#ff0200', 'transparent'],
              itemStyle: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
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
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                value: data,
                name: '设备报警数占比'
              }, {
                value: 100 - data
              }]
            }
          ]
        })
      }
    }
  }
</script>
