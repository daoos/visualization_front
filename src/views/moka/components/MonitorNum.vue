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
        STEP: 5,
        TOTAL: 100,
        errorIndex: [],
        deviceData: [],
        option: [],
        currentStep: 0,
        newStep: 0,
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
      this.initOption();
      var self = this;
      setInterval(function(){
        var currentIndex=0;
        currentIndex = self.errorIndex.indexOf(currentIndex);
        if (currentIndex < 0) {
          currentIndex = self.errorIndex[self.errorIndex.length - 1];
        }
        self.rotate();
        self.initChart(self.option)
      }, 2000);
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
        for (var c = 0; c < 5; c++) {
          var deviceItemData = [];
          for (var i = 0; i < this.TOTAL; i++) {
            var color = '#32aca9';
            var borderColor = i == 0 ? 'white' : '#333';
            var borderWidth = i == 0 ? 2 : 0.5;
            if (Math.random() < 0.1) {
              if (c == 4) {
                color = 'black';
              } else if (c == 2 || c == 3) {
                this.errorIndex.push(i);
                color = '#fa240d';
              }
            }
            deviceItemData.push({
              value: 1,
              name: 'name' + i,
              itemStyle: {
                normal: {
                  color: color,
                  borderColor: '#333',
                  borderWidth: 0.5,
                }
              }
            })

          }
          this.deviceData.push(deviceItemData);
        }
        ;
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: 'Device',
              type: 'pie',
              selectedMode: 'single',
              radius: ['50%', '55%'],
              //animation: false,

              label: {
                normal: {
                  show: false,
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.deviceData[0]

            },
            {
              name: 'Device',
              type: 'pie',
              radius: ['55%', '60%'],
              //animation: false,
              label: {
                normal: {
                  show: false
                }
              },

              data: this.deviceData[1]

            },
            {
              name: 'Device',
              type: 'pie',
              radius: ['60%', '65%'],
              //animation: false,
              label: {
                normal: {
                  show: false
                }
              },

              data: this.deviceData[2]

            },
            {
              name: 'Device',
              type: 'pie',
              radius: ['65%', '70%'],
              //animation: false,
              label: {
                normal: {
                  show: false
                }
              },

              data: this.deviceData[3]

            },
            {
              name: 'Device',
              type: 'pie',
              radius: ['70%', '75%'],
              //animation: false,
              label: {
                normal: {
                  show: false
                }
              },
              data: this.deviceData[4]
            }
          ]
        };
      },
      rotate() {
        this.newStep = this.currentStep - this.STEP;
        if (this.newStep < 0) {
          this.newStep = this.TOTAL + this.newStep;
        }
        //console.log('startAngle: ', option.series[0].startAngle);
        for (var i = 0; i < 5; i++) {
          //option.series[i].data[currentStep].itemStyle.normal.borderColor = '#333';
          //option.series[i].data[currentStep].itemStyle.normal.borderWidth = 0.5;

          if (this.option.series[i].startAngle !== undefined) {

            if (this.option.series[i].startAngle > 0) {
              this.option.series[i].startAngle -= 360 / this.TOTAL * this.STEP;
            } else {
              this.option.series[i].startAngle = 360 - 360 / this.TOTAL * this.STEP;
            }
          } else {
            this.option.series[i].startAngle = 90 - 360 / this.TOTAL * this.STEP;
          }


          //option.series[i].data[newStep].itemStyle.normal.borderColor = 'white';
          //option.series[i].data[newStep].itemStyle.normal.borderWidth = 2;
        }

        this.currentStep = this.newStep;
      },
      initChart(val) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(val)
      }
    }
  }
</script>
