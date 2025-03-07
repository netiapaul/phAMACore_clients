import axios from 'axios'

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
})

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(`${error.response.status}: ${error.response.data}`)
      //   return error.response.data
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    // console.log(error.config)
    // Do something with response error
    return Promise.reject(error)
  },
)

export async function get(url, config = {}) {
  return await axiosInstance.get(url, { ...config }).then((response) => response.data)
}

export async function post(url, data, config = {}) {
  return axiosInstance.post(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function put(url, data, config = {}) {
  return axiosInstance.put(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function del(url, config = {}) {
  return await axiosInstance.delete(url, { ...config }).then((response) => response.data)
}

// export const defErrorMessage = 'An error occured processing your current request!'
export const defErrorMessage =
  'Sorry! Something went wrong, please contact our support team if the issue persists.'
