import React, { Component } from 'react'
import M from 'materialize-css'
import $ from 'jquery'

import ScheduleGrid from '../components/schedule/grid/ScheduleGrid'
import ScheduleListByTime from '../components/schedule/listbytime/ScheduleListByTime'
import ScheduleSingle from '../components/schedule/single/ScheduleSingle'

class SchedulePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      scheduleStyle: (localStorage.getItem('scheduleStyle') !== null) ? localStorage.getItem('scheduleStyle') : 'grid'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      scheduleStyle: e.target.value
    })

    localStorage.setItem('scheduleStyle', e.target.value)
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
  }

  render () {
    let schedule = null
    if (this.state.scheduleStyle === 'listByTime') {
      schedule = <ScheduleListByTime />
    } else if (this.state.scheduleStyle === 'single') {
      schedule = <ScheduleSingle />
    } else {
      schedule = <ScheduleGrid />
    }

    return (
      <div className='schedule-page'>
        <div className='row'>
          <h2 className='col s12 m8'>Schedule</h2>
          <div className='input-field col s12 m4'>
            <select value={this.state.scheduleStyle} onChange={this.handleChange}>
              <option value='grid'>Grid</option>
              <option value='listByTime'>List by Time</option>
              <option value='single'>Single Location</option>
            </select>
            <label>Schedule Layout</label>
          </div>
        </div>
        <div className='row'>
          {schedule}
        </div>
      </div>
    )
  }
}
export default SchedulePage
