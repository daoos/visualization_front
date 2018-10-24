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
          return [0, 0, 0]
        }
      },
      monitorCount: {
        type: Array,
        default: function() {
          return [0, 0, 0]
        }
      },
      waringCount: {
        type: Array,
        default: function() {
          return [0, 0, 0]
        }
      }
    },
    data() {
      return {
        chart: null,
        option: []
      }
    },
    computed: {
    },
    watch: {
    },
    mounted() {
      this.option = {
        // color: ['#E87C25', '#27727B'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '7%',
          right: '6%',
          top: '14%',
          bottom: '6%',
          containLabel: true
        },
        legend: {
          show: true,
          left: '10%',
          textStyle: {
            fontSize: 14,
            color: '#eeeeee'
          },
          selectedMode: 'single',
          selected: {
            '使用量': true
          },
          itemWidth: 19,
          data: [{
            name: '使用量',
            textStyle: {
              color: '#E87C25'
            }
          }, {
            name: '剩余量',
            textStyle: {
              color: '#009eff'
            }
          }]
        },
        xAxis: {
          show: true,
          type: 'category',
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: '#eeeeee'
            }
          },
          data: ['SQLServer', 'MySQL', 'Oracle']
        },
        yAxis: {
          show: true,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#3a4b61'
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: '#fff'
            }
          }
        },
        series: [{
          name: '使用量',
          type: 'bar',
          barWidth: 32,
          itemStyle: {
            normal: {
              color: '#E87C25',
              //   new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //   offset: 0,
              //   color: '#43a6f7'
              // }, {
              //   offset: 1,
              //   color: '#02f3ff'
              // }]),
              barBorderRadius: [2.7, 2.7, 0, 0]
            }
          },
          data: [90, 113, 60]
        }, {
          name: '剩余量',
          type: 'bar',
          barWidth: 32,
          itemStyle: {
            normal: {
              color: '#009eff',
              //   new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //   offset: 0,
              //   color: '#f5cb62'
              // }, {
              //   offset: 1,
              //   color: '#fbff0f'
              // }]),
              barBorderRadius: [2, 2, 0, 0]
            }
          },
          data: [55, 77, 88]
        }]
      }
      this.initChart(this.option, true)
      const that = this
      setInterval(function() {
        that.option.legend.selected = {
          '使用量': !that.option.legend.selected.使用量
        }
        // that.chart.setOption(that.option)
        that.initChart(that.option, true)
      }, 3000)
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
      initChart(option, flag) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(option, flag)
      }
    }
  }
</script>
