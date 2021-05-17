import React, { Component } from 'react'
import './Body.css'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      id: 0,
    }
    this.titleClick = this.titleClick.bind(this)
    this.Gettitle = this.Gettitle.bind(this)
  }
  titleClick(title) {
    var i
    var _topics = Array.from(this.props.topics)
    for (i = 0; i < _topics.length; i++) {
      if (_topics[i].title === title) {
        // 상위 컴포넌트에 index를 넘겨줘야한다.
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
    var _topics = Array.from(this.props.topics)
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
    if (this.props.topics != false) {
      return (
        <div className="body-container">
          <div className="body-left">{this.Gettitle()}</div>
          <div className="body-right">
            <div className="body-title">
              {this.props.topics[this.state.id].title}
            </div>
            <div className="body-description">
              {this.props.topics[this.state.id].description}
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
