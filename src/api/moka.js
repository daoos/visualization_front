import request from '@/utils/request'
// 主机设备总数及纳入监控数量
export function getMonitorCount() {
  return request({
    url: '/panorama/hostClassification',
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
