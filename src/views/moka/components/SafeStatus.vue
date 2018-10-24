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

        var scale = 1;
        var singleData = [24, 70, 35,89,52,12];
        var multipleData = [44, 44, 22, 12, 56, 89];
        var judgeData = [11, 22, 15,45,75,36];
        var color = "#189cbb";

        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            show:false,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['综合安全评分', '防护完备性评分', '数据交规违规事件数'],
            align: 'left',
            itemGap: 50,
            // x: 'right',
            // top: '-10%',
            right:'0',
            y: '0',
            icon: 'rect',
            itemWidth: 15*scale, // 图例图形宽度
            itemHeight: 15*scale, // 图例图形高度
            textStyle: {
              color: "#fff",
              fontSize: 12*scale
            }
          },
          grid: {
            left: '3%',
            top: '15%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['外部专网', '互联网', '数据专网','视频专网', '涉密专网', '移动专网'],
            axisLabel: {
              // inside: true,
              padding: [15, 0, 0, 0],
              textStyle: {
                color: "#fff",
                fontSize: 12*scale,
              }
            },
            axisTick: {
              inside:true,
              length:8*scale,
              lineStyle: {
                color: color,
              }
            },
            axisLine: {
              lineStyle: {
                color: color,
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(80,224,255,0.3)',
                type: 'dashed'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            max:100,
            axisLabel: {
              // inside: true,
              padding: [0, 15, 0, 0],
              textStyle: {
                color: '#fff',
                fontSize: 16*scale,
              }
            },
            axisTick: {
              lineStyle: {
                color: color,
              }
            },
            axisLine: {
              lineStyle: {
                color: color,
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(80,224,255,0.3)',
                type: 'dashed'
              },
              show:false,
            },
            name: '评分',
            nameTextStyle: {
              color: "#fff",
              fontSize: 16*scale,
              padding: [0, 0, 10, 0]
            }
          }],
          series: [
            {
            name: '综合安全评分',
            type: 'bar',
            stack:'综合安全评分',
            barWidth: '15%',
            barGap:'40%',
            label: {
              normal: {
                show: true,
                position: "top",
                distance:20*scale,
                formatter: function(params) {
                  return params.data.value;
                },
                textStyle: {
                  color: "#ffc72b",
                  fontSize: 14*scale
                }
              }
            },
            itemStyle: {
              normal: {
                color:'rgba(94,218,255,0.4)',
              }
            },
            data: singleData
          },
            // {
            //   name: '综合安全评分',
            //   type: 'bar',
            //   stack:'综合安全评分',
            //   barWidth: '15%',
            //   barGap:'40%',
            //   itemStyle: {
            //     normal: {
            //       color:'#83e0fc',
            //     }
            //   },
            //   data: [2*scale, 2*scale, 2*scale]
            // },
            {
              name: '防护完备性评分',
              type: 'bar',
              stack:'防护完备性评分',
              barWidth: '15%',
              barGap:'40%',
              label: {
                normal: {
                  show: true,
                  position: "top",
                  distance:20*scale,
                  formatter: function(params) {
                    return params.data.value;
                  },
                  textStyle: {
                    color: "#ffc72b",
                    fontSize: 14*scale
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(20,124,146,0.4)',
                }
              },
              data: multipleData
            },
            // {
            //   name: '防护完备性评分',
            //   type: 'bar',
            //   stack:'防护完备性评分',
            //   barWidth: '15%',
            //   barGap:'40%',
            //   itemStyle: {
            //     normal: {
            //       color:'#23aecb',
            //     }
            //   },
            //   data: [2*scale, 2*scale, 2*scale]
            // },
            {
              name: '数据交规违规事件数',
              type: 'bar',
              stack:'数据交规违规事件数',
              barWidth: '15%',
              barGap:'40%',
              label: {
                normal: {
                  show: true,
                  position: "top",
                  distance:20*scale,
                  formatter: function(params) {
                    return params.data.value;
                  },
                  textStyle: {
                    color: "#ffc72b",
                    fontSize: 14*scale
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(9,149,124,0.4)',
                }
              },
              data: judgeData
            },
            // {
            //   name: '数据交规违规事件数',
            //   type: 'bar',
            //   stack:'数据交规违规事件数',
            //   barWidth: '15%',
            //   barGap:'40%',
            //   itemStyle: {
            //     normal: {
            //       color:'#10c8a7',
            //     }
            //   },
            //   data: [2*scale, 2*scale, 2*scale]
            // },

          ]
        })
      }
    }
  }
</script>
