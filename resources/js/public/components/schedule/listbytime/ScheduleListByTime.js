import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

class ScheduleListByTime extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schedule: [],
      toSingle: false,
      eventId: null
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    this.setState({
      toSingle: true,
      eventId: id
    })
  }

  componentDidMount () {
    // Get Event Start Time from DB
    axios.get('/api/setting/event_start_time').then(response => {
      if (response.data != null) {
        this.setState({
          eventStartTime: response.data
        })
      }
    })

    // Get all events for schedule from DB
    axios.get('/api/schedule/byTime').then(response => {
      this.setState({
        schedule: response.data
      })
    })
  }

  render () {
    if (this.state.toSingle === true) {
      const url = '/event/' + this.state.eventId
      return <Redirect push to={url} />
    }

    const schedule = this.state.schedule
    return (
      <div>
        <ul className='collection schedule-list'>
          { (this.state && schedule)
            ? (Object.entries(schedule).map((k, index) => {
              const event = k[1]
              return (
                <li className='collection-item schedule-list__item' key={index} onClick={() => this.handleClick(event.id)}>
                  <span className='schedule-list__item__title'>{event.title}</span>
                  <span className='schedule-list__item__time'>
                    {moment(event.time_start, 'HH:mm:ss').format('hh:mmA')} - {moment(event.time_end, 'HH:mm:ss').format('hh:mmA')}
                  </span>
                </li>
              )
            })) : (
              <div className='preloader-wrapper big active'>
                <div className='spinner-layer spinner-blue-only'>
                  <div className='circle-clipper left'>
                    <div className='circle' />
                  </div><div className='gap-patch'>
                    <div className='circle' />
                  </div><div className='circle-clipper right'>
                    <div className='circle' />
                  </div>
                </div>
              </div>
            )
          }
        </ul>
      </div>
    )
  }
}

export default ScheduleListByTime
