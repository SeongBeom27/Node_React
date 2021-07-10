import React, { Component } from 'react'
import '../css/Login.css'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)

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
        {topic.title}{' '}
      </button>
    ))
  }

  SendPostdata(_data, _url) {
    axios({
      method: 'post',
      url: _url,
      data: {
        email: _data.email,
        password: _data.password,
      },
    })
  }
  render() {
    return (
      <div className="body-container">
        <div className="body-left"> {this.Gettitles()} </div>{' '}
        <div className="body-right">
          <div className="body-create">
            <form
              action="http://localhost:3001/login_process"
              method="post"
              /**
               * submit 버튼을 클릭했을 때, submit 버튼을 포함하고 있는 form 태그 내부 OnSubmit을 호출하게 된다.
               *
               * e.preventDefault() 함수를 쓰면 화면이 /create_process로 이동되는 것을 방지해 준다.
               *
               * 현재 우리는 page 전환 없이 만들려고하는 중
               *  */
              onSubmit={function (e) {
                // onSubmit의 e.target property는 form data를 담고 있다.
                // props인 _title, _desc에 아래 e.target.title.value, e.target.desc.value를 넘겨준다.
                this.props.onSubmit(
                  e.target.email.value,
                  e.target.password.value
                )
                // POST 요청 전송
                this.SendPostdata(
                  {
                    title: e.target.email.value,
                    description: e.target.password.value,
                  },
                  'http://localhost:3001/login_process'
                )
              }.bind(this)}
            >
              <p>
                <input type="text" name="email" placeholder="email"></input>
              </p>
              <p>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                ></input>
              </p>
              <p>
                <input type="submit" value="login" />
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
