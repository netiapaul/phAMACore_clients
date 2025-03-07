import { defErrorMessage } from './config'

// export const extractErrorMessages = (error) => {
//   if (error.response?.data?.errors) {
//     // Case 1: `error.response.data.errors` (Object with key-value pairs)
//     return Object.values(error.response.data.errors).flat().join(', ')
//   }

//   if (error.response?.data?.message) {
//     // Case 2: `error.response.data.message` (Single sentence)
//     return error.response.data.message
//   }

//   if (error.message) {
//     // Case 3: `error.message` (Axios or network error)
//     return error.message
//   }

//   return 'An unknown error occurred' // Fallback error message
// }

export const extractErrorMessages = (error) => {
  if (error.response?.data?.errors) {
    // Case 1: `error.response.data.errors` (Object with key-value pairs)
    console.log('1: [ERRORS]', error.response.data.errors)
    return Object.values(error.response.data.errors).flat() // Returns an array of messages
  }

  if (error.response?.data?.message) {
    console.log('2: data[message]', error.response?.data?.message)
    // Case 2: `error.response.data.message` (Single sentence)
    return [error.response.data.message] // Return as array
  }

  if (error.message) {
    console.log('2: message', error.message)
    // Case 3: `error.message` (Axios or network error)
    return [error.message] // Return as array
  }

  return [defErrorMessage] // Fallback error
}
