import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
// const a = process.env.BASE_API
const service = axios.create({
  baseURL: 'http://139.4.48.244:9090', // api的base_url
  timeout: 5000 // request timeout
})

// respone interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // console.log('aaaaaa', a)
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
