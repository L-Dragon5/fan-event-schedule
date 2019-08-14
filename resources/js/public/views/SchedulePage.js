import React, { Component } from 'react'

import Schedule from '../components/Schedule'

class SchedulePage extends Component {
  render () {
    return (
      <div className='schedule-page'>
        <h2>Schedule</h2>
        <Schedule />
      </div>
    )
  }
}
export default SchedulePage
