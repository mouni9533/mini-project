import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchApiStatus: apiStatusConstants.initial,
    searchList: [],
    inputValue: '',
  }

  componentDidMount() {
    // this.callSearchApi()
  }

  getSearchViews = () => {
    const {searchApiStatus} = this.state
    switch (searchApiStatus) {
      case apiStatusConstants.success:
        return this.renderSucessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSucessView = () => {
    const {searchList} = this.state
    return (
      <div className="search-bg-container">
        <div>
          <ul className="search-ul-container">
            {searchList.map(eachMovie => (
              <li>
                <Link to={`/movies/${eachMovie.id}`}>
                  <img
                    alt={eachMovie.title}
                    className="search-items"
                    src={eachMovie.backdropPath}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {inputValue} = this.state
    return (
      <div className="failure-view">
        <img
          alt="no movies"
          src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655559570/Group_7394_jx0wym.png"
        />
        <p>Your search for {inputValue} did not find any matches.</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loading-view" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getSearchMovies = async searchInput => {
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    this.setState({
      searchApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {results} = await fetchedData
      if (results.length === 0) {
        this.setState({
          searchApiStatus: apiStatusConstants.failure,
          inputValue: searchInput,
        })
      } else {
        const trendingMovies = results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))
        this.setState({
          searchApiStatus: apiStatusConstants.success,
          searchList: [...trendingMovies],
        })
      }
    } else {
      this.setState({searchApiStatus: apiStatusConstants.failure})
    }
  }

  searchInput = inputValue => {
    this.getSearchMovies(inputValue)
  }

  render() {
    return (
      <div className="search-route">
        <div className="">
          <Header searchInput={this.searchInput} search="true" />
        </div>
        <div>{this.getSearchViews()}</div>
      </div>
    )
  }
}
export default Search
