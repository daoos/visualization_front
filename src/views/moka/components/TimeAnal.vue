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
        /*---------------------数据----------------------------*/
        var echartData = [{
          value: 98,//时间
          name: '交卷时间'
        }, {
          value: 50,
          name: '未交卷时间'
        }];


        /*---------------------颜色变量----------------------------*/
//蓝色
        var innerColor = '#ff0200'; //内层颜色
        var outColor = "#32aca9"; //外层边框色粗
        var textColor = '#32bef2'; //文字颜色
        var startColor = 'rgba(73,223,240,0.1)'; //中间饼图渐变开始颜色
        var endColor = 'rgba(73,223,240,0.8)'; //中间饼图渐变结束颜色
//绿色
// var innerColor = '#50e0ff'; //内层颜色
// var outColor = "#2bff8f"; //外层边框色粗
// var textColor = '#50e0ff'; //文字颜色
// var startColor = 'rgba(43,255,143,0.1)'; //中间饼图渐变开始颜色
// var endColor = 'rgba(43,255,143,0.8)'; //中间饼图渐变结束颜色


        /*---------------------缩放----------------------------*/
        var scale = 1;


        /*---------------------颜色配置----------------------------*/
        var color = [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: startColor // 0% 处的颜色
          }, {
            offset: 1,
            color: endColor // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }, 'none'];
        /*---------------------富文本----------------------------*/
        var rich = {
          time: {
            color: innerColor,
            fontSize: 12 * scale,
            padding: [0, 0],
            fontWeight:'bold'
          },
          unit:{
            color: innerColor,
            fontSize: 10 * scale,
            padding: [0,0,0, 0],
            verticalAlign:'bottom',
          }
        };

        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          title: [{
            text: '响应时长',
            x: '20%',
            y: 0,
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              textAlign: 'center',
              fontSize: 12 * scale,
              fontFamily:'Microsoft YaHei'
            },
          }],
          grid: {
            top: '10%',
            left:'10%',
            bottom: '10%',
            right: '1%',
          },
          series: [
            //内圈圆环
            {
              name: 'Line 0',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['50%', '51.5%'],
              itemStyle: {
                normal: {
                  color: innerColor
                }
              },
              data: [{
                value: 10,
                name: '',
              }],
              label: {
                normal: {
                  formatter: function(params) {
                    var time = echartData[0].value;
                    return '{time|' + time + '}{unit|ms}';
                  },
                  position: 'center',
                  textStyle: {
                    fontSize: 38 * scale,
                    fontWeight: 'bold',
                    color: textColor
                  },
                  rich:rich
                }
              }
            },
            //中间圆环
            {
              name: 'Line 1',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['75%', '65%'],
              color: color,
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              },
              data:echartData,
            },
            //外层圆环
            {
              name: 'Line 2',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['75%', '85%'],
              itemStyle: {
                normal: {
                  borderWidth: 2* scale,
                  borderColor: outColor,
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              },
              data: [{
                value: 10,
                name: '',
              }]
            }
          ],
        })
      }
    }
  }
</script>
