import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import M from 'materialize-css'

import RichTextEditor from '../RichTextEditor'

class EventAddForm extends Component {
  constructor (props) {
    super(props)

    this.event = props.event
    this.token = props.token

    this.state = {
      locations: [],
      description: '<p></p>'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveDescription = this.saveDescription.bind(this)
  }

  componentDidMount () {
    axios.get('/api/locations').then(response => {
      this.setState({
        locations: response.data
      })
      this.handleInit()
    })
  }

  handleInit () {
    M.FormSelect.init($('select'))
  }

  handleSubmit (e) {
    e.preventDefault()
    $('.modal-errors').html('').hide()
    $('#modal-loader').show()
    $('#modal-submit').hide()

    const formData = new FormData(e.target)

    const timeStart = formData.get('time_start')
    const timeEnd = formData.get('time_end')
    if (timeStart.length === 5) {
      formData.set('time_start', timeStart + ':00')
    }

    if (timeEnd.length === 5) {
      formData.set('time_end', timeEnd + ':00')
    }
    formData.append('description', this.state.description)

    axios.post('/api/event/create', formData, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
        'content-type': 'multipart/form-data'
      }
    }).then((response) => {
      if (response.status === 200) {
        M.toast({ html: response.data.message })
        $('#modal-close').trigger('click')
        this.props.unmount()
      }
    }).catch((error) => {
      if (error.response) {
        var html = ''
        for (const [key, value] of Object.entries(error.response.data.message)) {
          html += key + ': ' + value + '<br>'
        }
        $('.modal-errors').html(html).show()
      }
    }).then(() => {
      $('#modal-loader').hide()
      $('#modal-submit').show()
    })
  }

  saveDescription (data) {
    const obj = JSON.parse(data)
    if (obj.content) {
      this.setState({
        description: obj.content
      })
    }
  }

  render () {
    const locations = this.state.locations

    return (
      <div className='row'>
        <form className='col s12' onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='modal-errors col s12' />

            <div className='input-field col s12 m6'>
              <input id='title' type='text' name='title' className='validate' required />
              <label htmlFor='title'>Title</label>
            </div>
            <div className='input-field col s12 m6'>
              { this.state && locations &&
                <div>
                  <select id='location_id' name='location_id' defaultValue='' required>
                    <option value='' disabled>Choose a Location</option>
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
                  <label htmlFor='location_id'>Location</label>
                </div>
              }
            </div>

            <div className='input-field col s12 m4'>
              <input id='date' type='date' name='date' className='validate' required />
              <label htmlFor='date'>Date</label>
            </div>
            <div className='input-field col s12 m4'>
              <input id='time_start' type='time' name='time_start' className='validate' required />
              <label htmlFor='time_start'>Start Time</label>
            </div>
            <div className='input-field col s12 m4'>
              <input id='time_end' type='time' name='time_end' className='validate' required />
              <label htmlFor='time_end'>End Time</label>
            </div>

            <div className='input-field col s12'>
              <RichTextEditor saveData={this.saveDescription} content={this.state.description} />
            </div>

            <div className='right-align'>
              <button id='modal-submit' type='submit' className='waves-effect waves-green btn'>Add</button>
              <div id='modal-loader' style={{ display: 'none' }} className='preloader-wrapper small active'><div className='spinner-layer spinner-green-only'><div className='circle-clipper left'><div className='circle'></div></div><div className='gap-patch'><div className='circle'></div></div><div className='circle-clipper right'><div className='circle'></div></div></div></div>
              <button id='modal-close' type='button' className='modal-close' style={{ display: 'none' }} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EventAddForm
