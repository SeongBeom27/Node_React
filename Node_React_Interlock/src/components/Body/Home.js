import React, { Component } from 'react'
import '../css/Home.css'
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props)

    this.Gettitles = this.Gettitles.bind(this)
  }
  Gettitles() {
    return this.props.topics.map(topic => (
      <button
        //onClick={this.titleClick.bind(this, topic.title)}
        value={topic.id}
        onClick={function (e) {
          e.preventDefault()
          this.props.onChangePage(e.target.value)
        }.bind(this)}
      >
        {topic.title}
      </button>
    ))
  }
  render() {
    return (
      <div className="body-container">
        <div className="body-left">{this.Gettitles()}</div>
        <div className="body-right">
          <div className="body-create">Homepage</div>
        </div>
      </div>
    )
  }
}

export default Home
