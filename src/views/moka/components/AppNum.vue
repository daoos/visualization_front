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
          grid: {
            left: '20%',
            right: '1%',
            bottom: '1%',
            top:'0',
          },
          tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
            trigger: 'item'
          },
          // legend: {//图例组件，颜色和名字
          //   // left: '-50',
          //   // bottom: '1%',
          //   // top:0,
          //   itemGap: 16,
          //   itemWidth: 18,
          //   itemHeight: 10,
          //   textStyle: {
          //     color: '#a8aab0',
          //     fontStyle: 'normal',
          //     fontFamily: '微软雅黑',
          //     fontSize: 12,
          //   }
          // },
          yAxis: [
            {
              type: 'category',
              boundaryGap: true,//坐标轴两边留白
              data: ['服务人民群众', '服务审判执行', '服务司法管理'],
              axisLabel: {
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin:15,
                textStyle: {
                  color: '#fff',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12,
                }
              },
              axisTick:{//坐标轴刻度相关设置。
                show: true,
              },
              axisLine:{
                show: false
              },
              splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
              }
            }
          ],
          xAxis: [
            {
              type: 'value',
              splitNumber: 5,
              axisLabel: {
                show: true,
              },
              axisLine:{
                show: false
              },
              axisTick:{
                show: false
              },
              splitLine: {
                show: false
              }

            }
          ],
          series : [
            {
              name:'正常数量',
              type:'bar',
              data:[49, 73, 92],
              barWidth: 20,
              barGap:0,//柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: 0,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 1, color: 'rgba(96, 187, 237, 1)'
                  }, {
                    offset: 0, color: 'rgba(96, 187, 237, 0.6)'
                  }], false),
                },
              },
              zlevel:9
            },
            {
              name:'异常数量',
              type:'bar',
              data:[29, 5, 44],
              barWidth: 20,
              barGap:0.2,//柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: 0,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 1, color: 'rgba(234, 51, 35, 1)'
                  }, {
                    offset: 0, color: 'rgba(234, 51, 35, 0.6)'
                  }], false),
                },
              },
              zlevel:9
            },
            {
              "type": "pictorialBar",
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABMUlEQVRoQ+2aoU4DYRCEZ3uSF2l7fRkMmub6AKCrcHV9AdIQFBKPxiF7oYfBIbAIkia9aSBpgYQQuhlxm+zvZ7PzfXJ/GyzqO7R2/jgZLhHw2WBRk0QL4Joopk3Vf4nU47PAbmEC7yDmRDFrqv5bhCI/CnwV4atZ76J3xMv6pFx3ucivBfZFyGcYpqtxeQOzvakuFfqzwLciDyxw1pyO7ru0/Mcu/yqwW3rT2vHTZHjbpRIHFSAxXlXlVRYQEkgDQpiuUWnAhU0YSgNCmK5RacCFTRhKA0KYrlFpwIVNGEoDQpiuUWnAhU0YSgNCmK5RacCFTRhKA0KYrlFpwIVNGEoDQpiuUWnAhU0YSgNCmK5RacCFTRg6yEDYExPJmEc+Rj2zEkEP3WG/GkT/7BH6u80WK8dsQAaGofUAAAAASUVORK5CYII=',
              "symbolSize": [30, 30],
              symbolRotate:180,
              "symbolOffset": [
                -36,
                0
              ],
              "symbolBoundingData": 300,
              "data": [1,2,3],
              zlevel:100,
              z:100
            }
          ]
        })
      }
    }
  }
</script>
