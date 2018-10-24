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
        breakNumber: undefined
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
        var placeHolderStyle = {
          normal: {
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            color: '#fff',
            borderColor: '#fff',
            borderWidth: 0
          },
          emphasis: {
            color: '#fff',
            borderColor: '#fff',
            borderWidth: 0
          }
        }
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          // backgroundColor: '#fff',
          color: [
            '#fc7a26',
            '#fff',
            '#ffa127',
            '#fff',
            '#ffcd26',
            '#fff',
          ],
          legend: [{
            orient: '',
            icon: 'circle',
            left: 'right',
            top: 'top',
            data: ['安全攻击', '违规事件', '安全漏洞'],
            textStyle: {
              color: '#fff'
            }
          }],
          series: [{
            name: '值',
            type: 'pie',
            clockWise: true, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            radius: [199, 200],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'outside'
                },
                labelLine: {
                  show: true,
                  length: 100,
                  smooth: 0.5
                },
                borderWidth: 5,
                shadowBlur: 40,
                borderColor: '#fc7a26',
                shadowColor: 'rgba(0, 0, 0, 0)' // 边框阴影
              }
            },
            data: [{
              value: 7,
              name: '70%'
            }, {
              value: 3,
              name: '外环',
              itemStyle: placeHolderStyle
            }]
          }, {
            // name: '白',
            type: 'pie',
            clockWise: false,
            radius: [180, 180],
            hoverAnimation: true,
            data: [{
              value: 1
            }]
          }, {
            name: '值',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [159, 160],
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                labelLine: {
                  show: true,
                  length: 100,
                  smooth: 0.5
                },
                borderWidth: 5,
                shadowBlur: 40,
                borderColor: '#ffa127',
                shadowColor: 'rgba(0, 0, 0, 0)' // 边框阴影
              }
            },
            data: [{
              value: 6,
              name: '60%'
            }, {
              value: 4,
              name: '',
              itemStyle: placeHolderStyle
            }]
          }, {
            name: '白',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            radius: [140, 140],
            data: [{
              value: 1
            }]
          }, {
            name: '值',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [119, 120],
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                labelLine: {
                  show: true,
                  length: 100,
                  smooth: 0.5
                },
                borderWidth: 5,
                shadowBlur: 40,
                borderColor: '#ffcd26',
                shadowColor: 'rgba(0, 0, 0, 0)' // 边框阴影
              }
            },
            data: [{
              value: 4,
              name: '40%'
            }, {
              value: 6,
              name: '',
              itemStyle: placeHolderStyle
            }]
          }, {
            type: 'pie',
            color: ['#fc7a26', '#ffa127', '#ffcd26'],
            data: [{
              value: '',
              name: '安全攻击'
            }, {
              value: '',
              name: '违规事件'
            }, {
              value: '',
              name: '安全漏洞'
            }]
          }, {
            name: '白',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [100, 100],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 100,
              label: {
                normal: {
                  formatter: '安全事件',
                  textStyle: {
                    color: '#fff',
                    fontSize: 26
                  }
                }
              }
            }, {
              tooltip: {
                show: false
              },
              label: {
                normal: {
                  formatter: '\n1800',
                  textStyle: {
                    color: '#fff',
                    fontSize: 26
                  }
                }
              }
            }]
          }]
        })
      }
    }
  }
</script>
