import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

class AdminMain extends Component {
  render () {
    return (
      <div>
        <h3>Admin Page</h3>
        <div id='summernote' />
      </div>
    )
  }
}

export default AdminMain

if ($('#admin-root').length) {
  ReactDOM.render(<AdminMain />, document.getElementById('admin-root'))
}
