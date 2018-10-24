<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '@/utils'

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
        var xData = function () {
          var data = [];
          for (var i = 1; i < 13; i++) {
            data.push(i + "月");
          }
          return data;
        }();

        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          "grid": {
            "borderWidth": 0,
            "top": '10%',
            "bottom": '20%',
            textStyle: {
              color: "#fff"
            }
          },
          "tooltip": {
            "trigger": "axis",
            "axisPointer": {
              "type": "shadow",
              textStyle: {
                color: "#fff"
              }
            },
          },
          "calculable": true,
          "xAxis": [{
            "type": "category",
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            "splitLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "splitArea": {
              "show": false
            },
            "axisLabel": {
              "interval": 0,

            },
            "data": xData,
          }],
          "yAxis": [{
            "type": "value",
            "splitLine": {
              "show": false
            },
            "axisLine": {
              lineStyle: {
                color: '#fff'
              }
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "interval": 0,

            },
            "splitArea": {
              "show": false
            },

          }],
          "dataZoom": [{
            "show": true,
            "height": 10,
            "xAxisIndex": [
              0
            ],
            bottom: 10,
            "start": 10,
            "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: "#d3dee5",

            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#fff"


          }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
          }],
          "series": [{
            "name": "上月工单数",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 35,
            "barGap": "10%",
            "itemStyle": {
              "normal": {
                "color": "rgba(89,170,168,0.8)",
                "label": {
                  "show": true,
                  "textStyle": {
                    "color": "#fff"
                  },
                  "position": "insideTop",
                  formatter: function (p) {
                    return p.value > 0 ? (p.value) : '';
                  }
                }
              }
            },
            "data": [
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              1544,
              3285,
              5208,
              3372,
              2484,
              4078
            ],
          },

            {
              "name": "本月工单数",
              "type": "bar",
              "stack": "总量",
              "itemStyle": {
                "normal": {
                  "color": "rgba(255,2,0,0.8)",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                327,
                1776,
                507,
                1200,
                800,
                482,
                204,
                1390,
                1001,
                951,
                381,
                220
              ]
            }, {
              "name": "总数",
              "type": "line",
              "stack": "总量",
              symbolSize: 10,
              symbol: 'circle',
              "itemStyle": {
                "normal": {
                  "color": "rgba(96,187,237,1)",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                1036,
                3693,
                2962,
                3810,
                2519,
                1915,
                1748,
                4675,
                6209,
                4323,
                2865,
                4298
              ]
            },
          ]
        })
      }
    }
  }
</script>
