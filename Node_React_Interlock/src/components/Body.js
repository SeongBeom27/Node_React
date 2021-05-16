import React, { Component } from 'react'
import './Body.css'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      topics: null,
      id: 0,
    }
    this.titleClick = this.titleClick.bind(this)
    this.Gettitle = this.Gettitle.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3001/topic')
      .then(res => res.json())
      .then(res =>
        this.setState({
          topics: res.topics,
          isLoading: true,
        })
      )
  }
  titleClick(title) {
    var i
    var _topics = Array.from(this.state.topics)
    for (i = 0; i < _topics.length; i++) {
      if (_topics[i].title === title) {
        this.setState({
          id: i,
        })
        break
      }
    }
  }
  Gettitle() {
    var i
    var titles = []
    var _topics = Array.from(this.state.topics)
    for (i = 0; i < _topics.length; i++) {
      titles.push(_topics[i].title)
    }
    return titles.map(title => (
      <a href="#" onClick={this.titleClick.bind(this, title)}>
        {title}
      </a>
    ))
  }
  render() {
    if (this.state.isLoading != false) {
      return (
        <div className="body-container">
          <div className="body-left">{this.Gettitle()}</div>
          <div className="body-right">
            <div className="body-title">
              {this.state.topics[this.state.id].title}
            </div>
            <div className="body-description">
              {this.state.topics[this.state.id].description}
            </div>
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
