import {Component} from 'react'
import Header from '../Header'

import Footer from '../Footer'

import MovieItem from '../MovieItem'

class MovieItemDetails extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <Header />
          <MovieItem />
        </div>
        <Footer />
      </div>
    )
  }
}
export default MovieItemDetails
