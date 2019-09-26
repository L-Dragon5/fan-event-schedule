import React, { Component } from 'react'

class Helper extends Component {
  static checkLocalStorage () {
    const test = 'test'
    try {
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  static checkSessionStorage () {
    const test = 'test'
    try {
      sessionStorage.setItem(test, test)
      sessionStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }
}

export default Helper
