<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  import { listAlertWithDeviceType } from '@/api/moka'
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
      type: {
        type: Number
      }
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
        dataList: []
      }
    },
    computed: {},
    watch: {
      dataList: function() {
        this.initChart()
      },
      type: function() {
        this.dataList = []
        this.listAlertWithDeviceType()
        this.initChart()
      }
      // deviceName: function() {
      //   this.getData()
      //   this.initChart()
      // }
    },
    mounted() {
      this.listAlertWithDeviceType()
      setInterval(() => {
        this.listAlertWithDeviceType()
      }, 5000)
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

      listAlertWithDeviceType() {
        this.dataList = []
        listAlertWithDeviceType(this.type).then(response => {
          var res = response.data
          for (var k in res) {
            var item = []
            item.push(res[k].month + '月', res[k].alertCount)
            this.dataList.push(item)
          }
        })
      },

      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        var data = this.dataList
        // console.log(data)
        var dateList = data.map(function(item) {
          // console.log(item[0])
          return item[0]
        })
        var valueList = data.map(function(item) {
          return item[1]
        })

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
            splitLine: { show: false },
            axisLabel: {
              textStyle: {
                color: '#FFF',
                fontSize: 12
              }
            }
          }],
          grid: [{
            top: '3%',
            bottom: '3%',
            height: '94%'
          }],
          series: [{
            type: 'line',
            areaStyle: { normal: {}},
            data: valueList
          }]
        })
      }

    }
  }
</script>
