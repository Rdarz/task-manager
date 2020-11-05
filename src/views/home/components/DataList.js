import React, { Component, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import DatePicker from 'react-date-picker'
import { Alert } from 'react-bootstrap'
import CreateTaskModal from './CreateTaskModal'

const DataList = ({
  taskData,
  userData,
  createUserTask,
  deleteUserTask,
  updateUserTask
}) => {
  const history = useHistory()
  const [view, setView] = useState('listView')
  const [dateOption, setDate] = useState()
  const [priorityOption, setPriority] = useState()
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [userTaskData, setUserTaskData] = useState()

  useEffect(() => {
    setUserTaskData(taskData)
  }, [taskData])

  const priority = ['High', 'Medium', 'Low']
  const options = [
    { value: '1', label: 'High' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'Low' }
  ]

  const handleClose = () => setShow(false)
  const handleShow = (action = 'create', data = null) => {
    if (action === 'edit') {
      setEdit(data)
    } else {
      setEdit(false)
    }
    setShow(true)
  }

  const filterByPriority = (value) => {
    if (value) {
      setPriority(value)
      setUserTaskData(
        taskData.filter((item) =>
          dateOption
            ? item.priority === value &&
              new Date(item.created_on).toLocaleDateString('en-IN') ===
                new Date(dateOption).toLocaleDateString('en-IN')
            : item.priority === value
        )
      )
    } else {
      setPriority(null)
    }
  }
  const filterByDate = (value) => {
    if (value) {
      setDate(value)
      setUserTaskData(
        taskData.filter((item) =>
          priorityOption
            ? new Date(item.created_on).toLocaleDateString('en-IN') ===
                new Date(value).toLocaleDateString('en-IN') &&
              item.priority === priorityOption
            : new Date(item.created_on).toLocaleDateString('en-IN') ===
              new Date(value).toLocaleDateString('en-IN')
        )
      )
    } else {
      setDate(null)
      setUserTaskData(
        priorityOption
          ? taskData.filter((item) => item.priority === priorityOption)
          : taskData
      )
    }
  }
  const sectionPriorityHigh = taskData.filter((item) => item.priority === '1')
  const sectionPriorityMedium = taskData.filter((item) => item.priority === '2')
  const sectionPriorityLow = taskData.filter((item) => item.priority === '3')
  const onDragStart = (ev, item) => {
    let stringifyObj = JSON.stringify(item)
    ev.dataTransfer.setData('task', stringifyObj)
  }
  const onDrop = (ev, p) => {
    let taskData = JSON.parse(ev.dataTransfer.getData('task'))
    taskData.taskid = taskData.id
    taskData.priority = JSON.stringify(priority.indexOf(p) + 1)
    updateUserTask(taskData)
  }

  const onDragOver = (ev) => {
    ev.preventDefault()
  }
  const renderList = (data) => {
    return data && data.length ? (
      data.map((item) => {
        return (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            className='taskListItem row'
          >
            {/* <i className='fa fa-circle' aria-hidden='true'></i> */}
            <div className='col-7'>
              <span>{`T${item.id} - `}</span>
              <span>{item.message}</span>
            </div>
            <div className='col-5 listOption d-flex flex-row-reverse'>
              <span
                title='Delete'
                className='deleteOption'
                onClick={() =>
                  deleteUserTask({
                    taskid: item.id
                  })
                }
              >
                <i className='fa fa-trash' aria-hidden='true'></i>
              </span>
              <span
                title='Edit'
                className='editOption'
                onClick={() => handleShow('edit', item)}
              >
                <i className='fa fa-pen' aria-hidden='true'></i>
              </span>
              {view === 'listView' && (
                <div>
                  <span title='Assignee'>
                    <i
                      className='fa fa-user-circle pdr-10'
                      aria-hidden='true'
                    ></i>
                    {`${item.assigned_name}`}
                  </span>
                  <span title='Created On'>
                    {new Date(item.created_on).toLocaleDateString('en-IN')}
                  </span>
                  <span title='Priority'>
                    {priority[parseInt(item.priority) - 1]}
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })
    ) : (
      <Alert variant='danger' style={{ textAlign: 'center' }}>
        No Results Found
      </Alert>
    )
  }
  return (
    <div className='row no-gutters'>
      <CreateTaskModal
        show={show}
        onHide={handleClose}
        userData={userData}
        taskData={userTaskData}
        createUserTask={(obj) => createUserTask(obj)}
        updateUserTask={(obj) => updateUserTask(obj)}
        edit={edit}
      />
      <div className='col-3 sectionList'>
        <div className='section'>
          <div className='section-title'>
            <i className='fa fa-inbox' aria-hidden='true'></i>
            <span className='section-list-title'>All Task</span>
          </div>

          <div
            className={
              view === 'listView'
                ? 'section-list-item active'
                : 'section-list-item'
            }
            onClick={() => setView('listView')}
          >
            <i className='fa fa-list' aria-hidden='true'></i>
            <span className='section-list-title'>List View</span>
          </div>
          <div
            className={
              view === 'boardView'
                ? 'section-list-item active'
                : 'section-list-item'
            }
            onClick={() => setView('boardView')}
          >
            <i className='fa fa-pause' aria-hidden='true'></i>
            <span className='section-list-title'>Board View</span>
          </div>
        </div>
        <div className='section'>
          <div className='section-title'>
            <i className='fa fa-filter' aria-hidden='true'></i>
            <span className='section-list-title'>Filter</span>
          </div>

          <div className='section-list-item filter'>
            <div className='section-list-title'>By Date</div>
            <DatePicker
              onChange={filterByDate}
              value={dateOption}
              calendarIcon={null}
            />
          </div>
          <div className='section-list-item filter'>
            <div className='section-list-title'>By Priority</div>
            <Select
              options={options}
              placeholder='Select Priority'
              isClearable={true}
              onChange={(val) => filterByPriority(val.value)}
            />
          </div>
        </div>
      </div>
      <div className='col-9 taskList'>
        <div className='taskListHeader'>
          {/* <span className='title'>All Task</span> */}
          <div className='d-flex flex-row-reverse'>
            <div className='button' onClick={() => handleShow('create')}>
              <i className='fa fa-plus' aria-hidden='true'></i>
              <span className='button-title'>Create Task</span>
            </div>
          </div>
        </div>

        <div className='col-12 taskListItemContainer'>
          {view === 'listView' ? (
            <div className='listView'>{renderList(userTaskData)}</div>
          ) : (
            <div className='boardView row'>
              <div className='col-4'>
                <div
                  className='bsection'
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => {
                    onDrop(e, 'High')
                  }}
                >
                  <div className='secHeader'>High Priority</div>
                  {renderList(sectionPriorityHigh)}
                </div>
              </div>
              <div className='col-4'>
                <div
                  className='bsection'
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => {
                    onDrop(e, 'Medium')
                  }}
                >
                  <div className='secHeader'>Medium Priority</div>
                  {renderList(sectionPriorityMedium)}
                </div>
              </div>
              <div className='col-4'>
                <div
                  className='bsection'
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => {
                    onDrop(e, 'Low')
                  }}
                >
                  <div className='secHeader'>Low Priority</div>
                  {renderList(sectionPriorityLow)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataList
