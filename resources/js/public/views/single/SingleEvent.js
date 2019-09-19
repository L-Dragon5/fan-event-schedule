import axios from 'axios'
import React, { Component } from 'react'
import moment from 'moment'

class SingleEvent extends Component {
  constructor (props) {
    super(props)

    this.id = props.eventId
  }

  componentDidMount () {
    axios.get('/api/event/' + this.id).then(response => {
      if (response.data != null) {
        this.setState({
          event: response.data
        })
      }
    })
  }

  render () {
    if (this.state && this.state.event) {
      return (
        <div>
          <h2 className='event__title center-align'>{this.state.event.title}</h2>
          <div className='event__time-and-date center-align'>
            <span className='event__date'>
              {moment(this.state.event.date).format('dddd, MMMM Do, YYYY')}
            </span>
            <span className='event__time'>
              {moment(this.state.event.time_start, 'HH:mm:ss').format('hh:mmA')}
              &nbsp;-&nbsp;
              {moment(this.state.event.time_end, 'HH:mm:ss').format('hh:mmA')}
            </span>
          </div>
          <div className='event__location center-align'><strong>Location:</strong> {this.state.event.location}</div>
          <div className='divider' />
          <p className='event__description responsive-text'>{this.state.event.description}</p>

          {/* this.state.event.event_type_names */}
        </div>
      )
    } else {
      return (<div />)
    }
  }
}

export default SingleEvent
