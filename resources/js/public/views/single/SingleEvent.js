import axios from 'axios'
import React, { Component } from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css'
import $ from 'jquery'

import Modal from '../../components/Modal'
import EventEditForm from '../../components/forms/EventEditForm'
class SingleEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      event: [],
      toSchedule: false,
      renderForm: false
    }

    this.token = props.token
    this.id = props.eventId

    this.handleDelete = this.handleDelete.bind(this)
    this.handleFormUnmount = this.handleFormUnmount.bind(this)
  }

  componentDidMount () {
    this.getEventData()

    window.addEventListener('DOMContentLoaded', this.handleInit)
    if (document.readyState !== 'loading') {
      this.handleInit()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.handleInit)
  }

  componentDidUpdate () {
    this.handleInit()
  }

  handleInit () {
    M.FloatingActionButton.init($('.fixed-action-btn'))
    M.Modal.init($('.modal'))
  }

  handleDelete (e) {
    e.preventDefault()

    const answer = confirm('Are you sure you want to delete?')
    if (answer) {
      axios.get('/api/event/destroy/' + this.id, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.token,
          'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 200) {
          this.setState({
            toSchedule: true
          })
        }
      }).catch((error) => {
        if (error.response) {
          console.error(error.response.data.message)
        }
      })
    }
  }

  getEventData () {
    axios.get('/api/event/' + this.id).then(response => {
      if (response.data != null) {
        this.setState({
          event: response.data,
          renderForm: true
        })
      }
    }).catch((error) => {
      if (error.response) {
        this.setState({
          event: error.response.data
        })
      }
    })
  }

  handleFormUnmount () {
    this.setState({
      renderForm: false
    })

    this.getEventData()
  }

  render () {
    if (this.state.toSchedule === true) {
      const url = '/schedule/'
      return <Redirect push to={url} />
    }

    const event = this.state.event

    if (event && event.title) {
      return (
        <div>
          <h2 className='event__title center-align'>{event.title}</h2>
          <div className='event__time-and-date center-align'>
            <span className='event__date'>
              {moment(event.date).format('dddd, MMMM Do, YYYY')}
            </span>
            <span className='event__time'>
              {moment(event.time_start, 'HH:mm:ss').format('hh:mmA')}
              &nbsp;-&nbsp;
              {moment(event.time_end, 'HH:mm:ss').format('hh:mmA')}
            </span>
          </div>
          <div className='event__location center-align'><strong>Location:</strong> {event.location}</div>
          <div className='divider' />
          { event.is_cancelled
            ? <div className='center-align' style={{ color: 'red' }}><h2>EVENT CANCELLED</h2></div>
            : '' }
          <div className='event__description flow-text' dangerouslySetInnerHTML={{ __html: event.description }} />

          {/* event.event_type_names */}

          { this.token &&
            <div>
              <div>
                <div className='fixed-action-btn'>
                  <a className='btn-floating btn-large red'>
                    <i className='large material-icons'>menu</i>
                  </a>
                  <ul>
                    <li><a className='btn-floating green modal-trigger' data-target='eventSingleModal' onClick={this.handleEdit}><i className='material-icons'>mode_edit</i></a></li>
                    <li><a className='btn-floating red' onClick={this.handleDelete}><i className='material-icons'>delete</i></a></li>
                  </ul>
                </div>
              </div>

              <Modal id='eventSingleModal'>
                { this.state.renderForm ? <EventEditForm token={this.token} event={this.state.event} unmount={this.handleFormUnmount} /> : null }
              </Modal>
            </div>
          }
        </div>
      )
    } else {
      return (<div>{event.message}</div>)
    }
  }
}

export default SingleEvent
