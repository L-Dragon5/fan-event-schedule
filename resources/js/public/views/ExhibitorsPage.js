import axios from 'axios'
import React, { Component } from 'react'
import ExternalLink from '../components/ExternalLink'
import $ from 'jquery'
import M from 'materialize-css'

class ExhibitorsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      exhibitors: []
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    axios.get('/api/exhibitors').then(response => {
      if (response.data != null) {
        this.setState({
          exhibitors: response.data
        })
      }
    })
  }

  handleEdit (exhibitor) {
    console.log(exhibitor.id)
    console.log(exhibitor.name)
    console.log(exhibitor.url)
    console.log(exhibitor.category)
  }

  handleDelete (exhibitor) {
    console.log(exhibitor.id)
  }

  render () {
    const exhibitors = this.state.exhibitors

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
                            <div className='right'>
                              <button type='button' className='btn-small green' style={{ position: 'relative', top: '-6px' }} onClick={(e) => { e.preventDefault(); this.handleEdit(exhibitor) }}>
                                <i className='material-icons'>mode_edit</i>
                              </button>
                              <button type='button' className='btn-small red' style={{ position: 'relative', top: '-6px' }} onClick={(e) => { e.preventDefault(); this.handleDelete(exhibitor) }}>
                                <i className='material-icons'>delete</i>
                              </button>
                            </div>
                          </ExternalLink>
                        </li>
                      )
                    } else {
                      return (
                        <li key={exhibitor.id} className='collection-item'>
                          <span>{exhibitor.name}</span>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            )
          })
        }
      </div>
    )
  }
}

export default ExhibitorsPage
