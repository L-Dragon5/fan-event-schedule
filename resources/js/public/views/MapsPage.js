import axios from 'axios'
import React, { Component } from 'react'
import $ from 'jquery'
import M from 'materialize-css'

import Modal from '../components/Modal'
import MapAddForm from '../components/forms/MapAddForm'
import MapEditForm from '../components/forms/MapEditForm'

class MapsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      curMap: '',
      maps: [],
      modalForm: '',
      renderForm: true
    }

    this.token = props.token

    this.handleInit = this.handleInit.bind(this)
    this.loadMap = this.loadMap.bind(this)

    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFormUnmount = this.handleFormUnmount.bind(this)
  }

  componentDidMount () {
    this.getMapData()
  }

  getMapData () {
    axios.get('/api/maps').then(response => {
      if (response.data != null) {
        this.setState({
          maps: response.data,
          renderForm: true
        })

        this.handleInit()
      }
    })
  }

  loadMap (e) {
    const id = (e.hasOwnProperty('target') && e.target.value !== undefined) ? e.target.value : e
    this.setState({
      curMap: 'loading'
    })

    axios.get('/api/map/' + id).then(response => {
      if (response.data != null) {
        this.setState({
          curMap: response.data
        })
      }
    })
  }

  handleInit () {
    M.FormSelect.init($('select'))
    M.FloatingActionButton.init($('.fixed-action-btn'))

    const selectVal = $('#map-select').val()
    if (selectVal !== null) {
      this.loadMap(selectVal)
    }
  }

  handleAdd () {
    this.setState({
      modalForm: <MapAddForm token={this.token} unmount={this.handleFormUnmount} />
    })
  }

  handleEdit () {
    const map = this.state.curMap

    if (map === '' || map === 'loading') {
      alert('No map selected to edit')
    } else {
      this.setState({
        modalForm: <MapEditForm key={map.id} token={this.token} map={map} unmount={this.handleFormUnmount} />
      })
    }
  }

  handleDelete () {
    const map = this.state.curMap

    if (map === '' || map === 'loading') {
      alert('No map selected to delete')
    } else {
      const answer = confirm('Are you sure you want to delete this map?')
      if (answer) {
        axios.get('/api/map/destroy/' + map.id, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.token,
            'content-type': 'multipart/form-data'
          }
        }).then((response) => {
          if (response.status === 200) {
            M.toast({ html: response.data.message })
            this.getMapData()
          }
        }).catch((error) => {
          if (error.response) {
            console.error(error.response.data.message)
          }
        })
      }
    }
  }

  handleFormUnmount () {
    this.setState({
      renderForm: false
    })

    this.getMapData()
  }

  render () {
    const maps = this.state.maps
    const curMap = this.state.curMap
    const modalForm = this.state.modalForm

    return (
      <div style={{ marginTop: '1rem' }}>
        <div className='row'>
          <div className='input-field col s12'>
            { this.state && maps &&
              <div>
                <select id='map-select' defaultValue='' onChange={this.loadMap}>
                  <option value='' disabled>Select a map</option>
                  {
                    Object.entries(maps).map((k, index) => {
                      const map = k[1]
                      const id = map.id
                      const title = map.title

                      return (
                        <option key={id} value={id}>{title}</option>
                      )
                    })
                  }
                </select>
                <label>Map Select</label>
              </div>
            }
          </div>
          <div className='col s12'>
            { (this.state && curMap !== 'loading')
              ? (
                <img src={curMap.image} className='responsive-img' />
              ) : (
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
          </div>
        </div>

        { this.token &&
          <div>
            <div className='fixed-action-btn'>
              <a className='btn-floating btn-large red'>
                <i className='large material-icons'>menu</i>
              </a>
              <ul>
                <li><a className='btn-floating yellow modal-trigger' data-target='mapPageModal' onClick={this.handleAdd}><i className='material-icons'>add</i></a></li>
                <li><a className='btn-floating green modal-trigger' data-target='mapPageModal' onClick={this.handleEdit}><i className='material-icons'>mode_edit</i></a></li>
                <li><a className='btn-floating red' onClick={this.handleDelete}><i className='material-icons'>delete</i></a></li>
              </ul>
            </div>

            <Modal id='mapPageModal'>
              { this.state.renderForm ? modalForm : null }
            </Modal>
          </div>
        }
      </div>
    )
  }
}

export default MapsPage
