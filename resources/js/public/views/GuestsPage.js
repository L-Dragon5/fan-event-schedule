import axios from 'axios'
import React, { Component } from 'react'
import $ from 'jquery'

class GuestsPage extends Component {
  constructor (props) {
    super(props)

    this.token = props.token
  }

  componentDidMount () {
    // Get all guests
    axios.get('/api/guests').then(response => {
      if (response.data != null) {
        this.setState({
          guests: response.data
        })
      }
    })
  }

  render () {
    return (
      <div>
        <h2>Guests</h2>
        { this.state && this.state.guests &&
          Object.entries(this.state.guests).map((k, index) => {
            const category = k[0]
            const list = k[1]

            return (
              <ul key={index} className='collection with-header' style={{ marginBottom: '5rem' }}>
                <li key={category} className='collection-header'><h4>{category}</h4></li>
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

export default GuestsPage
