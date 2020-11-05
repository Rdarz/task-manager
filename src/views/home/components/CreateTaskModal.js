import React, { Component, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select, { components } from 'react-select'
import DatePicker from 'react-date-picker'
import { Modal, Button, Form } from 'react-bootstrap'
const CreateTaskModal = ({
  show,
  onHide,
  userData,
  createUserTask,
  updateUserTask,
  edit
}) => {
  const [message, setMessage] = useState()
  const [duedate, setDueDate] = useState()
  const [priority, setPriority] = useState()
  const [assignedTo, setAssignedTo] = useState()

  const optionsPriority = [
    { value: '1', label: 'High' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'Low' }
  ]
  const optionsUser = userData
    ? userData.map((item) => {
        return { value: item.id, label: item.name, icon: item.picture }
      })
    : []

  const IconOption = (props) => (
    <Option {...props}>
      <img
        src={props.data.icon}
        style={{ width: 20, borderRadius: '10px', marginRight: '10px' }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  )
  const { Option } = components
  const createTask = async () => {
    await createUserTask({
      message: message,
      due_date: new Date(duedate),
      priority: priority,
      assigned_to: assignedTo
    })
    onHide()
  }
  const updateTask = async () => {
    await updateUserTask({
      message: message || edit.message,
      due_date: new Date(duedate) || edit.due_date,
      priority: priority || edit.priority,
      assigned_to: assignedTo || edit.assigned_to,
      taskid: edit && edit.id
    })
    onHide()
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? 'Update task' : 'Create task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              type='text'
              placeholder='Message'
              defaultValue={edit ? edit.message : ''}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type='date'
              placeholder='Date'
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Select
              options={optionsPriority}
              placeholder='Select Priority'
              onChange={(val) => {
                setPriority(val.value)
              }}
              isClearable={true}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Assigned to</Form.Label>
            <Select
              options={optionsUser}
              placeholder='Assigned to'
              components={{ Option: IconOption }}
              onChange={(val) => {
                setAssignedTo(val.value)
              }}
              isClearable={true}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary' onClick={edit ? updateTask : createTask}>
          {edit ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTaskModal
