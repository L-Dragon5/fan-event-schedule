import React, { Component } from 'react'
import M from 'materialize-css'
import $ from 'jquery'

import ScheduleGrid from '../components/schedule/grid/ScheduleGrid'
import ScheduleList from '../components/schedule/list/ScheduleList'
import Modal from '../components/Modal'
import EventAddForm from '../components/forms/EventAddForm'
import Helper from '../components/Helper'

class SchedulePage extends Component {
  constructor (props) {
    super(props)

    if (Helper.checkLocalStorage()) {
      this.state = {
        scheduleStyle: (localStorage.getItem('scheduleStyle') !== null) ? localStorage.getItem('scheduleStyle') : 'grid',
        renderForm: true
      }
    } else {
      this.state = {
        scheduleStyle: 'grid',
        renderForm: true
      }
    }

    this.token = props.token

    this.handleChange = this.handleChange.bind(this)
    this.handleFormUnmount = this.handleFormUnmount.bind(this)
  }

  handleChange (e) {
    this.setState({
      scheduleStyle: e.target.value
    })

    if (Helper.checkLocalStorage()) {
      localStorage.setItem('scheduleStyle', e.target.value)
    }
  }

  componentDidMount () {
    window.addEventListener('DOMContentLoaded', this.handleInit)
    if (document.readyState !== 'loading') {
      this.handleInit()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.handleInit)
  }

  handleInit () {
    M.FormSelect.init($('select'))
    M.Modal.init($('.modal'))
    M.FloatingActionButton.init($('.fixed-action-btn'))
  }

  handleFormUnmount () {
    this.setState({
      renderForm: false
    })

    this.setState({
      renderForm: true
    })
  }

  render () {
    let schedule = null
    if (this.state.scheduleStyle === 'list') {
      schedule = <ScheduleList />
    } else {
      schedule = <ScheduleGrid />
    }

    return (
      <div className='schedule-page'>
        <div className='row' style={{ marginBottom: 0 }}>
          <h2 className='col s12 m8 page-title'>Schedule</h2>
          <div className='input-field col s12 m4'>
            <select value={this.state.scheduleStyle} onChange={this.handleChange}>
              <option value='grid'>Grid</option>
              <option value='list'>List</option>
            </select>
            <label>Schedule Layout</label>
          </div>
        </div>
        <div className='row'>
          {schedule}
        </div>

        { this.token &&
          <div>
            <div id='event-add-button' data-target='eventPageModal' className='fixed-action-btn modal-trigger'>
              <a className='btn-floating btn-large red'>
                <i className='large material-icons'>add</i>
              </a>
            </div>

            <Modal id='eventPageModal'>
              { this.state.renderForm ? <EventAddForm token={this.token} unmount={this.handleFormUnmount} /> : null }
            </Modal>
          </div>
        }
      </div>
    )
  }
}
export default SchedulePage
