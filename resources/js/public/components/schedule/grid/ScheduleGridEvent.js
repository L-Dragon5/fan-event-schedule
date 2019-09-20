import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import M from 'materialize-css'
import $ from 'jquery'

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

  componentDidMount () {
    window.addEventListener('DOMContentLoaded', this.handleInit)
    if (document.readyState !== 'loading') {
      this.handleInit()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.handleInit)
    $('.material-tooltip').remove()
  }

  handleInit () {
    M.Tooltip.init($('.tooltipped'))
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
    const ratio = duration / 60
    const itemHeight = ((this.defaultBlockHeight * ratio) + (3 * Math.floor(ratio - 1)))

    // Get item veritcal location based on start time
    const eventOffsetDiff = moment.duration(moment(this.event.time_start, 'HH:mm:ss').diff(moment(this.eventStartTime, 'HH:mm:ss')))
    const differenceStartToEvent = eventOffsetDiff.asHours()
    const startLoc = ((this.defaultBlockHeight * differenceStartToEvent) + (3 * (differenceStartToEvent + 1)))

    const itemStyle = {
      position: 'absolute',
      height: itemHeight + 'px',
      width: '150px',
      top: startLoc + 'px'
    }

    const timeRange = '' + moment(this.event.time_start, 'HH:mm:ss').format('hh:mmA') + ' - ' + moment(this.event.time_end, 'HH:mm:ss').format('hh:mmA')

    return (
      <div
        onClick={this.handleClick}
        style={itemStyle}
        className='schedule__event tooltipped'
        data-position='top'
        data-tooltip={timeRange}>
        <div className='schedule__event__title'>
          <span>{this.event.title}</span>
        </div>
      </div>
    )
  }
}

export default ScheduleGridEvent
