'use strict'
import React, { Component } from 'react'
import { render } from 'react-dom'
import './home.scss'
class Test extends Component {
  constructor (props) {
    super(props)
    this.state = { algo: 'hola mundo!' }
  }
  render () {
    return (<h1>{this.state.algo}</h1>)
  }
}

render(<Test />, document.querySelector('#app'))
