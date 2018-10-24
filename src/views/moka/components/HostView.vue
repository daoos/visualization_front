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
      hostDisks: {
        type: Array
      },
      hostCPU: {
        type: Array
      },
      hostMem: {
        type: Array
      }
    },
    data() {
      return {
        chart: null,
        disks: [0],
        cpus: [0],
        mems: [0],
        xzhou2: [],
        yzhou2: [],
        zzhou2: [],
        xzhou3: [],
        yzhou3: [],
        zzhou3: [],
        option: []
      }
    },
    computed: {},
    watch: {
      hostDisks: function() {
        this.initOption()
      },
      hostCPU: function() {
        this.initOption()
      },
      hostMem: function() {
        this.initOption()
      }
    },
    mounted() {
      this.initOption()
      if (this.disks.length > 0) {
        this.disks = this.hostDisks
        this.cpus = this.hostCPU
        this.mems = this.hostMem
      }
      console.log(this.disks, this.cpus, this.mems)
      var self = this
      var k = 0
      setInterval(function() {
        if (k === 10) {
          k = 0
        }
        // var subLoadX = Math.random() * 100
        // var subLoadY = Math.random() * 100
        // var subLoadZ = Math.random() * 100
        // CPU利用率
        self.xzhou3.shift()
        self.xzhou3.push(self.cpus[k])
        // 内存利用率
        self.yzhou3.shift()
        self.yzhou3.push(self.mems[k])
        // 磁盘利用率
        self.zzhou3.shift()
        self.zzhou3.push(self.disks[k])
        // 横坐标
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
        self.option.xAxis.data.shift()
        self.option.xAxis.data.push(axisData)
        self.initChart(self.option)
        k++
      }, 1000)
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
      initOption() {
        var barColor = []
        var emColor = []
        var color0 = [
          '#089280',
          '#af540b',
          '#17559e']
        var color10 = [
          '#ff0200',
          '#32aca9',
          '#0cb0ed']
        if (navigator.userAgent.indexOf('MSIE 8.0') > 0) {
          for (var i = 0; i < color0.length; i++) {
            barColor[i] = {
              color: color0[i]
            }
            emColor[i] = {
              color: color10[i]
            }
          }
        } else {
          for (var j = 0; j < color0.length; j++) {
            barColor[j] = {
              color: {
                colorStops: [{
                  offset: 0,
                  color: color0[j] // 0% 处的颜色
                }, {
                  offset: 1,
                  color: color10[j] // 100% 处的颜色
                }]
              }
            }
            emColor[j] = {
              color: {
                colorStops: [{
                  offset: 0,
                  color: color10[j] // 0% 处的颜色
                }, {
                  offset: 1,
                  color: color0[j] // 100% 处的颜色
                }]
              }
            }
          }
        }

        for (var i = 0; i <= 40; i++) {
          this.xzhou2[i] = 0
          this.yzhou2[i] = 0
          this.zzhou2[i] = 0
          this.xzhou3[i] = 0
          this.yzhou3[i] = 0
          this.zzhou3[i] = 0
        }

        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              textStyle: {
                color: '#fff'
              }
            }
          },
          legend: {
            show: true,
            shadowColor: '#fff',
            shadowBlur: 5,
            shadowOffsetX: 5,
            data: ['CPU利用率', '内存利用率', '磁盘利用率'],
            top: '-2%',
            textStyle: {
              color: '#fff',
              fontSize: 14

            },
            itemHeight: 10
          },
          grid: {
            top: '7%',
            left: '2%',
            right: '5%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: (function() {
              var now = new Date()
              var res = []
              var len = 40 // 显示个数
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
                now = new Date(now - 2000)
              }
              return res
            })(),
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            }
          },
          series: [{
            name: 'CPU利用率',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 1,
            data: this.xzhou3,
            itemStyle: {
              normal: barColor[0],
              emphasis: emColor[0]
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(0,0,0,0.6)',
                shadowBlur: 10,
                shadowOffsetY: 5
              }
            }
          }, {
            name: '内存利用率',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 1,
            data: this.yzhou3,
            itemStyle: {
              normal: barColor[1],
              emphasis: emColor[1]
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(0,0,0,0.6)',
                shadowBlur: 10,
                shadowOffsetY: 5
              }
            }
          },
          {
            name: '磁盘利用率',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 1,
            data: this.zzhou3,
            itemStyle: {
              normal: barColor[2],
              emphasis: emColor[2]
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'rgba(0,0,0,0.6)',
                shadowBlur: 10,
                shadowOffsetY: 5
              }
            }
          }
          ]
        }
      },
      initChart(val) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(val)
      }
    }
  }
</script>
