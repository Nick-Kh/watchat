import React, { Component, ReactDOM } from 'react'

export class UserPreview extends Component {
  state = {
    isSelected: false,
    userPosition: ['20%', '40%', '60%', '80%'],
    posX: 0,
  }

  previewRef = React.createRef()

  onUserToggle = () => {
    if (this.props.user.username === this.props.currUser.username) return
    this.setState({ isSelected: !this.state.isSelected })
    const previewEl = this.previewRef.current
    this.setState({ posX: previewEl.getBoundingClientRect().left + 50 })
  }

  render() {
    return (
      <div ref={this.previewRef} className='user-preview'>
        <div
          className={`user-menu-icons ${
            this.state.isSelected ? '' : 'hidden'
          }`}>
          <span className='user-icon follow'></span>
          <span
            onClick={() => this.props.sendGift('drink', this.state.posX)}
            className='user-icon drink'></span>
          <span
            onClick={() => this.props.sendGift('kiss', this.state.posX)}
            className='user-icon kiss'></span>
          <span
            onClick={() =>
              this.props.sendGift('small-popcorn', this.state.posX)
            }
            className='user-icon small-popcorn'></span>
        </div>
        <div className='user-avatar' onClick={this.onUserToggle}>
          <img
            src={
              this.props.user.avatar
                ? this.props.user.avatar
                : 'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601299626/samples/default-avatar_smehur.png'
            }></img>
        </div>
        <div
          className='user-name'
          onClick={() => {
            this.props.onUsernameSelect(this.props.user)
          }}>
          {this.props.user.username === this.props.currUser.username
            ? `${this.props.currUser.username}(Me)`
            : this.props.user.username}
        </div>
      </div>
    )
  }
}