// import axios from 'axios'
import { post } from '../config'

// Register Method
// export const AuthLoginUSer = (data) => {
//   return axios
//     .post(`${import.meta.env.VITE_API_ENDPOINT}/api/Auth/Login`, data)
//     .then((response) => {
//       if (response.status >= 200 || response.status <= 299) return response.data
//       throw response.data
//     })
//     .catch((err) => {
//       let message
//       if (err.response && err.response.status) {
//         switch (err.response.status) {
//           case 404:
//             message = 'Sorry! the page you are looking for could not be found'
//             break
//           case 500:
//             message = 'Sorry! something went wrong, please contact our support team'
//             break
//           case 401:
//             message = 'Invalid credentials'
//             break
//           default:
//             message = err[1]
//             break
//         }
//       }
//       throw message
//     })
// }

// export const AuthLoginUSer = async (data) => {
//   try {
//     const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/Auth/Login`, data)
//     return response.data
//   } catch (error) {
//     // const status = err.response?.status
//     // const errorMessages = {
//     //   404: 'Sorry! The page you are looking for could not be found.',
//     //   500: 'Sorry! Something went wrong, please contact our support team.',
//     //   401: 'Invalid credentials.',
//     // }

//     // throw errorMessages[status] || err.response?.data || 'An unknown error occurred'

//     const errorResponse = error.response || { data: 'An unknown error occurred' }
//     console.log(errorResponse)
//     return Promise.reject(errorResponse) // Ensure .catch() gets a response object
//   }
// }

// Login Method
export const AuthLoginUSer = async (data) => {
  try {
    return await post(`${import.meta.env.VITE_API_ENDPOINT}/api/Auth/Login`, data)
  } catch (error) {
    // const errorResponse = error.response || { data: 'An unknown error occurredasd' }
    return Promise.reject(error)
  }
}
