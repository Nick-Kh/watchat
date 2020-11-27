import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'
import { logout } from '../store/actions/userActions'
import { MovieHeroList } from '../cmps/Movie/MovieHeroList'
import { MovieList } from '../cmps/Movie/MovieList'
import 'aos/dist/aos.css' // You can also use <link> for styles

import { BsArrowUp } from 'react-icons/bs'
import {
  Link as LinkScroll,
  Element,
  Events,
  animateScroll as scroll,
} from 'react-scroll'

class _Home extends Component {
  state = {
    filterBy: {
      search: '',
      minYear: -Infinity,
      maxYear: Infinity,
      type: 'All',
    },
  }

  componentDidMount() {
    this.props.loadMovies(this.state.filterBy)
    scroll.scrollToTop()
  }

  componentWillUnmount() {
    const filterBy = {
      search: '',
      minYear: -Infinity,
      maxYear: Infinity,
      type: 'All',
    }

    this.setState({ filterBy })
  }

  componentWillUnmount() {
    const filterBy = {
      search: '',
      minYear: -Infinity,
      maxYear: Infinity,
      type: 'All',
    }

    this.setState({ filterBy })
  }

  handleInputs = (ev) => {
    const field = ev.target.name
    const value = ev.target.value
    this.setState(
      { ...this.state, filterBy: { ...this.state.filterBy, [field]: value } },
      () => {
        this.props.loadMovies(this.state.filterBy)
      }
    )
  }

  render() {
    const { movies } = this.props
    if (!movies) return <div>Loading....</div>
    const watchRoomMovies = movies.filter(
      (movie) =>
        movie.title === 'X-Men: Dark Phoenix' ||
        movie.title === '21 Bridges' ||
        movie.title === 'Hellboy' ||
        movie.title === 'Avatar'
    )

    return (
      <React.Fragment>
        <div className='movie-app' id='top'>
          <Element name='header'>
            <div className='main-header-container'>
              <MovieHeroList />
            </div>
          </Element>
          {/* end of main header container */}
          <div className='main-movies-section'>
            <div className='Streaming-section1' data-aos='fade-right'>
              <div>So How Does It Work...</div>
              <div className='explantion-btn'>
                <LinkScroll
                  to='explanation'
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={800}>
                  <button>Click Here</button>
                </LinkScroll>
              </div>
            </div>

            <div className='live-cinema-section'>
              <div className='live-movie-example'>
                <div className='img-example'>
                  <img
                    className='laptop-blank'
                    src='assets/img/laptop-blank.png'
                    alt=''
                  />
                  <video className='baby' loop autoPlay muted>
                    <source src='assets/img/video.mp4' type='video/mp4' />
                  </video>
                  <img
                    className='chat-img2'
                    src='assets/img/chat-img2.png'
                    alt=''
                  />
                </div>
                <div className='movie-example'>
                  <div className='main-title'>
                    {/* LIVE CINEMA - */}
                    WATCH WHATEVER, TOGETHER
                  </div>
                  <div className='main-title2'>
                    Connect with others who are as obsessed with your favorite
                    movies as you are. Come together for watch parties, chat
                    about your favorite shows and movies, and discover your next
                    binge.
                  </div>
                  <div className='title'>
                    <i> Streaming Live Now</i>
                  </div>
                </div>
              </div>

              <div className='live-rooms-container'>
                <div className='watch-container'>
                  <MovieList movies={watchRoomMovies} type='cinema' />
                </div>
              </div>
            </div>
            {/* end of live cinema section */}
            <div className='new-movies'>
              {/* <WideSlider movies={newMovies}/> */}
              <div className='movies-title'>New Movies in WatChat</div>
              <div className='home-new-movies-container'>
                <MovieList type='movie-big' movies={movies.slice(0, 7)} />
              </div>
            </div>
            <div className='top-movies'>
              <div className='movies-title'>TOP 10</div>
              <div className='home-top-movies-container'>
                <MovieList type='movie-top' movies={movies.slice(7, 11)} />
              </div>
            </div>

            <div className='editors-movies module-border-wrap'>
              {/* <WideSlider movies={newMovies}/> */}
              <div className='editors-title'>EDITOR'S CHOICE</div>

              <div className='home-choices-container'>
                <div className='side-img-container2'>
                  <img className='img-hr10' src='assets/img/hr10.png' alt='' />
                </div>
                <MovieList movies={movies.slice(8, 12)} type='movie-small' />
              </div>
            </div>
            {/* {end of editors part 1} */}
            <div className='editors-movies2 module-border-wrap'>
              {/* <WideSlider movies={newMovies}/> */}

              <div className='home-choices-container3'>
                <div className='side-img-container3'>
                  <div></div>
                  <img className='img-hr10' src='assets/img/hr12.png' alt='' />
                  <div className='info-container'>
                    <div>
                      SEE ALL <span className='number-style'>22</span>
                    </div>
                    <div>Action</div>
                  </div>
                </div>
                <MovieList movies={movies.slice(12, 16)} type='movie-small' />
              </div>
            </div>
            {/* end of rditors part 2 */}
            <div className='editors-movies2 module-border-wrap'>
              <div className='home-choices-container2'>
                <div className='side-img-container2'>
                  <div></div>
                  <img className='img-hr10' src='assets/img/hr13.png' alt='' />
                  <div className='info-container'>
                    <div>
                      SEE ALL <span className='number-style'>17</span>
                    </div>
                    <div>Horror</div>
                  </div>
                </div>
                <MovieList movies={movies.slice(16, 20)} type='movie-small' />
              </div>
            </div>
            {/* end of editors part 3 */}

            <div>
              <Element name='explanation'>
                <div className='example-imgs' id='example'>
                  <div className='example-img1'>
                    <img
                      className='example-img'
                      src='assets/img/chat2.png'
                      alt=''
                    />
                    <div>choose a movie to stream or live cinema</div>
                  </div>
                  <div className='example-img2'>
                    <img
                      className='example-img'
                      src='assets/img/chat2.png'
                      alt=''
                    />
                    <div>Send a link to your friends</div>
                  </div>
                  <div className='example-img3'>
                    <img
                      className='example-img'
                      src='assets/img/chat2.png'
                      alt=''
                    />
                    <div>Watch and chat together</div>
                  </div>
                </div>
              </Element>
            </div>
            <div className='got-to-top-button'>
              <LinkScroll to='header' spy={true} smooth={true} duration={800}>
                <button>
                  <BsArrowUp className='bsArrowUp' />
                </button>
              </LinkScroll>
            </div>
          </div>
        </div>
        {/* <WideSlider movies={movies}/> */}
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
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
