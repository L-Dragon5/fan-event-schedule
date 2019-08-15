import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

class ScheduleGridEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      toSingle: false
    }

    this.event = props.event
    this.eventStartTime = props.eventStartTime
    this.defaultBlockHeight = props.defaultBlockHeight

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      toSingle: true
    })
  }

  render () {
    if (this.state.toSingle === true) {
      const url = '/event/' + this.event.id
      return <Redirect push to={url} />
    }

    // Get item height based on duration
    const eventTimeDiff = moment.duration(moment(this.event.time_end, 'HH:mm:ss').diff(moment(this.event.time_start, 'HH:mm:ss')))
    const duration = eventTimeDiff.asMinutes()
    const itemHeight = this.defaultBlockHeight * (duration / 60)

    // Get item veritcal location based on start time
    const eventOffsetDiff = moment.duration(moment(this.event.time_start, 'HH:mm:ss').diff(moment(this.eventStartTime, 'HH:mm:ss')))
    const differenceStartToEvent = eventOffsetDiff.asHours()
    const startLoc = ((this.defaultBlockHeight * differenceStartToEvent) - (differenceStartToEvent * 2)) + 3

    const itemStyle = {
      position: 'absolute',
      height: itemHeight + 'px',
      width: '150px',
      top: startLoc + 'px'
    }

    return (
      <div
        onClick={this.handleClick}
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
