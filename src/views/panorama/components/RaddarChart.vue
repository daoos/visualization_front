<!--suppress ALL -->
<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000

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

  },
  data() {
    return {
      chart: null,
      mockData: [{
        text: '指标一',
        value: 2
      }, {
        text: '指标二',
        value: 3.2
      }, {
        text: '指标三',
        value: 5
      }, {
        text: '指标四',
        value: 4.1
      }, {
        text: '指标五',
        value: 2.8
      }],
      indicator: [],
      testData: [],
      radarStyle: {}
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
    initChart() {
      var minAngle = 10;	// 最小角度
      // var indicator = [];
      // var data = [];
      var idx = 0
      var randomArr = []
      for(var k = 0;k < this.mockData.length;k++){
        var r = Math.round(Math.random() * (360 / minAngle - 1))
        randomArr.push(r)
      }
      for (var i = 0; i < 360 / minAngle; i++) {
        if (randomArr.indexOf(i) > -1) {
          this.indicator.push({
            text: this.mockData[idx].text
          });
          this.testData.push(this.mockData[idx].value);
          idx++;
        } else {
          this.indicator.push({
            text: i * 10 + '`'
          });
          this.testData.push('-');
        }
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        radar: [
          {
            indicator: this.indicator,
            center: ['50%', '50%'],
            radius: 180,
            startAngle: 90,
            splitNumber: 6,
            shape: 'circle',
            name: {
              show: false,
              // formatter:'【{value}】',
              // textStyle: {
              //     color:'rgba(0, 255, 51, 1)'
              // }
            },
            splitArea: {
              areaStyle: {
                color: 'rgba(255, 255, 255, 0)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0, 255, 51, 0)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(0, 255, 51, 1)'
              }
            }
          }
        ],
        series: [
          {
            name: '雷达图',
            type: 'radar',
            symbol: 'circle',
            symbolSize: 24,
            silent: true,
            animationEasing: 'quarticOut',
            animationEasingUpdate: 'quarticOut',
            animationDuration: 2000,
            animationDurationUpdate: 2000,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: 'rgba(0, 255, 51, 1)'
                }
              }
            },
            itemStyle: {
              normal: {
                opacity: 0
              },
              emphasis: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.3,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(0, 255, 51, 1)'
                  }, {
                    offset: 1,
                    color: 'rgba(255, 255, 255, .1)'
                  }]
                },
                borderWidth: 0,
                opacity: 1
              }
            },
            data: [
              {
                value: this.testData,
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(0, 255, 51, 1)'
                    }
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

