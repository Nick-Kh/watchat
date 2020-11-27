import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { Link } from 'react-router-dom'
import { LoginModal } from './LoginModal'
import { Search } from './Search'
import { SideNavigation } from './SideNavigation'
import { NotificationBell } from './NotificationBell'

class _Navbar extends Component {
  state = {
    showComponent: false,
    color: '',
  }
  listenScrollEvent = (e) => {
    if (window.scrollY > 400) {
      this.setState({ color: 'rgba(0, 0, 0, 0.666)' })
    } else {
      this.setState({ color: '' })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  onOpenModal = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    })
  }

  render() {
    const { loggedInUser } = this.props
    return (
      <React.Fragment>
        <nav
          className='main-nav after-canvas'
          style={{ backgroundColor: this.state.color }}>
          <div className='nav-container'>
            <div className='SideNavigation'>
              <SideNavigation />
            </div>
            <div className='home nav-column'>
              <NavLink
                className={`navlink-btn`}
                activeClassName='nav-selected'
                to='/'
                exact>
                Home
              </NavLink>
            </div>
            <div className='about nav-column'>
              <NavLink
                className='navlink-btn'
                activeClassName='nav-selected'
                to='/about'
                exact>
                About
              </NavLink>
            </div>
            <div className='movies nav-column'>
              <NavLink
                activeClassName='nav-selected'
                className='navlink-btn'
                to='/movie'
                exact>
                Movies
              </NavLink>
            </div>

            <span className='main-title nav-column'>
              <Link className='logo' to={`/`}>
                <div className='WatChat-logo'>WatChat</div>
              </Link>
              <div className='under-logo'>- online cinema -</div>
            </span>

            <Search className='navlink-search nav-column' />

            <div className='user-container nav-column'>
              {loggedInUser === null && (
                <div
                  className='user-login  after-canvas'
                  onClick={this.onOpenModal}>
                  Log in
                </div>
              )}

              {loggedInUser && <NotificationBell />}
              <div className='user-details-container'>
                {loggedInUser && (
                  <div className='user-name'>Hello {loggedInUser.username}</div>
                )}
                {/* {loggedInUser &&<NavLink className="user-details-btn" to="/user"><img className="user-img" src={`https://api.adorable.io/avatars/285/${number}@adorable.png`} alt="" /></NavLink>} */}
                {loggedInUser && (
                  <div id='logout-btn' onClick={this.props.logout}>
                    Logout
                  </div>
                )}
              </div>
              {loggedInUser && loggedInUser.userImg && (
                <NavLink className='user-details-btn userImg' to='/user'>
                  <img
                    className='user-img'
                    src={`${loggedInUser.userImg}`}
                    alt=''
                  />
                </NavLink>
              )}
              {loggedInUser && loggedInUser.userImg === null && (
                <NavLink className='user-details-btn' to='/user'>
                  <img
                    className='user-img'
                    src={`https://robohash.org/${loggedInUser._id}/?set=set${loggedInUser.imgType}`}
                    alt=''
                  />
                </NavLink>
              )}
            </div>
          </div>
        </nav>
        {this.state.showComponent ? (
          <LoginModal onOpenModal={this.onOpenModal} />
        ) : null}
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
export const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar)
