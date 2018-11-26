import request from '@/utils/request'
// 主机设备总数及纳入监控数量
export function getMonitorCount() {
  return request({
    url: '/panorama/getMonitorWithType',
    method: 'get'
  })
}

// 示例
// export function methods_name() {
//   return request({
//     url: 'url_ddress',
//     method: 'get/post'
//   })
// }
// 主机设备cpu、磁盘、内存利用率
export function getHostView() {
  return request({
    url: '/panorama/getUsedRatePanorama',
    method: 'get'
  })
}
// 1.根据设备类型获取告警数量
export function listAlertWithDeviceType(type) {
  return request({
    url: '/panorama/listAlertWithDeviceType',
    params: { type: type },
    method: 'get'
  })
}
// 2.根据设备类型获取磁盘、cpu、内存利用率
export function getUserRateWithType(type) {
  return request({
    url: '/panorama/getUserRateWithType',
    params: { type: type },
    method: 'get'
  })
}

// 3.根据设备类型获取设备监控数量
export function getMonitorWithType(type) {
  return request({
    url: '/panorama/getMonitorWithType',
    params: { type: type },
    method: 'get'
  })
}

// 4.获取应用分类正常异常数量
export function getApplicationCount() {
  return request({
    url: 'src/api/customView/getApplicationCount.json',
    method: 'get'
  })
}

// 5.获取基础设施设备统计
export function getBaseDeviceStatistics() {
  return request({
    url: '/panorama/getBaseDeviceStatistics',
    method: 'get'
  })
}

// 6.获取安全事件数据
export function getSafeEventData() {
  return request({
    url: '/panorama/getSafeEventData',
    method: 'get'
  })
}

// 7.获取安全设备状态数据
export function getSafeStatusData() {
  return request({
    url: '/panorama/getSafeStatusData',
    method: 'get'
  })
}

// 8.获取系统投诉处理统计
export function getSysComplaintStatistics() {
  return request({
    url: '/panorama/getSysComplaintStatistics',
    method: 'get'
  })
}

// 9.获取各应用系统问题申报统计
export function getSysIssusStatistics() {
  return request({
    url: '/panorama/getSysIssusStatistics',
    method: 'get'
  })
}

// 10.获取基础设施、应用状态
export function getBaseDeviceData() {
  return request({
    url: 'src/api/customView/getBaseDeviceData.json',
    method: 'get'
  })
}

// 11.获取设备报警情况总览
export function getDeviceAlertOverView() {
  return request({
    url: 'src/api/customView/getDeviceAlertOverView.json',
    method: 'get'
  })
}

// 12.获取已监控数量和总数量
export function getMonitorProportion() {
  return request({
    url: 'src/api/customView/getMonitorProportion.json',
    method: 'get'
  })
}

// 13.获取安全态势数据
export function getSafeSituationData() {
  return request({
    url: '/panorama/getSafeSituationData',
    method: 'get'
  })
}

// 14.获取数据态势
export function getDataSituation() {
  return request({
    url: 'src/api/customView/getDataSituation.json',
    method: 'get'
  })
}
// 15.获取应用态势
export function getAppSituation() {
  return request({
    url: 'src/api/customView/getAppSituation.json',
    method: 'get'
  })
}
