import {Component} from 'react'
import Header from '../Header'

import MovieContext from '../../context/MovieContext'
import Footer from '../Footer'

import PopularMovies from '../PopularMovies'

class Popular extends Component {
  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log(username)

          return (
            <>
              <div className="home-container" testid="popular">
                <Header />
                <PopularMovies />
                <Footer />
              </div>
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Popular
