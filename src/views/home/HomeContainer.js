import React, { useEffect, useState } from 'react'
import './HomeStyle.scss'
import Header from 'views/partials/header'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUsers,
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from './HomeApi'
import DataList from './components/DataList'

const Home = () => {
  const [userList, setUserList] = useState()
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state.home.getUsersRes)
  const taskData = useSelector((state) => state.home.getTasksRes)
  const createTaskRes = useSelector((state) => state.home.createTaskRes)
  const deleteTaskRes = useSelector((state) => state.home.deleteTaskRes)
  const updateTaskRes = useSelector((state) => state.home.updateTaskRes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTasks()).then((res) => res.status === 200 && setLoading(false))
  }, [createTaskRes, deleteTaskRes, updateTaskRes])

  const createUserTask = (obj) => {
    setLoading(true)
    dispatch(createTask(obj))
  }

  const updateUserTask = (obj) => {
    setLoading(true)
    dispatch(updateTask(obj))
  }

  const deleteUserTask = (obj) => {
    setLoading(true)
    dispatch(deleteTask(obj))
  }
  return (
    <React.Fragment>
      {loading && (
        <div className={'showLoader'}>
          <img className='loaderIcon' src='https://i.gifer.com/ZZ5H.gif' />
        </div>
      )}
      <Header />
      <DataList
        taskData={taskData && taskData.tasks}
        userData={userData && userData.users}
        createUserTask={createUserTask}
        deleteUserTask={deleteUserTask}
        updateUserTask={updateUserTask}
      />
    </React.Fragment>
  )
}

export default Home
