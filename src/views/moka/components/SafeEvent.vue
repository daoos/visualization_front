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
        option: undefined,
        dataBJ : [
          [134, 96, 165],
        ]
      }
    },
    computed: {
    },
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
      this.initOption();
      var self = this;
      setTimeout(self.animate, 500);
      // console.log(this)
      // this.getData()
      // this.initChart()
      // const that = this
      // setInterval(function() {
      //   // console.log(this)
      //   that.getData()
      //   that.initChart()
      // }, 2000)
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
      initOption() {

        var arr = [];
        var r = 100;
        for (var i = 0; i < 1000; i++) {
          var rad = 2 * Math.PI / 1000 * i;
          var x = Math.cos(rad) * r + 500;
          var y = Math.sin(rad) * r + 500;
          arr.push([x, y]);
        }
        var arr2 = [];
        for (var i = 500; i < 1000; i++) {
          var rad = 2 * Math.PI / 1000 * i;
          var x = Math.cos(rad) * r + 500;
          var y = Math.sin(rad) * r + 500;
          arr2.push([x, y]);
        }
        for (var i = 0; i < 500; i++) {
          var rad = 2 * Math.PI / 1000 * i;
          var x = Math.cos(rad) * r + 500;
          var y = Math.sin(rad) * r + 500;
          arr2.push([x, y]);
        }
        var indicatorData = [{
          name: '安全攻击\n' + 134 ,
          // max: 300
        }, {
          name: '安全漏洞\n' + 96,
          // max: 300
        }, {
          name: '违规事件\n'+ 165,
          // max: 300
        }];
        var rotate = 45;
        var width = 4;
        this.option = {
          radar: {
            center: ['50%', '50%'],
            indicator: indicatorData,
            radius: '65%',
            splitNumber: 1,
            shape: 'circle',
            name: {
              // formatter: function(indicator) {
              //   var name = indicator.name;
              //   var num = indicator.num;
              //   return indicator;
              // },
              textStyle: {
                color: '#fff',
                fontSize: 12,
                fontFamily: "Microsoft YaHei"
              },
              // padding: [8, 8, 8, 8]
            },
            splitLine: {
              lineStyle: {
                color: '#4f8bbe',
                opacity: 0.5,
                type: 'dotted'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: '#0d6dba',
                opacity: 0
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#4f8bbe',
                opacity: 0.5,
                type: 'dotted'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              formatter: function(value, index) {
                return value;
              }
            },
            zlevel: 101
          },
          series: [
            {
              name: '左下红弧',
              type: 'gauge',
              radius: '99%',
              startAngle: -160,
              endAngle: -170,
              zlevel: 22,
              axisLine: {
                lineStyle: {
                  color: [
                    [0.2, '#d70029'],
                    [1, '#d70029']
                  ],
                  width: 4,
                  shadowColor: '#d70029',
                  shadowOffsetX: 0,
                  shadowOffsetY: -12,
                  shadowBlur: 120,
                  opacity: 1,
                }

              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            },
            {
              name: '右上红弧',
              type: 'gauge',
              radius: '99%',
              startAngle: -340,
              endAngle: -350,
              zlevel: 22,
              axisLine: {
                lineStyle: {
                  color: [
                    [0.2, '#d70029'],
                    [1, '#d70029']
                  ],
                  width: 4,
                  shadowColor: '#d70029',
                  shadowOffsetX: 0,
                  shadowOffsetY: -12,
                  shadowBlur: 120,
                  opacity: 1,
                }
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            },
            {
              name: '右外圈',
              type: 'gauge',
              radius: '99%',
              startAngle: -320,
              endAngle: -400,
              axisLine: {
                lineStyle: {
                  color: [
                    [0.2, '#0e313f'],
                    [0.8, '#0e313f'],
                    [1, '#0e313f']
                  ],
                  width: 4,
                  // shadowColor: '#d70029',
                  shadowOffsetX: 0,
                  shadowOffsetY: -12,
                  shadowBlur: 120,
                  opacity: 1,
                }
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            },
            {
              name: '左外圈',
              type: 'gauge',
              radius: '99%',
              startAngle: -140,
              endAngle: -220,
              axisLine: {
                lineStyle: {
                  color: [
                    [0.2, '#0e313f'],
                    [0.8, '#0e313f'],
                    [1, '#0e313f']
                  ],
                  width: 4,
                  // shadowColor: '#d70029',
                  shadowOffsetX: 0,
                  shadowOffsetY: -12,
                  shadowBlur: 120,
                  opacity: 1,
                }
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            },
            {
              name: '蓝色外圈1',
              type: 'gauge',
              radius: '99%',
              startAngle: -85 + rotate,
              endAngle: -115 + rotate,
              splitNumber: 4,
              axisLine: {
                lineStyle: {
                  color: [
                    [1, '#1e5a67']
                  ],
                  width: width,


                  opacity: 1,
                }

              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            }, {
              name: '蓝色外圈2',
              type: 'gauge',
              radius: '99%',
              startAngle: -155 + rotate,
              endAngle: 175 + rotate,
              splitNumber: 4,
              axisLine: {
                lineStyle: {
                  color: [
                    [1, '#1e5a67']
                  ],
                  width: width,
                  opacity: 1,
                }
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            }, {
              name: '蓝色外圈3',
              type: 'gauge',
              radius: '99%',
              startAngle: 25 + rotate,
              endAngle: -5 + rotate,
              splitNumber: 4,
              axisLine: {
                lineStyle: {
                  color: [
                    [1, '#1e5a67']
                  ],
                  width: width,
                  opacity: 1,
                }

              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            }, {
              name: '蓝色外圈4',
              type: 'gauge',
              radius: '99%',
              startAngle: 95 + rotate,
              endAngle: 65 + rotate,
              splitNumber: 4,
              axisLine: {

                lineStyle: {
                  color: [
                    [1, '#1e5a67']
                  ],
                  width: width,
                  opacity: 1,
                }
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              detail: {
                show: false
              }
            },
            {
              type: 'pie',
              radius: ['72%', '92%'],
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: 1000,
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#4dfaff',
                    opacity: 0.2
                  }
                }
              }]
            },
            {
              name: '雷达线ALL',
              type: 'radar',
              silent: true,
              lineStyle: {
                normal: {
                  type: 'dotted',
                  color: "#355862",
                  width: 2,
                  opacity: 1,

                }
              },
              data: [
                [300, 300, 300, 300, 300]
              ],
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  opacity: 0
                }
              },
              areaStyle: {
                normal: {
                  color: '#0d6dba',
                  opacity: 0
                }
              }
            },
          /*  {
              name: '雷达线2',
              type: 'radar',
              silent: true,
              lineStyle: {
                normal: {
                  type: 'dotted',
                  color: "#355862",
                  width: 2,
                  opacity: 0.8,

                }
              },
              data: [
                // [250, 250, 250, 250, 250]
                {
                  name: 'B',
                  value:  [250, 250, 250, 250, 250],
                  symbol:'circle',
                  symbolSize:1,
                  label: {
                    normal: {
                      show: true
                    }
                  },
                  itemStyle:{
                    normal:{
                      opacity:0.85
                    }
                  }
                }
              ],

              itemStyle: {
                normal: {
                  opacity: 0

                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  opacity: 0
                }
              }
            },
            {
              name: '雷达线3',
              type: 'radar',
              silent: true,
              lineStyle: {
                normal: {
                  type: 'dotted',
                  color: "#355862",
                  width: 2,
                  opacity: 0.6,
                }
              },
              data: [
                // [200, 200, 200, 200, 200]
                {
                  name: 'A',
                  value: [200, 200, 200, 200, 200],
                  symbol:'circle',
                  symbolSize:1,
                  label: {
                    normal: {
                      show: true
                    }
                  },
                  itemStyle:{
                    normal:{
                      opacity:0.85
                    }
                  }
                }
              ],
              itemStyle: {
                normal: {
                  opacity: 0
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  opacity: 0
                }
              }
            },
            {
              name: '雷达线4',
              type: 'radar',
              silent: true,
              lineStyle: {
                normal: {
                  type: 'dotted',
                  color: "#355862",
                  width: 2,
                  opacity: 0.4,
                }
              },
              data: [
                {
                  name: 'B',
                  value:  [150, 150, 150, 150, 150],
                  symbol:'circle',
                  symbolSize:1,
                  label: {
                    normal: {
                      show: true
                    }
                  },
                  itemStyle:{
                    normal:{
                      opacity:1
                    }
                  }
                }
              ],
              itemStyle: {
                normal: {
                  opacity: 0

                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  opacity: 0
                }
              }
            },
            {
              name: '雷达线5',
              type: 'radar',
              silent: true,
              lineStyle: {
                normal: {
                  type: 'dotted',
                  color: "#355862",
                  width: 2,
                  opacity: 0.2,
                },
              },
              data: [
                {
                  name: 'B',
                  value:  [100, 100, 100, 100, 100],
                  symbol:'circle',
                  symbolSize:1,
                  label: {
                    normal: {
                      show: true
                    }
                  },
                  itemStyle:{
                    normal:{
                      opacity:1
                    }
                  }
                }
              ],
              itemStyle: {
                normal: {
                  opacity: 0

                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  opacity: 0
                }
              }
            },*/
            {
              name: '数据显示',
              type: 'radar',
              lineStyle: {
                normal: {
                  width: 0.1,
                  opacity: 0.1
                }
              },
              data: this.dataBJ,
              symbolSize: 0,
              itemStyle: {
                normal: {
                  borderColor: '#32565f',
                  borderWidth: 4,
                }
              },
              areaStyle: {
                normal: {
                  color: '#ca4a49',
                  opacity: 0.85
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              zlevel: 1000
            },
            {
              name: "仪盘表",
              type: "gauge",
              // min: 0,
              // max: 360,
              startAngle: 0,
              endAngle: 15,
              splitNumber: 5,
              radius: '92%',
              // radius: ['72%', '92%'],
              zlevel: 22,
              axisLine: {
                lineStyle: {
                  color: [
                    [0.1, "#d70029"],
                    [1, "#0d2534"]
                  ],
                  // width: 90,
                  opacity: 0
                },
              },
              axisTick: {
                lineStyle: {
                  // color: '#4dfdfe',
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                    color: '#4dfdfe',
                    offset: 0.9,
                  }, {
                    color: '#143a49',
                    offset: 0.2
                  }]),
                  width: 2,
                  opacity: [
                    [0.1, 1],
                    [0.5, 0.5],
                    [1, 0.1]
                  ]
                },

                length: '22%',
                splitNumber: 2
              },
              pointer: {
                shadowColor: '#fff',
                shadowBlur: 5,
                show: false
              },
              axisLabel: {
                distance: 10,
                textStyle: {
                  color: "#fff"
                },
                show: false,
              },
              splitLine: {
                "show": false
              },
              itemStyle: {
                normal: {
                  color: "#494f50"
                }
              },
              detail: {

                show: false
              }
            },
            {
              name: "仪盘表",
              type: "gauge",
              // min: 0,
              // max: 360,
              startAngle: 180,
              endAngle: 195,
              splitNumber: 5,
              radius: '92%',
              // radius: ['72%', '92%'],
              zlevel: 22,
              axisLine: {
                lineStyle: {
                  color: [
                    [0.1, "#d70029"],
                    [1, "#0d2534"]
                  ],
                  // width: 90,
                  opacity: 0
                },
              },
              axisTick: {
                lineStyle: {
                  // color: '#4dfdfe',
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                    color: '#4dfdfe',
                    offset: 0.9,
                  }, {
                    color: '#143a49',
                    offset: 0.2
                  }]),
                  width: 2,
                  opacity: [
                    [0.1, 1],
                    [0.5, 0.5],
                    [1, 0.1]
                  ]
                },

                length: '22%',
                splitNumber: 2
              },
              pointer: {
                shadowColor: '#fff',
                shadowBlur: 5,
                show: false
              },
              axisLabel: {
                distance: 10,
                textStyle: {
                  color: "#fff"
                },
                show: false,
              },
              splitLine: {
                "show": false
              },
              itemStyle: {
                normal: {
                  color: "#494f50"
                }
              },
              detail: {
                show: false
              }
            }

          ]
        };
        this.initChart(this.option)
      },
      animate () {
        var series1 = this.option.series[this.option.series.length - 2];
        // series1.startAngle += 1;
        series1.startAngle = Date.now() * 0.01;
        series1.endAngle = series1.startAngle + 15;

        var series2 = this.option.series[this.option.series.length - 1];
        // series2.startAngle += 1;
        series2.startAngle = Date.now() * 0.01 + 180;
        series2.endAngle = series2.startAngle + 15;
        this.initChart(this.option)
        requestAnimationFrame(this.animate)
      },
      initChart(val) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(val)
      }
    }
  }
</script>
