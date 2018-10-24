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
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          color: ['#ffd285', '#ff733f', '#ec4863'],
          tooltip: {
            /*trigger: 'item',
            formatter: "{a} <br/>{b} : {c}",
            formatter: function(params) {
                return params.seriesType
                return params.name+':'+params.value
            }*/
          },
          legend: {
            x: '2%',
            bottom: '2%',
            textStyle: {
              color: '#ffd285',
            },
            //data: ['郑州', '永城', '新乡']
            data: [{
              name: '设备总量',
              icon: 'circle',
              textStyle: {color: '#fff'},
            },{
                name: '故障数量',
                icon: 'circle',
                textStyle: {color: '#fff'},
              },{
              name: '已监控数量',
              icon: 'circle',
              textStyle: {color: '#fff'},
            }],
            // backgroundColor:'#fff'
          },
          grid: {
            //show:true,
            left: '0%',
            right: '45%',
            top: '3%',
            bottom: '12%',
            containLabel: true
          },
          toolbox: {
            "show": false,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            //show:false,
            type: 'category',
            axisLine: {
              //show:false,
              onZero: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              "show": true,
              // length: 15,
            },
            axisLabel: {
              //show:false,
              //rotate:45,
              textStyle: {
                color: '#fff'
              }
            },
            splitArea: {
              show: true
            },
            boundaryGap: true, //false时X轴从0开始
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            //show:false,
            "axisLine": {
              //show:false,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            },
            "axisTick": {
              show: true
            },
            axisLabel: {
              //show:false,
              textStyle: {
                color: '#fff'
              }
            },
            type: 'value'
          },
          series: [
            {
              name: '设备总量',
              smooth: true,
              type: 'line',
              lineStyle: {
                normal: {
                  color: '#32bef2',
                  opacity: 10
                }
              },
              itemStyle: {
                normal: {
                  color: '#32bef2'
                },
                emphasis: {
                  color: '#32bef2'
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(50,190,242,0.3)'
                },
              },
              symbolSize: 8,
              //symbol: 'circle',
              data: [100, 150, 190, 250, 320, 382, 388],
              markPoint: {
                label: {
                  normal: {
                    show: true,
                    color: '#fff'
                  },
                  emphasis: {
                    show: true,
                    color: '#ff9900'
                  }
                },
                data: [
                  {
                    name: '最大值',
                    type: 'min'
                  }
                ]
              }
            },
            {
              name: '已监控数量',
              smooth: true,
              type: 'bar',
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: '#32aca9',
                }
              },
              data: [70, 150, 150, 187, 190, 280, 270]
            },
            {
              name: '故障数量',
              smooth: true,
              type: 'bar',
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: '#ff0200',
                }
              },
              data: [20, 20, 20, 32, 15, 20, 90]
            },
            {
              type: 'pie',
              name: '监控情况总览',
              center: ['80%', '40%'],
              radius: ['30%', '32%'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              label: {
                normal: {
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  color: '#ff6600',
                }
              },
              data: [{
                value: 335,
                name: '已监控数量',
                itemStyle: {
                  normal: {
                    color: '#32aca9'
                  }
                },
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                label: {
                  normal: {
                    formatter: '{d} %',
                    textStyle: {
                      color: '#32aca9',
                      fontSize: 12
                    }
                  }
                }
              }, {
                value: 180,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#404A59'
                  }
                },
                label: {
                  normal: {
                    textStyle: {
                      color: '#ffd285',
                    },
                    formatter: '\n已监控'
                  }
                }
              }]
            },
            {
              type: 'pie',
              name: '故障情况总览',
              center: ['80%', '80%'],
              radius: ['30%', '32%'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              label: {
                normal: {
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  color: '#ff6600',
                }
              },
              data: [{
                value: 33,
                name: '故障数量',
                itemStyle: {
                  normal: {
                    color: '#ff0200'
                  }
                },
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                label: {
                  normal: {
                    formatter: '{d} %',
                    textStyle: {
                      color: '#ff0200',
                      fontSize: 12
                    }
                  }
                }
              }, {
                value: 180,
                name: '占位',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#404A59'
                  }
                },
                label: {
                  normal: {
                    textStyle: {
                      color: '#ffd285',
                    },
                    formatter: '\n故障量'
                  }
                }
              }]
            },
          ]
        })
      }
    }
  }
</script>
