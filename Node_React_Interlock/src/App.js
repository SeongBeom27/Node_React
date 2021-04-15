import React from 'react';
import axios from 'axios';
import Movie from "./Movie";
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          movies: [],
          username: null
      }

      this.getMovies = async () => {
          // axios는 시간이 좀 걸리기 때문에 데이터를 fetch 해올 때까지 기다려줘야 한다.
          const {
              data : {
                  data: { movies }
              }
          } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
          this.setState({movies, isLoading: false });
      }
    }
    componentDidMount() {
      fetch('http://localhost:3001/api')
          .then(res=>res.json())
          .then(data=>this.setState({username:data.username}));
      this.getMovies();
   }
  render(){
    const {isLoading, movies, username} = this.state;
    return (
        <section className="container">
            {isLoading ? (
            <div className="loader">
                <span className="loader__text">Loading...</span>
            </div>
            ) : (
            <div className="movies">
                {movies.map(movie => (
                <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={username}
                    summary={movie.summary}
                    poster={movie.medium_cover_image}
                    //genres={movie.genres}
                />
                ))}
            </div>
            )}
        </section>
    );
  }
  // render() {
  //   const {username} = this.state;
  //   return (
  //       <div className="App">
  //         <header className="App-header">
  //           {username ? `Hello ${username}` : 'Hello World'}
  //         </header>
  //       </div>
  //   );
  //   ;
  // }
}

export default App;