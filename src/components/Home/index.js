import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TrendingNow from '../TrendingNow'

import './index.css'
import MovieContext from '../../context/MovieContext'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import Originals from '../Originals'
import TopRated from '../TopRated'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    allTrendingMovies: [],
  }

  componentDidMount() {
    this.getAllMovies()
  }

  getAllMovies = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedMoviesList = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        allTrendingMovies: updatedMoviesList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  render() {
    const renderSuccessView = () => {
      const {allTrendingMovies} = this.state

      const homeHeaderItem =
        allTrendingMovies[Math.floor(Math.random() * allTrendingMovies.length)]

      const backgroundImage = homeHeaderItem.backdropPath
      const titleOfHeader = homeHeaderItem.title
      const overviewOfHeader = homeHeaderItem.overview

      return (
        <div
          className="home-img-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="home-header-content">
            <h1 className="movie-details-name">{titleOfHeader}</h1>
            <p className="movie-details-description">{overviewOfHeader}</p>
            <button type="button" className="movies-details-play-button">
              Play
            </button>
          </div>
        </div>
      )
    }

    const renderMovieItem = () => {
      this.getAllMovies()
    }

    const renderLoader = () => <LoadingView />

    const renderFailureView = () => (
      <div className="failure-view-container">
        <img
          alt="failure view"
          src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
          className="failure-image"
        />
        <p className="search-content">Something went wrong. Please try again</p>

        <button
          type="button"
          className="try-again-button"
          onClick={renderMovieItem}
        >
          Try again
        </button>
      </div>
    )

    const getResult = () => {
      const {apiStatus} = this.state
      switch (apiStatus) {
        case apiConstants.success:
          return renderSuccessView()
        case apiConstants.failure:
          return renderFailureView()
        case apiConstants.inProgress:
          return renderLoader()
        default:
          return null
      }
    }

    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log(username)

          return (
            <>
              <div className="home-container" testid="home">
                {getResult()}
                <h1 className="trending-heading">Trending Now</h1>
                <TrendingNow />
                <h1 className="trending-heading">Top Rated</h1>
                <TopRated />
                <h1 className="trending-heading">Originals</h1>
                <Originals />
              </div>
              <Footer />
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default Home
