import React, { Component } from 'react'
import ScheduleGridEvent from './ScheduleGridEvent'

class ScheduleGridRoom extends Component {
  constructor (props) {
    super(props)

    this.rooms = props.rooms
    this.eventStartTime = props.eventStartTime
    this.defaultBlockHeight = props.defaultBlockHeight
  }

  render () {
    return (
      <div style={{ position: 'relative' }}>
        {this.rooms.map((event, index) => {
          return (
            <ScheduleGridEvent
              key={event.title}
              event={event}
              eventStartTime={this.eventStartTime}
              defaultBlockHeight={this.defaultBlockHeight}
            />
          )
        })}
      </div>
    )
  }
}

export default ScheduleGridRoom
