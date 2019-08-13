import React, { Component } from 'react'
import moment from 'moment'

class ScheduleGridEvent extends Component {
  constructor (props) {
    super(props)

    this.event = props.event
    this.eventStartTime = props.eventStartTime
    this.defaultBlockHeight = props.defaultBlockHeight
  }

  render () {
    // Get item height based on duration
    const eventTimeDiff = moment.duration(moment(this.event.time_end, 'HH:mm:ss').diff(moment(this.event.time_start, 'HH:mm:ss')))
    const duration = eventTimeDiff.asMinutes()
    const itemHeight = this.defaultBlockHeight * (duration / 60)

    // Get item veritcal location based on start time
    const eventOffsetDiff = moment.duration(moment(this.event.time_start, 'HH:mm:ss').diff(moment(this.eventStartTime, 'HH:mm:ss')))
    const differenceStartToEvent = eventOffsetDiff.asHours()
    const startLoc = (this.defaultBlockHeight * differenceStartToEvent) - (differenceStartToEvent * 1.5)

    const itemStyle = {
      position: 'absolute',
      height: itemHeight + 'px',
      width: '150px',
      top: startLoc + 'px'
    }

    return (
      <div
        style={itemStyle}
        className='schedule__event'>
        <div className='schedule__event__title'>
          {this.event.title}
        </div>
        <div className='schedule__event__time'>
          {moment(this.event.time_start, 'HH:mm:ss').format('hh:mmA')} - {moment(this.event.time_end, 'HH:mm:ss').format('hh:mmA')}
        </div>
      </div>
    )
  }
}

export default ScheduleGridEvent
