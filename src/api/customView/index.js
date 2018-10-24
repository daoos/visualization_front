import request from '@/utils/request'

// export default function getHostPanorama() {
//   return request({
//     url: '/src/api/customView/HostPanorama.json'
//     // method: 'get'
//   })
// }

export function getDeviceCount() {
  return request({
    url: '/src/api/customView/devicecount.json'
    // method: 'get'
  })
}

export function getHostDevice() {
  return request({
    url: 'src/api/customView/hostdevice.json'
    // method: 'get'
  })
}

export function getNetworkDevice() {
  return request({
    url: '/src/api/customView/networkdevice.json'
    // method: 'get'
  })
}

export function getStorageDevice() {
  return request({
    url: '/src/api/customView/storageDevice.json'
    // method: 'get'
  })
}

export function getApplication() {
  return request({
    url: 'src/api/customView/AppPanorama.json'
    // method: 'get'
  })
}

export function getQualityControl() {
  return request({
    url: 'src/api/customView/QualityControl.json'
    // method: 'get'
  })
}

export function getAppNum() {
  return request({
    url: 'src/api/customView/AppNum.json'
    // method: 'get'
  })
}
