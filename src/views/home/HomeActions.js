export const GET_USERS = 'GET_USERS'
export const CREATE_TASK = 'CREATE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const GET_TASKS = 'GET_TASKS'

// -------------------Auth Loading Actions--------------------

export const getUsersSuccess = (payload) => {
  return {
    type: GET_USERS,
    payload
  }
}
export const createTaskSuccess = (payload) => {
  return {
    type: CREATE_TASK,
    payload
  }
}
export const updateTaskSuccess = (payload) => {
  return {
    type: UPDATE_TASK,
    payload
  }
}
export const deleteTaskSuccess = (payload) => {
  return {
    type: DELETE_TASK,
    payload
  }
}
export const getTasksSuccess = (payload) => {
  return {
    type: GET_TASKS,
    payload
  }
}
