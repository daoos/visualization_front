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
        var myColor=['#0096f3','#ff0200']
        this.chart.setOption({
          grid: {
            left: '-5%',
            top:'30%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          title: {
            text: '已处理工单占比：',
            x: '20%',
            y: '10%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 'bold',
              fontFamily:'Microsoft YaHei'
            },
          },
          xAxis: [{
            show: false,
          }],
          yAxis:
            [{
              axisTick:'none',
              axisLine:'none',
              offset:'27',
              axisLabel: {
                textStyle: {
                  color: '#ffffff',
                  fontSize:'16',
                }
              },
              data: []
            }, {
              axisTick:'none',
              axisLine:'none',
              axisLabel: {
                textStyle: {
                  color: '#ffffff',
                  fontSize:'16',
                }
              },
              data: ['12567']
            },{

              axisLine:{
                lineStyle:{
                  color:'rgba(0,0,0,0)'
                }
              },
              data: [],
            }],
          series: [{
            name: '条',
            type: 'bar',
            stack:'圆',
            yAxisIndex: 0,
            data: [30],
            label:{
              normal:{
                show:true,
                position:'right',
                distance:10,
                formatter:function(param){
                  return param.value + '%';
                },
                textStyle:{
                  color: '#ffffff',
                  fontSize:'16',
                }
              }
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: myColor[1],
                //   function(params) {
                //   var num=myColor.length;
                //   return myColor[params.dataIndex%num]
                // },
              }
            },
            z: 2
          },{
            name: '内圆',
            type: 'scatter',
            stack:'圆',
            yAxisIndex: 0,
            data: [0],
            label:{
              normal:{
                show:false,
                position:'right',
                formatter:function(param){
                  return param.value + '%';
                },

                textStyle:{
                  color: '#ffffff',
                  fontSize:'16',
                }
              }
            },

            yAxisIndex: 2,
            symbolSize: 14,
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth:3 ,
                color: myColor[1],
                //   function(params) {
                //   var num=myColor.length;
                //   return myColor[params.dataIndex%num]
                // },
                opacity: 1,
              }
            },
            z: 2
          }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99.5],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#0e2147',
                barBorderRadius: 5,
              }
            },
            z: 1
          }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [100],
            barWidth: 24,
            itemStyle: {
              normal: {
                color:myColor[0],
                //   function(params) {
                //   var num=myColor.length;
                //   return myColor[params.dataIndex%num]
                // },
                barBorderRadius: 5,
              }
            },
            z: 0
          },
            {
              name: '外圆',
              type: 'scatter',
              hoverAnimation: false,
              data: [0],
              yAxisIndex: 2,
              symbolSize: 30,
              itemStyle: {
                normal: {
                  color: myColor[1],
                  //   function(params) {
                  //   var num=myColor.length;
                  //   return myColor[params.dataIndex%num]
                  // },
                  opacity: 1,
                }
              },
              z: 2
            }]
        })
      }
    }
  }
</script>
