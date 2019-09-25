import axios from 'axios'
import React, { Component } from 'react'
import ExternalLink from '../components/ExternalLink'
import $ from 'jquery'
import M from 'materialize-css'

import Modal from '../components/Modal'
import ExhibitorAddForm from '../components/forms/ExhibitorAddForm'
import ExhibitorEditForm from '../components/forms/ExhibitorEditForm'

class ExhibitorsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      exhibitors: [],
      modalForm: '',
      renderForm: true
    }

    this.token = props.token

    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFormUnmount = this.handleFormUnmount.bind(this)
  }

  componentDidMount () {
    this.getExhibitorData()
  }

  getExhibitorData () {
    axios.get('/api/exhibitors').then(response => {
      if (response.data != null) {
        this.setState({
          exhibitors: response.data,
          renderForm: true
        })
      }
    })

    this.handleInit()
  }

  handleInit () {
    M.Modal.init($('.modal'))
    M.FloatingActionButton.init($('.fixed-action-btn'))
  }

  handleAdd () {
    this.setState({
      modalForm: <ExhibitorAddForm token={this.token} unmount={this.handleFormUnmount} />
    })
  }

  handleEdit (exhibitor) {
    this.setState({
      modalForm: <ExhibitorEditForm key={exhibitor.id} token={this.token} exhibitor={exhibitor} unmount={this.handleFormUnmount} />
    })
  }

  handleDelete (exhibitor) {
    const answer = confirm('Are you sure you want to delete this exhibitor?')
    if (answer) {
      axios.get('/api/exhibitor/destroy/' + exhibitor.id, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.token,
          'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 200) {
          M.toast({ html: response.data.message })
          this.getExhibitorData()
        }
      }).catch((error) => {
        if (error.response) {
          console.error(error.response.data.message)
        }
      })
    }
  }

  handleFormUnmount () {
    this.setState({
      renderForm: false
    })

    this.getExhibitorData()
  }

  render () {
    const exhibitors = this.state.exhibitors
    const modalForm = this.state.modalForm

    return (
      <div>
        <h2 className='page-title'>Exhibitors</h2>
        { this.state && exhibitors &&
          Object.entries(exhibitors).map((k, index) => {
            const category = k[0]
            const list = k[1]

            return (
              <ul key={index} className='collection with-header' style={{ marginBottom: '5rem' }}>
                <li key={category} className='collection-header'><h5>{category}</h5></li>
                {
                  Object.entries(list).map((k, index) => {
                    const exhibitor = k[1]

                    if (exhibitor.url != null) {
                      return (
                        <li key={exhibitor.id} className='collection-item'>
                          <ExternalLink href={exhibitor.url}>
                            {exhibitor.name}
                            { this.token &&
                              <div className='right collection-action-buttons'>
                                <button type='button' className='btn-small green modal-trigger' data-target='exhibitorPageModal' onClick={(e) => { e.preventDefault(); this.handleEdit(exhibitor) }}>
                                  <i className='material-icons'>mode_edit</i>
                                </button>
                                <button type='button' className='btn-small red' onClick={(e) => { e.preventDefault(); this.handleDelete(exhibitor) }}>
                                  <i className='material-icons'>delete</i>
                                </button>
                              </div>
                            }
                          </ExternalLink>
                        </li>
                      )
                    } else {
                      return (
                        <li key={exhibitor.id} className='collection-item'>
                          <span>{exhibitor.name}</span>
                          { this.token &&
                            <div className='right collection-action-buttons'>
                              <button type='button' className='btn-small green modal-trigger' data-target='exhibitorPageModal' style={{ position: 'relative', top: '-6px' }} onClick={(e) => { e.preventDefault(); this.handleEdit(exhibitor) }}>
                                <i className='material-icons'>mode_edit</i>
                              </button>
                              <button type='button' className='btn-small red' style={{ position: 'relative', top: '-6px' }} onClick={(e) => { e.preventDefault(); this.handleDelete(exhibitor) }}>
                                <i className='material-icons'>delete</i>
                              </button>
                            </div>
                          }
                        </li>
                      )
                    }
                  })
                }
              </ul>
            )
          })
        }

        { this.token &&
          <div>
            <div data-target='exhibitorPageModal' className='fixed-action-btn modal-trigger' onClick={this.handleAdd}>
              <a className='btn-floating btn-large red'>
                <i className='large material-icons'>add</i>
              </a>
            </div>

            <Modal id='exhibitorPageModal'>
              { this.state.renderForm ? modalForm : null }
            </Modal>
          </div>
        }
      </div>
    )
  }
}

export default ExhibitorsPage
