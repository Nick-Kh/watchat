import React, { Component } from 'react'
import { UserPreview } from './UserPreview'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { IoIosPerson } from 'react-icons/io'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Toolbar } from './Toolbar'

export class UserList extends Component {
  state = {
    currPage: 0,
  }

  getUsersForDisplay = () => {
    let numOfUsers = 4
    const myUserIdx = this.props.users.findIndex(
      (user) => user._id === this.props.currUser._id
    )
    if (myUserIdx > 0) {
      this.props.users.splice(myUserIdx, 1)
      this.props.users.unshift(this.props.currUser)
    }
    const width = parseInt(window.innerWidth)
    if (width <= 500) numOfUsers = 1
    if (width > 500 && width <= 900) numOfUsers = 2
    if (width > 900 && width <= 1100) numOfUsers = 3
    const startUser = this.state.currPage * numOfUsers
    const users = this.props.users.slice(startUser, startUser + numOfUsers)
    return users
  }

  onMoveRight = () => {
    if ((this.state.currPage + 1) * 4 < this.props.users.length) {
      this.setState(function (prevState) {
        return {
          currPage: prevState.currPage + 1,
        }
      })
    }
  }

  onMoveLeft = () => {
    if (this.state.currPage > 0)
      this.setState(function (prevState) {
        return {
          currPage: prevState.currPage - 1,
        }
      })
  }

  render() {
    return (
      <div className='user-list-container'>
        <Toolbar onShare={this.props.onShare} movie={this.props.movie} />
        <div className='user-list'>
          <div className='user-arrow arrow-left' onClick={this.onMoveLeft}>
            <FaAngleLeft size='30px' />
          </div>
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={this.state.currPage}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false)
              }}
              classNames='fade'>
              <div className='users-container'>
                {this.getUsersForDisplay().length < 1 ? (
                  <h1>Loading...</h1>
                ) : (
                  this.getUsersForDisplay().map((user, idx) => (
                    <UserPreview
                      key={user._id}
                      sendGift={this.props.sendGift}
                      user={user}
                      userIdx={idx}
                      currUser={this.props.currUser}
                      onUsernameSelect={this.props.onUsernameSelect}
                    />
                  ))
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
          <div className='user-arrow arrow-right' onClick={this.onMoveRight}>
            <FaAngleRight size='30px' />
          </div>
          <span className='total-users'>
            <IoIosPerson size='15px' color='white' /> {this.props.users.length}
          </span>
        </div>
      </div>
    )
  }
}
