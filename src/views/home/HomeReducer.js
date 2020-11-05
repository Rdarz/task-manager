import {
  GET_USERS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS
} from './HomeActions'

const ACTION_HANDLERS = {
  [GET_USERS]: (state, action) => ({
    ...state,
    getUsersRes: action.payload
  }),
  [CREATE_TASK]: (state, action) => ({
    ...state,
    createTaskRes: action.payload
  }),
  [UPDATE_TASK]: (state, action) => ({
    ...state,
    updateTaskRes: action.payload
  }),
  [DELETE_TASK]: (state, action) => ({
    ...state,
    deleteTaskRes: action.payload
  }),
  [GET_TASKS]: (state, action) => ({
    ...state,
    getTasksRes: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
