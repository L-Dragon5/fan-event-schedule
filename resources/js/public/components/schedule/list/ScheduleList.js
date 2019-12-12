import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import M from 'materialize-css'
import $ from 'jquery'
import Helper from '../../Helper'

class ScheduleList extends Component {
  constructor (props) {
    super(props)

    if (Helper.checkSessionStorage()) {
      this.state = {
        schedule: [],
        locations: [],
        toSingle: false,
        eventId: null,
        filterLocation: (sessionStorage.getItem('filterLocation') !== null) ? sessionStorage.getItem('filterLocation') : 'all'
      }
    } else {
      this.state = {
        schedule: [],
        locations: [],
        toSingle: false,
        eventId: null,
        filterLocation: 'all'
      }
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  componentDidMount () {
    // Get all locations from DB
    axios.get('/api/locations').then(response => {
      this.setState({
        locations: response.data
      })
      this.handleInit()
    })

    var url = ''
    if (this.state.filterLocation === 'all') {
      url = 'api/schedule/byTime'
    } else {
      url = 'api/schedule/byTime/' + this.state.filterLocation
    }

    axios.get(url).then(response => {
      this.setState({
        schedule: response.data
      })
    })
  }

  handleInit () {
    M.FormSelect.init($('select'))
  }

  handleClick (id) {
    this.setState({
      toSingle: true,
      eventId: id
    })
  }

  handleLocationChange (e) {
    var url = ''
    if (e.target.value === 'all') {
      url = 'api/schedule/byTime'
    } else {
      url = 'api/schedule/byTime/' + e.target.value
    }

    axios.get(url).then(response => {
      this.setState({
        schedule: response.data
      })
    })

    if (Helper.checkSessionStorage()) {
      sessionStorage.setItem('filterLocation', e.target.value)
    }
  }

  render () {
    if (this.state.toSingle === true) {
      const url = '/event/' + this.state.eventId
      return <Redirect push to={url} />
    }

    const schedule = this.state.schedule
    const locations = this.state.locations

    return (
      <div>
        <div className='input-field col s12'>
          { this.state && locations &&
            <div>
              <select defaultValue={this.state.filterLocation} onChange={this.handleLocationChange}>
                <option value='all'>All</option>
                {
                  Object.entries(locations).map((k, index) => {
                    const location = k[1]
                    const id = location.id
                    const name = location.name

                    return (
                      <option key={id} value={id}>{name}</option>
                    )
                  })
                }
              </select>
              <label>Location</label>
            </div>
          }
        </div>
        <ul className='collection schedule-list'>
          { (this.state && schedule)
            ? (Object.entries(schedule).map((k, index) => {
              const event = k[1]
              return (
                <li className='collection-item schedule-list__item' key={index} onClick={() => this.handleClick(event.id)}>
                  <span className='schedule-list__item__title' style={{ textDecoration: (event.is_cancelled) ? 'line-through' : 'none' }}>{event.title}</span>
                  <span className='schedule-list__item__location' style={{ textDecoration: (event.is_cancelled) ? 'line-through' : 'none' }}>{event.location}</span>
                  <span className='schedule-list__item__time' style={{ textDecoration: (event.is_cancelled) ? 'line-through' : 'none' }}>
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

export default ScheduleList
