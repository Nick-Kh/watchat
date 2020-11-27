import React, { Component } from 'react'
// import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { Link } from 'react-router-dom'
import { LoginModal } from './LoginModal'
import Particles from 'react-particles-js'
import { Search } from './Search'

class _SideNavigation extends Component {
  state = {
    showComponent: false,
    isClose: true,
  }
  onOpenModal = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    })
  }

  onOpenNav = () => {
    // document.getElementById("mySidenav").style.width = "250px";
    // this.setState({isOpen: !this.state.isOpen})
    this.setState({ isClose: true })
  }

  onCloseNav = () => {
    // document.getElementById("mySidenav").style.width = "0";
    this.setState({ isClose: false })
  }

  onToggleNav = () => {
    this.setState({ isClose: !this.state.isClose })
  }

  render() {
    const { loggedInUser } = this.props
    return (
      <React.Fragment>
        {/* <Particles canvasClassName="example"
    params={{
	    "particles": {
	        "number": {
	            "value": 50
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}} /> */}

        <div
          className={`sidenav ${this.state.isClose ? 'closeNav' : 'openNav'}`}>
          <div className='closebtn' onClick={this.onToggleNav}>
            &times;
          </div>
          <div className='side-nav-main'>
            <div className='home nav-column'>
              <NavLink className='navlink-btn' to='/'>
                Home
              </NavLink>
            </div>
            <div className='about nav-column'>
              <NavLink className='navlink-btn' to='/about'>
                About
              </NavLink>
            </div>
            <div className='movies nav-column'>
              <NavLink className='navlink-btn' to='/movie'>
                Movies
              </NavLink>
            </div>
          </div>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Action',
              },
            }}>
            Action
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Comedy',
              },
            }}>
            Comedy
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Crime',
              },
            }}>
            Crime
          </Link>

          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Drama',
              },
            }}>
            Drama
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Fantasy',
              },
            }}>
            Fantasy
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Adventure',
              },
            }}>
            Adventure
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Horror',
              },
            }}>
            Horror
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Horror',
              },
            }}>
            Romance
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Romance',
              },
            }}>
            Horror
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Sci-Fi',
              },
            }}>
            Sci-Fi
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Thriller',
              },
            }}>
            Thriller
          </Link>
          <Link
            className='side-navlink-btn'
            to={{
              pathname: '/genre',
              genre: {
                name: 'Fairy Tale',
              },
            }}>
            Fairy Tale
          </Link>
        </div>

        <span onClick={this.onToggleNav} className='hamburger'>
          &#9776;
        </span>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
    users: state.user.users,
  }
}
const mapDispatchToProps = {
  logout,
}
export const SideNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SideNavigation)
