<!--suppress ALL -->
<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  const animationDuration = 6000

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
      storageCount: {
        type: Array,
        default: function() {
          return [100, 100, 100]
        }
      }
    },
    data() {
      return {
        chart: null,
        storageData: this.storageCount
        // yAxisMonth: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        // barData: [913, 894, 884, 833, 785, 768, 711, 653, 623, 450, 411, 321],
        // barDataTwo: [],
        // coordData2: [],
        // coordData: []
      }
    },
    watch: {
      storageData: function() {
        this.initChart()
      }
    },
    created() {
      // for (let i = 0; i < this.barData.length; i++) {
      //   this.barDataTwo.push(Math.max.apply(Math, this.barData) + 5000);
      //   this.coordData.push({
      //     "coord": [Number(this.barData[i]) - 1, i]
      //   });
      //   this.coordData2.push({
      //     "coord": [Math.max.apply(Math, this.barData) + 5000, i]
      //   })
      // }
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
        var deemph_color = 'rgb(165,165,165)'
        var bar_category_gap = '30%'
        var deemph_colors = [
          '#E87C25',
          '#009eff',
          '#C1232B',
          '#B5C334',
          '#FCCE10'
        ]
        var axis_line_color = 'rgb(135,135,135)'
        var category = ['上月存储量', '本月存储量', '总存储量']

        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: [{
            left: '20%',
            right: '5%',
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
          }, {
            left: '55%',
            right: '5%',
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
          }
          ],
          // yAxis: {
          //   type: 'category',
          //   data: [{
          //     value: '上月存储量',
          //     textStyle: {
          //       color: 'white'
          //     }
          //   }, {
          //     value: '本月存储量',
          //     textStyle: {
          //       color: 'white'
          //     }
          //   }, {
          //     value: '存储总量',
          //     textStyle: {
          //       color:'white'
          //     }
          //   }],
          //   axisLabel: {
          //     color: 'white'
          //   }
          // },
          yAxis: [{
            gridIndex: 0,
            type: 'category',
            boundaryGap: true,
            data: category,
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: 'white',
            },
          }, {
            gridIndex: 1,
            type: 'category',
            boundaryGap: true,
            data: category,
            position: 'top',
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            type: 'category',
            data: category,
            inverse: true,
            axisLabel: {
              show: false,
              color: 'white',
            }
          }],
          xAxis: [{
            gridIndex: 0,
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: axis_line_color,
                width: 1.5,
              }
            },
            axisLabel: {
              show: false,
              textStyle: {
                fontSize: 10,
              },
            },
          }, {
            gridIndex: 1,
            type: 'value',
            splitLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: axis_line_color,
                width: 1.5,
              }
            },
            axisLabel: {
              show: false,
            },
          }, ],
          series: [{
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            z: 10,
            barCategoryGap: bar_category_gap,
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{c}',
                  position: 'inner'
                },
                color: function(params) {
                  var colorlist = [deemph_colors[0], deemph_colors[1], deemph_colors[2]];
                  return colorlist[params.dataIndex];
                }
              }
            },
            data: [this.storageData[0], this.storageData[1], this.storageData[2]],
          }, {
              type: "bar",
              xAxisIndex: 0,
              yAxisIndex: 0,
              silent: false,
              itemStyle: {
                normal: {
                  show: false,
                  color: '#ddd',
                  borderColor: '#000'
                }
              },
              tooltip: {
                show: false
              },
              barGap: '-100%',
              data: [100, 100, 100]
            },
          ]
        })
      }
    }
  }
</script>
