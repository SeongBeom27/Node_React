import React from 'react'
import Head from './components/Head'
import Body from './components/Body'
import Foot from './components/Foot'
import Create from './components/Create'
import { isElementOfType } from 'react-dom/test-utils'
class App extends React.Component {
  /**
   * props    :    사용자가 컴포넌트르 이용하는데 있어서 중요한 것
   * state    :    내부의 구현에 필요한 데이터들 ( 사용자가 알 필요없고 알아서도 안되는 부분 )
   */
  constructor(props) {
    super(props)
    this.state = {
      username: 'seongbeom',
      mode: 'read',
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
    fetch('http://localhost:3001/topic')
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
        console.log(_id)
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
            onChangePage={function (_id) {
              this.setState({
                id: _id,
                index: this.GetIndex(_id),
              })
            }.bind(this)}
          ></Body>
        )
      } else if (this.state.mode == 'create') {
        return (
          // https://velog.io/@taeung/Express%EC%99%80-React-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0React%EC%97%90%EC%84%9C-Express%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%B4%EB%82%B4%EA%B8%B0
          // 위 코드 이용해서 글 생성 목룍 DB로 보내기
          <Create
            topics={this.state.topics}
            onSubmit={function (_title, _desc) {
              console.log(_title, ' ', _desc)
              this.setState({
                mode: 'read',
              })
            }.bind(this)}
          ></Create>
        )
      }
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
  render() {
    return (
      <div>
        <header>
          <Head
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
