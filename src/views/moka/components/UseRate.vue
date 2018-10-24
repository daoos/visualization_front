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
        dataList: 40,
      }
    },
    computed: {},
    watch: {
      dataList: function () {
        this.initChart()
      }
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
      var self = this;
      setInterval(function() {
        self.dataList = (Math.random() * 100).toFixed(2) - 0;
        // self.initChart()
      }, 2000)

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
            formatter: "{b} : {c}%"
          },
          series: [{
            name: '黑色外圈细',
            type: 'gauge',
            radius: '97%',
            startAngle: 250,
            endAngle: -70,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [0.2, '#000'],
                  [0.8, '#000'],
                  [1, '#000']
                ],
                width: 4,
                shadowColor: '#0d4b81', //默认透明
                shadowOffsetX: 0,
                shadowOffsetY: -3,
                shadowBlur: 20,
                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            data: [{
              value: '',
              name: ''
            }]
          }, {
            name: '蓝色外圈粗1',
            type: 'gauge',
            radius: '99%',
            startAngle: -65,
            endAngle: -115,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#00fffc']
                ],
                width: 2,
                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            data: [{
              value: '',
              name: ''
            }]
          }, {
            name: '蓝色外圈粗2',
            type: 'gauge',
            radius: '99%',
            startAngle: -155,
            endAngle: 155,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#00fffc']
                ],
                width: 2,


                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            data: [{
              value: '',
              name: ''
            }]
          }, {
            name: '蓝色外圈粗3',
            type: 'gauge',
            radius: '99%',
            startAngle: 25,
            endAngle: -25,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#00fffc']
                ],
                width: 2,
                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            data: [{
              value: '',
              name: ''
            }]
          }, {
            name: '蓝色外圈粗4',
            type: 'gauge',
            radius: '99%',
            startAngle: 115,
            endAngle: 65,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#00fffc']
                ],
                width: 2,


                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            data: [{
              value: '',
              name: ''
            }]
          }, {
            name: '内圈小',
            type: 'gauge',
            radius: '70%',
            startAngle: 359.9,
            endAngle: 0,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#31ada9']
                ],
                width: '100%',
                shadowColor: '#31ada9', //默认透明
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40,
                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            data: [{
              value: '',
              name: ''
            }]
          }, {
            name: '内圈',
            type: 'gauge',
            radius: '65%',
            startAngle: 245,
            endAngle: -65,
            splitNumber: 4,

            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#000']
                ],
                width: '100%',
                shadowColor: '#31ada9', //默认透明
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                opacity: 1,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            pointer: { //仪表盘指针。
              length: '1%',
              width: 0,
            },
            detail: {
              offsetCenter: [0, -10],
              formatter: function(value) {
                return value + '%';
              },
              textStyle: {
                color: '#FFF',
                fontSize: 12
              },
            },
            data: [{
              value: this.dataList,
              name: '',
              // textStyle: {
              //   color: '#fff',
              //   fontSize:12
              // }
            }],
          },

          ]
        })
      }
    }
  }
</script>
