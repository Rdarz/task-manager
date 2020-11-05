import axios from 'axios'
import { api } from 'common/utils/apiConfig'
import ConfigConstants from 'common/constants/ConfigConstants'

export const axiosInstance = axios.create({
  baseURL: api.baseURL + api.restApiRoot
})

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = ConfigConstants.contentType
    config.headers['AuthToken'] = ConfigConstants.authKey
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

export async function post(apiName, params, onSuccess, onFailure, onError) {
  let res = []
  const data = new FormData()

  Object.keys(params).map((key) => {
    data.append(key, params[key])
  })
  return await axiosInstance
    .post(apiName, data)
    .then((response) => {
      if (response.status === 200) {
        const { data } = response
        if (data) {
          onSuccess(data, response)
        } else if (onFailure) {
          onFailure(response)
        } else {
          console.log('Something went wrong')
        }
      } else {
        if (onError) {
          onError(response.status)
        } else {
          console.log('Something went wrong')
        }
      }
      res = response
      return response
    })
    .catch((e) => {
      if (onError) {
        onError(e)
      } else {
        // goToErrorScreen
      }
    })
}

export async function get(apiName, onSuccess, onFailure, onError) {
  let res = []
  return await axiosInstance
    .get(apiName)
    .then((response) => {
      if (response.status === 200) {
        const { data, statusText } = response

        if (data) {
          onSuccess(data, response)
        } else if (onFailure) {
          onFailure(response)
        } else {
          console.log('Something went wrong')
        }
      } else {
        if (onError) {
          onError(response.status)
        } else {
          console.log('Something went wrong')
        }
      }
      res = response
      return response
    })
    .catch((e) => {
      if (onError) {
        onError(e)
      } else {
        // goToErrorScreen
      }
    })
}
