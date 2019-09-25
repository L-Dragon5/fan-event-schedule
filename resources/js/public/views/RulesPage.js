import axios from 'axios'
import M from 'materialize-css'
import $ from 'jquery'
import React, { Component } from 'react'

import Modal from '../components/Modal'
import RuleAddForm from '../components/forms/RuleAddForm'
import RuleEditForm from '../components/forms/RuleEditForm'
class RulesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      rules: [],
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
    this.getRuleData()
  }

  getRuleData () {
    axios.get('/api/rules').then(response => {
      if (response.data != null) {
        this.setState({
          rules: response.data,
          renderForm: true
        })
      }
    })

    this.handleInit()
  }

  handleInit () {
    M.Collapsible.init($('.collapsible'))
    M.Modal.init($('.modal'))
    M.FloatingActionButton.init($('.fixed-action-btn'))
  }

  handleAdd () {
    this.setState({
      modalForm: <RuleAddForm token={this.token} unmount={this.handleFormUnmount} />
    })
  }

  handleEdit (rule) {
    this.setState({
      modalForm: <RuleEditForm key={rule.id} token={this.token} rule={rule} unmount={this.handleFormUnmount} />
    })
  }

  handleDelete (rule) {
    const answer = confirm('Are you sure you want to delete this rule?')
    if (answer) {
      axios.get('/api/rule/destroy/' + rule.id, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.token,
          'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 200) {
          M.toast({ html: response.data.message })
          this.getRuleData()
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

    this.getRuleData()
  }

  render () {
    const rules = this.state.rules
    const modalForm = this.state.modalForm

    return (
      <div>
        <h2 className='page-title'>Rules & Policies</h2>
        <ul className='collapsible'>
          { rules &&
            Object.entries(rules).map((entry, index) => {
              const rule = entry[1]
              return (
                <li key={rule.id}>
                  <div className='collapsible-header'>
                    <span style={{ flex: '1 0 auto', fontSize: '1.4rem' }}>{rule.title}</span>
                    { this.token &&
                      <div className='collapsible-action-buttons'>
                        <button type='button' className='btn-small green modal-trigger' data-target='rulePageModal' onClick={(e) => { e.preventDefault(); this.handleEdit(rule) }}>
                          <i className='material-icons'>mode_edit</i>
                        </button>
                        <button type='button' className='btn-small red' onClick={(e) => { e.preventDefault(); this.handleDelete(rule) }}>
                          <i className='material-icons'>delete</i>
                        </button>
                      </div>
                    }
                  </div>
                  <div className='collapsible-body flow-text' dangerouslySetInnerHTML={{ __html: rule.description }} />
                </li>
              )
            })
          }
        </ul>

        { this.token &&
          <div>
            <div data-target='rulePageModal' className='fixed-action-btn modal-trigger' onClick={this.handleAdd}>
              <a className='btn-floating btn-large red'>
                <i className='large material-icons'>add</i>
              </a>
            </div>

            <Modal id='rulePageModal'>
              { this.state.renderForm ? modalForm : null }
            </Modal>
          </div>
        }
      </div>
    )
  }
}

export default RulesPage
