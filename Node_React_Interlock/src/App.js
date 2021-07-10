import React from 'react'
import Head from './components/Head/Head'
import Body from './components/Body/Body'
import Foot from './components/Foot/Foot'
import Create from './components/Body/Create'
import Login from './components/Body/Login'
import Home from './components/Body/Home'
import Update from './components/Body/Update'
import axios from 'axios'
//import axios from 'axios'
//import { isElementOfType } from 'react-dom/test-utils'
class App extends React.Component {
  /**
   * props    :    사용자가 컴포넌트르 이용하는데 있어서 중요한 것
   * state    :    내부의 구현에 필요한 데이터들 ( 사용자가 알 필요없고 알아서도 안되는 부분 )
   */
  constructor(props) {
    super(props)
    this.state = {
      username: 'seongbeom',
      mode: 'home',
      topics: null,
      isLoading: false,
      id: 2,
      index: 0,
    }
    this.Getbody = this.Getbody.bind(this)
    // this.GetTitle = this.GetTitle.bind(this)
    // this.GetDesc = this.GetDesc.bind(this)
    this.GetIndex = this.GetIndex.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:3001/topics')
      .then(res => res.json())
      .then(res =>
        this.setState({
          topics: res.topics,
          isLoading: true,
        })
      )
  }
  componentDidUpdate() {
    fetch('http://localhost:3001/topics')
      .then(res => res.json())
      .then(res =>
        this.setState({
          topics: res.topics,
          isLoading: true,
        })
      )
  }
  /**
   * @param {*} _id  topics의 id property
   * @return         topics 배열의 인덱스
   */
  GetIndex(_id) {
    let i
    for (i = 0; i < this.state.topics.length; i++) {
      if (this.state.topics[i].id == _id) {
        return i
      }
    }
    return 0
  }
  Getbody() {
    if (this.state.isLoading === true) {
      if (this.state.mode == 'read') {
        return (
          <Body
            topics={this.state.topics}
            title={this.state.topics[this.state.index].title}
            desc={this.state.topics[this.state.index].description}
            id={this.state.topics[this.state.index].id}
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.GetIndex(_id),
              })
            }.bind(this)}
            onChangeMode={function (_mode) {
              this.setState({
                mode: _mode,
              })
            }.bind(this)}
          ></Body>
        )
      } else if (this.state.mode == 'create') {
        return (
          <Create
            topics={this.state.topics}
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.GetIndex(_id),
                mode: 'read',
              })
            }.bind(this)}
            onSubmit={function (_title, _desc) {
              console.log(_title, ' ', _desc)
              this.setState({
                mode: 'read',
              })
            }.bind(this)}
          ></Create>
        )
      } else if (this.state.mode == 'home') {
        return (
          <Home
            topics={this.state.topics}
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.GetIndex(_id),
                mode: 'read',
              })
            }.bind(this)}
          ></Home>
        )
      } else if (this.state.mode == 'update') {
        return (
          <Update
            topics={this.state.topics}
            id={this.state.id}
            index={this.state.index}
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.GetIndex(_id),
                mode: 'read',
              })
            }.bind(this)}
            onSubmit={function (_title, _desc) {
              console.log(_title, ' ', _desc)
              this.setState({
                mode: 'read',
              })
            }.bind(this)}
          ></Update>
        )
      } else if (this.state.mode == 'login') {
        return (
          <Login
            topics={this.state.topics}
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.GetIndex(_id),
                mode: 'read',
              })
            }.bind(this)}
            onSubmit={function (_email, _pwd) {
              console.log(_email, ' ', _pwd)
              this.setState({
                mode: 'read',
              })
            }.bind(this)}
          ></Login>
        )
      } else {
        return (
          <Body
            topics={this.state.isLoading}
            title="isLoading"
            desc="isLoading"
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.Getindex(_id),
              })
            }.bind(this)}
          ></Body>
        )
      }
    }
  }
  render() {
    // fetch('http://localhost:3001/topic')
    //   .then(res => res.json())
    //   .then(res =>
    //     this.setState({
    //       topics: res.topics,
    //       isLoading: true,
    //     })
    //   )
    return (
      <div>
        <header>
          <Head
            mode={this.state.mode}
            onChangeMode={function (_mode) {
              this.setState({
                mode: _mode,
              })
            }.bind(this)}
          ></Head>
        </header>
        <div>{this.Getbody()}</div>
        <footer>
          <Foot name={this.state.username}></Foot>
        </footer>
      </div>
    )
  }
}

export default App
