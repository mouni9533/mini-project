import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {search, searchInput} = props
  let enteredInputValue = ''
  const inputText = event => {
    enteredInputValue = event.target.value
  }

  const searchButtonClicked = () => {
    searchInput(enteredInputValue)
  }

  return (
    <div className="header">
      <ul className="header-list-items">
        <li className="list-container1">
          <Link to="/">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655456206/Group_7399_tjbtzb.png"
            />
          </Link>
          <Link to="/">
            <p className="color">Home</p>
          </Link>
          <Link to="/popular">
            <p className="color">Popular</p>
          </Link>
        </li>

        <li className="list-container2">
          <div>
            {search === 'true' && (
              <div className="input-container-field">
                <input
                  onChange={inputText}
                  className="search-input"
                  type="search"
                />
                <button
                  type="button"
                  testid="searchButton"
                  onClick={searchButtonClicked}
                  className="button"
                  alt="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </div>
            )}
            {search !== 'true' && (
              <Link to="/search">
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  alt="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </Link>
            )}
          </div>
          <div>
            <Link to="/Account">
              <button type="button" className="profile-image">
                <img
                  alt="profile"
                  src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655477627/Avatar_v4saqp.png"
                />
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}
export default Header
