import React from 'react'
import Head from './components/Head'
import Body from './components/Body'
import Foot from './components/Foot'
class App extends React.Component {
  /**
   * props    :    사용자가 컴포넌트르 이용하는데 있어서 중요한 것
   * state    :    내부의 구현에 필요한 데이터들 ( 사용자가 알 필요없고 알아서도 안되는 부분 )
   */
  constructor(props) {
    super(props)
    this.state = {
      username: 'seongbeom',
      topics: null,
    }
  }

  render() {
    return (
      <div>
        <header>
          <Head></Head>
        </header>
        <div>
          <Body></Body>
        </div>
        <footer>
          <Foot name={this.state.username}></Foot>
        </footer>
      </div>
    )
  }
}

export default App
