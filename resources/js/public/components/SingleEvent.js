import axios from 'axios'
import React, { Component } from 'react'

class SingleEvent extends Component {
  constructor (props) {
    super(props)

    this.id = props.match.params.eventId
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
          {this.state.event.title}
          {this.state.event.date}
          {this.state.event.time_start}
          {this.state.event.time_end}
          {this.state.event.location}
          {/* this.state.event.event_type_names */}
          {this.description}
        </div>
      )
    } else {
      return (<div />)
    }
  }
}

export default SingleEvent
