import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
import { MovieCategories } from '../cmps/MovieCategories'
import { MovieFilter } from '../cmps/Movie/MovieFilter'
import { logout } from '../store/actions/userActions'

import { MovieHeroList } from '../cmps/Movie/MovieHeroList'
import { Element, animateScroll as scroll } from 'react-scroll'

class _Movies extends Component {
  state = {
    filterBy: {
      search: '',
      genre: 'All',
    },
  }

  setGenre = (genre) => {
    const filterBy = {
      search: '',
      genre,
    }
    this.setState({ filterBy })
  }

  setSearch = (ev) => {
    let filterBy = {}
    if (ev.target.value !== '') {
       filterBy = {
        search: ev.target.value,
        genre: 'All',
      }
    }
      else {
        filterBy= {
          search: '',
          genre:'All'
        }
      }
    this.setState({ filterBy })
  }

  componentDidMount = () => {
    scroll.scrollTo(600)
  }

  render() {
    const { movies } = this.props
    if (!movies) return <div>Loading....</div>
    return (
      <React.Fragment>
        <div className='movie-app'>
          <div className='main-header-container'>
            <div className='hero-slider-short'>
              <MovieHeroList />
            </div>
          </div>

          <Element>
            <div className='movies-main-section'>
              <MovieFilter setGenre={this.setGenre} setSearch={this.setSearch} filterBy={this.state.filterBy} />
              <MovieCategories movies={movies} filterBy={this.state.filterBy} />
            </div>
          </Element>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loggedInUser: state.user.loggedInUser,
  }
}
const mapDispatchToProps = {
  loadMovies,
  logout,
}
export const Movies = connect(mapStateToProps, mapDispatchToProps)(_Movies)
