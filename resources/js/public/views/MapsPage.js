import axios from 'axios'
import React, { Component } from 'react'
import $ from 'jquery'
import M from 'materialize-css'

class MapsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      curMap: '',
      maps: []
    }

    this.token = props.token

    this.handleInit = this.handleInit.bind(this)
    this.loadMap = this.loadMap.bind(this)
  }

  componentDidMount () {
    axios.get('/api/maps').then(response => {
      if (response.data != null) {
        this.setState({
          maps: response.data
        })

        this.handleInit()
      }
    })
  }

  handleInit () {
    M.FormSelect.init($('select'))
  }

  loadMap (e) {
    const id = e.target.value
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

  render () {
    const maps = this.state.maps
    const curMap = this.state.curMap

    return (
      <div style={{ marginTop: '1rem' }}>
        <div className='row'>
          <div className='input-field col s12'>
            { this.state && maps &&
              <div>
                <select defaultValue='' onChange={this.loadMap}>
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
                <img src={curMap} className='responsive-img' />
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
          <div className='fixed-action-btn'>
            <a className='btn-floating btn-large red'>
              <i className='large material-icons'>mode_edit</i>
            </a>
          </div>
        }
      </div>
    )
  }
}

export default MapsPage
