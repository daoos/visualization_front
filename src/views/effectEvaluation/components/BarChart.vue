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
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            axisPointer: {
              type: 'none'
            }
          },
          legend: {
            show: true,
            shadowColor: '#fff',
            shadowBlur: 5,
            shadowOffsetX: 5,
            data: ['当前用户数（人）', '总访问量（人）'],
            top: '5%',
            //			left: "8%",
            // bottom: '2%',
            textStyle: {
              color: '#fff',
              fontSize: 14
              //				padding: [3, 5, 5, 2]
            },
            //			itemWidth: 64,
            itemHeight: 15
          },
          grid: {
            top: '30%',
            left: '7%',
            right: '8%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              show: false
            },
            splitLine: {
              // show: false
              lineStyle: {
                color: '#3a4b61'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: [''],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '当前用户数（人）',
              type: 'bar',
              data: [50],
              itemStyle: {
                // normal: barColor[1],
                normal: {
                  color: '#E87C25'
                }
                // emphasis: emColor[1]
              },
              barGap: '40%',
              barWidth: '16%'
            },
            {
              name: '总访问量（人）',
              type: 'bar',
              data: [90],
              itemStyle: {
                normal: {
                  color: '#009eff'
                }
                // emphasis: emColor[2]
              },
              barGap: '40%',
              barWidth: '16%'
            }
          ]
        })
      }
    }
  }
</script>
