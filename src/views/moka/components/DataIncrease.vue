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

        var data1=[160, 182, 131, 134, 150, 120, 180];
        var data2=[120, 130, 125, 145, 172, 165, 122];
        var axisData=['指标一','指标二','指标三','指标四','指标五','指标六','指标七'];

        var barData1=[];
        var barData2=[];
        for(var i=0;i<axisData.length;i++){
          barData1.push(Math.min(data1[i],data2[i]));
          barData2.push(Math.abs(data1[i]-data2[i]));
        }


        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: 'cyan'
              }
            },
            formatter:function(params){
              console.log(params);
              var tooltipStr=
                '<p>上月: '+data1[params[0].dataIndex]+' </p>'+
                '<p>本月 : '+data2[params[0].dataIndex]+' </p>'+
                '<p>差值 : '+barData2[params[0].dataIndex]+' </p>';

              return tooltipStr;
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['本月', '上月',],
            right: '4%',
            top: '0%',
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '15%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              show: true
            },
            axisLabel:{
              textStyle:{
                color:'#fff'
              }
            },
            data: axisData
          },
          yAxis: {
            type: 'value',
            name: '流量',
            axisTick: {
              show: true
            },
            axisLine: {
             show: true
            },
            axisLabel: {
              textStyle: {
                color:'#fff',
                fontSize: 12,
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: [
            {
              name: '本月',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(137,189,27)',
                  borderColor: 'rgba(137,189,2,0.27)',
                  borderWidth: 8

                }
              },
              data: data1
            },
            {
              name: '上月',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(0,136,212)',
                  borderColor: 'rgba(0,136,212,0.2)',
                  borderWidth: 8

                }
              },
              data: data2
            },

            // bar图
            {
              type:'bar',
              stack:'test',
              // barWidth:'10%',
              itemStyle:{
                normal:{
                  color:'rgba(0,0,0,0)'
                }
              },
              data:barData1,
              tooltip:{
                show:false
              }

            },
            {
              type:'bar',
              stack:'test',
              barWidth:4,
              itemStyle:{
                normal:{
                  color:function(params){
                    // console.log(params);
                    if(data1[params.dataIndex]>data2[params.dataIndex]){
                      return '#32bef2';
                    }else if(data1[params.dataIndex]<data2[params.dataIndex]){
                      return '#ff0200';
                    }else{
                      return 'rgba(0,0,0,0)';
                    }
                  },
                  barBorderRadius:2
                }
              },
              data:barData2,
              tooltip:{
                show:false
              }

            }

          ]
        })
      }
    }
  }
</script>
