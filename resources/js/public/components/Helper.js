import React, { Component } from 'react'

class Helper extends Component {
  static checkLocalStorage () {
    const test = 'test'
    try {
      localStorage.setItem(test, test)
      localStorage.removeItem(test)

      console.log('localstorage works')
      return true
    } catch (e) {
      console.log('localstorage does not work')
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
