import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiError} from 'react-icons/bi'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class MovieDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieDetails: {}}

  componentDidMount() {
    this.callDetailedViewApi()
  }

  callDetailedViewApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const movieDetails = fetchedData.movie_details
      const camelMovieDetails = {
        adult: movieDetails.adult,
        backdropPath: movieDetails.backdrop_path,
        budget: movieDetails.budget,
        genres: movieDetails.genres,
        id: movieDetails.id,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        similarMovies: movieDetails.similar_movies,
        spokenLanguages: movieDetails.spoken_languages,
        title: movieDetails.title,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
      }
      this.setState({
        movieDetails: {...camelMovieDetails},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getPosterViews = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.PosterSucessView()
      case apiStatusConstants.failure:
        return this.PosterFailureView()
      case apiStatusConstants.inProgress:
        return this.HomePageLoadingView()
      default:
        return null
    }
  }

  PosterFailureView = () => {
    const {apiStatus} = this.state
    return (
      <div>
        <BiError />
        <p>Something went wrong. Please try again</p>
        <button className="try-again">Try Again</button>
      </div>
    )
  }

  PosterSucessView = () => {
    const {movieDetails} = this.state
    const {
      backdropPath,
      id,
      overview,
      posterPath,
      title,
      runtime,
      adult,
      releaseDate,
      genres,
      spokenLanguages,
      voteCount,
      budget,
      similarMovies,
    } = movieDetails

    return (
      <div className="" testid="movieItem">
        <div
          style={{
            backgroundSize: 'cover',
            top: '0px',
            backgroundImage: `url("${backdropPath}")`,
          }}
          className="detailed-view-banner-section  banner "
        >
          <h1 className="detailed-banner-title">{title}</h1>
          <div className="container-detai">
            <p className="margin">{this.minutesToHours(runtime)}</p>
            <p className="margin">U/A</p>
            <p className="margin">{releaseDate}</p>
          </div>
          <p className="banner-description ml-2">
            {this.truncateString(overview, 100)}
          </p>
          <button className="play-button ml-2">Play</button>
        </div>

        <div className="movie-details-section-items">
          <div className="genres d-flex flex-column">
            <p className="heading">Genres</p>
            <ul>
              {genres.map(genre => (
                <li>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div className=" audio-available1">
            <p className="heading">Audio available</p>
            <ul>
              {spokenLanguages.map(language => (
                <li>{language.english_name}</li>
              ))}
            </ul>
          </div>
          <div className="rating-count1">
            <p className="heading">Rating count</p>
            <p>{voteCount}</p>
          </div>
          <div className="budget1">
            <p className="heading">Budget</p>
            <p>{budget}</p>
          </div>
        </div>

        <div className="similar-movies-section">
          <h1 className="similar-movies-title">More like this</h1>
          <ul className=" similar-movies-list-items">
            {similarMovies.map(eachMovie => (
              <li className=" p-1">
                <Link to={`/movies/${eachMovie.id}`}>
                  <img
                    alt={eachMovie.title}
                    className="similar-movie-item "
                    src={eachMovie.poster_path}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  minutesToHours = minutes => {
    const hours = Math.floor(minutes / 60)
    const minutesLeft = minutes - hours * 60
    const outTime = `${hours}h ${minutesLeft}m`
    return outTime
  }

  truncateString = (string = '', maxLength = 50) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string

  HomePageLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <div className="bg-color-black">
        <Header />
        <div className="bg-color-black" testid="movieItem">
          {this.getPosterViews()}
        </div>
      </div>
    )
  }
}
export default MovieDetails
