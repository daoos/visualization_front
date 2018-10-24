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
        dataList: [],
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
      var index=0;
      var self = this;
      setInterval(function () {
        if (index<=24) {
          self.dataList.push(Math.random().toFixed(2) * 2+49);
        } else {
          self.dataList=[];
          index=0;
        }
        index++;
        self.initChart();
      },1000);
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
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          grid: {
            left: '1%',
            right: '1%',
            bottom: '5%',
            top:'1%',
          },
          tooltip: {
            trigger: 'axis'
          },
          // legend: {
          //   data:['频率'],
          //   textStyle:{
          //     color:'#FFF',
          //     fontSize:12
          //   }
          // },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            splitLine:{
              show:false,
              lineStyle:{
                type:'dotted'
              }
            },
            axisLabel:{
              textStyle:{
                color:'#FFF',
                fontSize:8
              }
            },
            axisLine:{
              lineStyle:{
                color:'#FFF'
              }
            },
            data: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','23:59']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} Hz',
              textStyle:{
                color:'#FFF',
                fontSize:12
              }
            },
            min:48.75,
            max:51.25,
            axisLine:{
              lineStyle:{
                color:'#FFF'
              }
            },
            splitLine:{
              show:false,
              lineStyle:{
                type:'dotted'
              }
            }
          },
          series: [
            {
              name:'频率',
              type:'line',
              symbol:'circle',
              itemStyle:{
                normal:{
                  color:'#32bef2'
                }
              },
              data:this.dataList,
              markPoint: {
                symbolSize:1,
                data: [
                  {type: 'max', name: '最大值',itemStyle:{normal:{color:'#32bef2'}}},
                  {type: 'min', name: '最小值',itemStyle:{normal:{color:'#32bef2'}}}
                ],
                label:{normal:{textStyle:{color:'#32bef2',fontSize:14}}}
              },
              lineStyle:{
                normal:{
                  color:'#32bef2',
                  width:3
                }
              },
              markLine: {
                lineStyle:{
                  normal:{
                    type:'solid',
                    width:2
                  }
                },
                data: [
                  {type: 'average', name: '平均值',itemStyle:{normal:{color:'#FFFFFF'}}}
                ],
                label:{normal:{textStyle:{color:'#FFF',fontSize:12}}}
              }
            },
            {
              name:'最大值',
              type:'line',
              symbol:'circle',
              symbolSize:1,
              itemStyle:{
                normal:{
                  color:'red'
                }
              },
              lineStyle:{normal:{width:2}},
              data:[51, 51, 51, 51, 51, 51, 51,51,51,51,51,51,51,51, 51, 51, 51, 51, 51, 51,51,51,51,51,51,51],

            },
            {
              name:'最小值',
              type:'line',
              symbol:'circle',
              symbolSize:1,
              itemStyle:{
                normal:{
                  color:'red'
                }
              },
              lineStyle:{normal:{width:2}},
              data:[49, 49, 49, 49, 49, 49, 49,49,49,49,49,49,49,49, 49, 49, 49, 49, 49, 49,49,49,49,49,49,49],

            }
          ]
        })
      }
    }
  }
</script>
