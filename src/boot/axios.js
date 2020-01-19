import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['x-access-token'] = token
    }

    config.headers['Content-type'] = 'application/json'
    config['baseURL'] = process.env.BACKEND + '/api'

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
