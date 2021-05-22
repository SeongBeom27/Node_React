import React, { Component } from 'react'
import '../css/Foot.css'

class Foot extends Component {
  render() {
    return (
      <div className="foot-container">
        <div className="foot-center">{this.props.name}</div>
      </div>
    )
  }
}

export default Foot
