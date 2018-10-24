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
        dataList:[],
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

        var data = [["1月", 116], ["2月", 129], ["3月", 135], ["4月", 86], ["5月", 73], ["6月", 85], ["7月", 73], ["8月", 68], ["9月", 92], ["10月", 130], ["11月", 245], ["12月", 139]];
        var dateList = data.map(function (item) {
          return item[0];
        });
        var valueList = data.map(function (item) {
          return item[1];
        });

        this.chart.setOption({
          // Make gradient line here
          visualMap: [{
            show: false,
            type: 'continuous',
            dimension: 0,
            min: 0,
            max: dateList.length - 1
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: dateList
          }],
          yAxis: [{
            splitLine: {show: false},
            axisLabel:{
              textStyle:{
                color:'#FFF',
                fontSize:12
              }
            },
          }],
          grid: [{
            top: '3%',
            bottom: '3%',
            height: '94%'
          }],
          series: [{
            type: 'line',
            areaStyle: {normal: {}},
            data: valueList
          }]
        })
      },

    }
  }
</script>
