import axios from 'axios'
import React, { Component } from 'react'
import $ from 'jquery'
import M from 'materialize-css'

import Modal from '../components/Modal'
import GuestAddForm from '../components/forms/GuestAddForm'

class GuestsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      guests: [],
      renderForm: true
    }

    this.token = props.token

    this.handleFormUnmount = this.handleFormUnmount.bind(this)
    this.getGuestPageData = this.getGuestPageData.bind(this)
  }

  componentDidMount () {
    this.getGuestPageData()

    window.addEventListener('DOMContentLoaded', this.handleInit)
    if (document.readyState !== 'loading') {
      this.handleInit()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.handleInit)
  }

  handleInit () {
    M.Modal.init($('.modal'))
    M.FloatingActionButton.init($('.fixed-action-btn'))
  }

  getGuestPageData () {
    axios.get('/api/guests').then(response => {
      if (response.data != null) {
        this.setState({
          guests: response.data,
          renderForm: true
        })
      }
    })
  }

  handleFormUnmount () {
    this.setState({
      renderForm: false
    })

    this.getGuestPageData()
  }

  render () {
    return (
      <div>
        <h2 className='page-title'>Guests</h2>
        { this.state && this.state.guests &&
          Object.entries(this.state.guests).map((k, index) => {
            const category = k[0]
            const list = k[1]

            return (
              <ul key={index} className='collection with-header' style={{ marginBottom: '3.125rem' }}>
                <li key={category} className='collection-header'><h5>{category}</h5></li>
                {
                  Object.entries(list).map((k, index) => {
                    const guest = k[1]

                    return (
                      <li key={guest.id} className='collection-item guests__item'>
                        <a href={'/#/guest/' + guest.id} className='guests__link'>{guest.name}</a>
                      </li>
                    )
                  })
                }
              </ul>
            )
          })
        }

        { this.token &&
          <div>
            <div id='guest-add-button' data-target='guestPageModal' className='fixed-action-btn modal-trigger'>
              <a className='btn-floating btn-large red'>
                <i className='large material-icons'>add</i>
              </a>
            </div>

            <Modal id='guestPageModal'>
              { this.state.renderForm ? <GuestAddForm token={this.token} unmount={this.handleFormUnmount} /> : null }
            </Modal>
          </div>
        }
      </div>
    )
  }
}

export default GuestsPage
