import axios from 'axios'

const Http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
Http.interceptors.request.use(
  (config) => {
    // do something...
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
Http.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code === 'xxx') {
      // 登录校验失败
    } else if (data.code === 'xxx') {
      // 无权限
    } else if (data.code === '200') {
      // 成功
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  },
  (error) => Promise.reject(error)
)

export default Http
