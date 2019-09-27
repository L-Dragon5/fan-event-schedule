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
    this.resizeToFit()
  }

  handleClick () {
    this.setState({
      toSingle: true
    })
  }

  resizeToFit () {
    $('div.schedule-grid__event').each((index, element) => {
      const spanElement = $(element).find('div.schedule-grid__event__title span')
      const fontsize = spanElement.css('font-size')

      if (spanElement.height() >= $(element).height()) {
        spanElement.css('font-size', parseFloat(fontsize) - 1)
        this.resizeToFit()
      }
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
      top: startLoc + 'px',
      fontSize: '1.125rem'
    }

    const timeRange = '' + moment(this.event.time_start, 'HH:mm:ss').format('hh:mmA') + ' - ' + moment(this.event.time_end, 'HH:mm:ss').format('hh:mmA')

    return (
      <div
        onClick={this.handleClick}
        style={itemStyle}
        className='schedule-grid__event tooltipped'
        data-position='top'
        data-tooltip={timeRange}>
        <div className='schedule-grid__event__title'>
          <span style={{ textDecoration: (this.event.is_cancelled) ? 'line-through' : 'none' }}>{this.event.title}</span>
        </div>
      </div>
    )
  }
}

export default ScheduleGridEvent
