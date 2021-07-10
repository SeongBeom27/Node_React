import React, { Component } from 'react'
import '../css/Update.css'
import axios from 'axios'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      index: this.props.index,
      title: this.props.topics[this.props.index].title,
      desc: this.props.topics[this.props.index].description,
    }
    this.Gettitles = this.Gettitles.bind(this)
    this.SendPostdata = this.SendPostdata.bind(this)
    this.inputFormHandler = this.inputFormHandler.bind(this)
  }
  inputFormHandler(e) {
    // console.log(e)
    this.setState({
      [e.target.name]: e.target.value,
    })
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
        title: _data.title,
        description: _data.description,
        id: _data.id,
      },
    })
  }
  render() {
    if (this.props.topics != false) {
      return (
        <div className="body-container">
          <div className="body-left">{this.Gettitles()}</div>
          <div className="body-right">
            <div className="body-update">
              <form
                action="/http://localhost:3001/topic/update_process"
                method="post"
                onSubmit={function (e) {
                  // onSubmit의 e.target property는 form data를 담고 있다.
                  // props인 _title, _desc에 아래 e.target.title.value, e.target.desc.value를 넘겨준다.
                  this.props.onSubmit(e.target.title.value, e.target.desc.value)
                  // POST 요청 전송
                  this.SendPostdata(
                    {
                      title: e.target.title.value,
                      description: e.target.desc.value,
                      id: e.target.id.value,
                    },
                    'http://localhost:3001/topic/update_process'
                  )
                }.bind(this)}
              >
                <p>
                  <input type="hidden" name="id" value={this.props.id} />
                </p>
                <p>
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={this.state.title}
                    onChange={this.inputFormHandler}
                  />
                </p>
                <p>
                  <textarea
                    name="desc"
                    placeholder="description"
                    value={this.state.desc}
                    onChange={this.inputFormHandler}
                  ></textarea>
                </p>
                <p>authorSelector</p>
                <input type="submit" />
              </form>
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
            <div className="body-update">is Loading . . .</div>
          </div>
        </div>
      )
    }
  }
}

export default Update
