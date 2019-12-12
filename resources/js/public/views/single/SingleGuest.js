import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ExternalLink from '../../components/ExternalLink'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import M from 'materialize-css'
import $ from 'jquery'

import Modal from '../../components/Modal'
import GuestEditForm from '../../components/forms/GuestEditForm'

library.add(fab)

class SingleGuest extends Component {
  constructor (props) {
    super(props)

    this.state = {
      guest: [],
      toGuests: false,
      renderForm: false
    }

    this.token = props.token
    this.id = props.guestId

    this.handleDelete = this.handleDelete.bind(this)
    this.handleFormUnmount = this.handleFormUnmount.bind(this)
  }

  componentDidMount () {
    this.getGuestData()

    window.addEventListener('DOMContentLoaded', this.handleInit)
    if (document.readyState !== 'loading') {
      this.handleInit()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.handleInit)
  }

  componentDidUpdate () {
    this.handleInit()
  }

  handleInit () {
    M.FloatingActionButton.init($('.fixed-action-btn'))
    M.Modal.init($('.modal'))
  }

  handleDelete (e) {
    e.preventDefault()

    const answer = confirm('Are you sure you want to delete?')
    if (answer) {
      axios.get('/api/guest/destroy/' + this.id, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.token,
          'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 200) {
          this.setState({
            toGuests: true
          })
        }
      }).catch((error) => {
        if (error.response) {
          console.error(error.response.data.message)
        }
      })
    }
  }

  getGuestData () {
    axios.get('/api/guest/' + this.id).then(response => {
      if (response.data != null) {
        this.setState({
          guest: response.data,
          renderForm: true
        })
      }
    }).catch((error) => {
      if (error.response) {
        this.setState({
          guest: error.response.data
        })
      }
    })
  }

  handleFormUnmount () {
    this.setState({
      renderForm: false
    })

    this.getGuestData()
  }

  render () {
    if (this.state.toGuests === true) {
      const url = '/guests/'
      return <Redirect push to={url} />
    }

    const guest = this.state.guest

    if (guest && guest.name) {
      return (
        <div>
          <h2 className='guest__name center-align'>{guest.name}</h2>
          <div className='guest__category center-align'><strong>Category:</strong> {guest.category}</div>
          <div className='guest__social-media center-align'>
            { guest.social_fb &&
              <ExternalLink href={guest.social_fb} className='external-link__icon'>
                <FontAwesomeIcon icon={['fab', 'facebook-square']} />
              </ExternalLink>
            }
            { guest.social_tw &&
              <ExternalLink href={guest.social_tw} className='external-link__icon'>
                <FontAwesomeIcon icon={['fab', 'twitter-square']} />
              </ExternalLink>
            }
            { guest.social_ig &&
              <ExternalLink href={guest.social_ig} className='external-link__icon'>
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </ExternalLink>
            }
          </div>
          <div className='divider' />
          <div className='guest__description flow-text' dangerouslySetInnerHTML={{ __html: guest.description }} />

          { this.token &&
            <div>
              <div>
                <div className='fixed-action-btn'>
                  <a className='btn-floating btn-large red'>
                    <i className='large material-icons'>menu</i>
                  </a>
                  <ul>
                    <li><a className='btn-floating green modal-trigger' data-target='guestSingleModal' onClick={this.handleEdit}><i className='material-icons'>mode_edit</i></a></li>
                    <li><a className='btn-floating red' onClick={this.handleDelete}><i className='material-icons'>delete</i></a></li>
                  </ul>
                </div>
              </div>

              <Modal id='guestSingleModal'>
                { this.state.renderForm ? <GuestEditForm token={this.token} guest={this.state.guest} unmount={this.handleFormUnmount} /> : null }
              </Modal>
            </div>
          }
        </div>
      )
    } else {
      return (<div>{guest.message}</div>)
    }
  }
}

export default SingleGuest
