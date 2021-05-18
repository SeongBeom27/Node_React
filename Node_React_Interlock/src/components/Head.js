import React, { Component } from 'react'
import './Head.css'

class Head extends Component {
  render() {
    return (
      <div className="head-container">
        <div className="start">home button</div>
        <div className="middle">search</div>
        <div className="end">
          <div>login</div>
          <a href="#">create</a>
        </div>
      </div>
    )
  }
}

export default Head
