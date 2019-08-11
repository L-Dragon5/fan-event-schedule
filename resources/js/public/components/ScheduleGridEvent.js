import React, { Component } from 'react'

class ScheduleGridEvent extends Component {
  constructor (props) {
    super(props)

    this.event = props.event
    this.eventStartTime = props.eventStartTime
    this.defaultBlockHeight = props.defaultBlockHeight
  }

  render () {
    // const duration = event.time_start to event.time_end (in minutes)
    const duration = 50
    const itemHeight = this.defaultBlockHeight * (duration / 60)

    // const differenceStartToEvent = event.time_start to this.eventStartTime
    const differenceStartToEvent = 4
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
          {this.event.time_start} - {this.event.time_end}
        </div>
      </div>
    )
  }
}

export default ScheduleGridEvent
