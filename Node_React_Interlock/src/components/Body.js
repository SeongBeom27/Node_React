import React, { Component } from 'react'
import './Body.css'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      id: 0,
    }
    this.Gettitles = this.Gettitles.bind(this)
  }
  Gettitles() {
    return this.props.topics.map(topic => (
      <button
        //onClick={this.titleClick.bind(this, topic.title)}
        value={topic.id}
        onClick={function (e) {
          this.props.onChangePage(e.target.value)
        }.bind(this)}
      >
        {topic.title}
      </button>
    ))
  }
  render() {
    if (this.props.topics != false) {
      return (
        <div className="body-container">
          <div className="body-left">{this.Gettitles()}</div>
          <div className="body-right">
            <div className="body-title">{this.props.title}</div>
            <div className="body-description">{this.props.desc}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="body-container">
          <div className="body-left">글 목록</div>
          <div className="body-right">
            <div className="body-title"></div>
            <div className="body-description">is Loading . . .</div>
          </div>
        </div>
      )
    }
  }
}

export default Body
