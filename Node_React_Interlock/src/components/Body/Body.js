import React, { Component } from 'react'
import '../css/Body.css'
import axios from 'axios'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      id: 0,
    }
    this.Gettitles = this.Gettitles.bind(this)
    this.SendPostdata = this.SendPostdata.bind(this)
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
  SendPostdata(_data, _url) {
    axios({
      method: 'post',
      url: _url,
      data: {
        id: _data,
      },
    })
  }
  render() {
    if (this.props.topics != false) {
      return (
        <div className="body-container">
          <div className="body-left">{this.Gettitles()}</div>
          <div className="body-right">
            <div className="body-title">
              <div className="body-title-left">{this.props.title}</div>
              <div className="body-title-right">
                <a
                  href="#"
                  onClick={function (e) {
                    e.preventDefault()
                    this.props.onChangeMode('update')
                  }.bind(this)}
                >
                  update
                </a>
                <button
                  onClick={function (e) {
                    e.preventDefault()
                    this.SendPostdata(
                      this.props.id,
                      'http://localhost:3001/delete_process'
                    )
                    // TODO : 임의로 0을 넣어놓음
                    this.props.onChangePage(0)
                  }.bind(this)}
                >
                  delete
                </button>
              </div>
            </div>
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
