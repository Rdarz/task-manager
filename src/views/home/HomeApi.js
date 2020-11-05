import {
  getUsersSuccess,
  createTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  getTasksSuccess
} from './HomeActions'
import { get, post } from 'webservice/AxiosClient'
import api from 'common/constants/ApiConstants'

export const getUsers = (props = null) => {
  return async (dispatch, getState) => {
    return await get(
      api.getUsers,
      (onSuccessData) => {
        dispatch(getUsersSuccess(onSuccessData))
      },
      (OnFailureData) => {},
      (error) => {}
    )
  }
}

export const getTasks = (props = null) => {
  return async (dispatch, getState) => {
    return await get(
      api.getTasks,
      (onSuccessData) => {
        dispatch(getTasksSuccess(onSuccessData))
      },
      (OnFailureData) => {},
      (error) => {}
    )
  }
}

export const createTask = (obj = {}) => {
  return async (dispatch, getState) => {
    return await post(
      api.createTask,
      obj,
      (onSuccessData) => {
        dispatch(createTaskSuccess(onSuccessData))
      },
      (OnFailureData) => {},
      (error) => {
        console.log(error)
      }
    )
  }
}

export const updateTask = (obj = {}) => {
  return async (dispatch, getState) => {
    return await post(
      api.updateTask,
      obj,
      (onSuccessData) => {
        dispatch(updateTaskSuccess(onSuccessData))
      },
      (OnFailureData) => {},
      (error) => {}
    )
  }
}

export const deleteTask = (obj) => {
  return async (dispatch, getState) => {
    return await post(
      api.deleteTask,
      obj,
      (onSuccessData) => {
        dispatch(deleteTaskSuccess(onSuccessData))
      },
      (OnFailureData) => {},
      (error) => {
        console.log(error)
      }
    )
  }
}
