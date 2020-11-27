import React, { Component } from 'react'
import { IoMdSend, IoIosHappy } from 'react-icons/io'
import { socketService } from '../../services/socketService'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { UserList } from './UserList'
import { customEmojis } from '../../data/emojis'
import uuid from 'react-uuid'
import RSC from 'react-scrollbars-custom'
import { msgList1 } from '../../data/msgs1'

export class Chat extends Component {
  state = {
    currUser: null,
    msg: {
      type: '',
      from: '',
      to: '',
      txt: '',
      senderId: '',
    },
    msgList: [],
    users: [],
    showEmojis: false,
    giftName: '',
    showGift: '',
    giftPosition: '',
  }

  inputRef = React.createRef()
  scrollBarRef = React.createRef()

  componentDidMount() {
    window.addEventListener('beforeunload', this.cleanUp)
    if (this.props.currUser) this.setState({ currUser: this.props.currUser })
    this.setupSockets()
    this.setState({ msgList: msgList1 })
  }

  componentWillUnmount() {
    this.cleanUp()
    window.removeEventListener('beforeunload', this.cleanUp)
  }

  componentDidUpdate() {
    this.scrollDown()
  }

  setupSockets = () => {
    socketService.emit('chat room', {
      roomId: this.props.roomId,
      user: this.props.currUser,
    })
    socketService.on('chat room', (users, newUser) => {
      // console.log('RECEIVING NEW USER FROM SOCKET: ', newUser)
      // console.log('RECEIVING ALL USERS FROM SOCKET: ', newUser)
      this.setState({ users })
      if (!this.state.currUser) {
        // console.log('SETTING NEW USER IN FRONTEND', newUser)
        this.setState({ currUser: newUser })
      }
    })
    socketService.on('chat', (msg) => {
      this.setState({ msgList: [...this.state.msgList, msg] })
    })
    socketService.on('remove-user', (users) => {
      this.setState({ users })
    })
  }

  cleanUp = () => {
    if (this.state.currUser)
      socketService.emit('remove-user', {
        userId: this.state.currUser._id,
        userRoom: this.props.roomId,
      })
    socketService.terminate()
  }

  toggleEmojis = () => {
    this.setState({ showEmojis: !this.state.showEmojis })
  }

  onMsgSend = () => {
    if (this.state.msg !== '') this.sendMsg()
  }

  onMsgEnter = (ev) => {
    if (ev.key === 'Enter' && this.state.msg !== '') this.sendMsg()
  }

  sendMsg = () => {
    let msg = this.state.msg
    msg.from = this.state.currUser.username
    msg.senderId = this.state.currUser._id
    socketService.emit('chat', msg)
    this.removeMsg()
    this.hideEmojis()
  }

  hideEmojis = () => {
    this.setState({ showEmojis: false })
  }

  onMsgInput = (ev) => {
    const msg = this.state.msg
    msg.txt = ev.target.value
    this.setState({ msg })
  }

  onEmojiSelect = (emoji) => {
    let msg = this.state.msg
    if (emoji.native) {
      msg.txt += emoji.native
      this.setState({
        msg,
      })
    } else {
      msg.txt += emoji.name
      this.setState({
        msg,
      })
    }
  }

  onUsernameSelect = (user) => {
    if (user._id === this.state.currUser._id) return
    const input = this.inputRef.current
    input.value = '@' + user.username + ' '
    const msg = { to: user.username, txt: input.value }
    this.setState({ msg })
    input.focus()
  }

  sendGift = (giftName, giftPosition) => {
    this.setState({ giftName, showGift: true, giftPosition })
    console.log('GIFT POSITION: ', giftPosition)
    setTimeout(() => {
      this.setState({ showGift: false })
    }, 2000)
  }

  removeMsg = () => {
    const msg = {
      type: '',
      from: '',
      to: '',
      txt: '',
    }
    const privateMsg = {
      isPrivate: false,
      to: '',
    }
    this.setState({ privateMsg })
    this.setState({ msg })
  }

  replaceWithGif = (msg) => {
    msg = this.replaceWithTagName(msg)
    let result = msg
    customEmojis.forEach((em) => {
      const emoji = `
      <img src=${em.imageUrl} class='gif-img'></img>
    `
      let temp = ''
      while (result !== temp) {
        temp = result
        const searchStr = em.name
        result = result.replace(searchStr, emoji)
      }
    })
    return result
  }

  replaceWithTagName = (msg) => {
    let result = msg
    this.state.users.forEach((user) => {
      const tagname = `<span class='name-tag'>${user.username}</span>`
      const searchStr = user.username
      result = result.replace(searchStr, tagname)
      result = result.replace('@', '')
    })
    return result
  }

  scrollDown = () => {
    const scrollBar = this.scrollBarRef.current
    if (scrollBar) scrollBar.scrollToBottom()
  }

  render() {
    // console.log('ALL USERS: ', this.state.users)
    // console.log('CURRENT USER: ', this.state.currUser)
    if (!this.state.currUser) return <div>Loading...</div>
    return (
      <section className='chat'>
        <UserList
          movie={this.props.movie}
          sendGift={this.sendGift}
          users={this.state.users}
          currUser={this.state.currUser}
          onUsernameSelect={this.onUsernameSelect}
        />
        <div className='chat-window'>
          <div className='chat-box'>
            <RSC
              ref={this.scrollBarRef}
              // className='chat-box'
              style={{ color: 'red' }}>
              {this.state.msgList.map((msg) => (
                <div
                  key={uuid()}
                  className={`msg-container ${
                    this.state.currUser &&
                    msg.senderId === this.state.currUser._id
                      ? 'left'
                      : 'right'
                  }-msg`}>
                  <div
                    className={`chat-msg from-${
                      this.state.currUser &&
                      msg.senderId === this.state.currUser._id
                        ? 'me'
                        : 'user'
                    }`}
                    key={uuid()}>
                    <div
                      className='msg-sender'
                      style={{ color: ` ${msg.nameColor} ` }}>
                      {this.state.currUser &&
                      msg.senderId === this.state.currUser._id
                        ? 'Me'
                        : msg.from}
                    </div>
                    <div
                      className='msg-content'
                      dangerouslySetInnerHTML={{
                        __html: this.replaceWithGif(msg.txt),
                      }}
                    />
                  </div>
                </div>
              ))}
            </RSC>
            <div
              className={`gift ${
                !this.state.showGift ? 'hidden' : this.state.giftName
              }`}
              style={{ left: `${this.state.giftPosition}px` }}></div>
            <div
              className={`emojis ${
                this.state.showEmojis === false ? 'hidden' : ''
              }`}>
              <Picker
                style={{ width: '100%' }}
                custom={customEmojis}
                theme='light'
                perLine={6}
                showPreview={false}
                showSkinTones={false}
                onSelect={this.onEmojiSelect}
                // onClick={this.on}
                exclude={[
                  'flags',
                  'symbols',
                  'nature',
                  'search',
                  'places',
                  'objects',
                  'activity',
                ]}
                emojiTooltip={true}
              />
            </div>
          </div>

          <div className='chat-input'>
            <input
              ref={this.inputRef}
              type='text'
              value={this.state.msg.txt}
              placeholder='Type a message'
              onChange={this.onMsgInput}
              onKeyPress={this.onMsgEnter}
              onFocus={this.hideEmojis}
            />
            <div
              className={`input-icon ${
                this.state.msg.txt === '' ? '' : 'msg-content'
              }`}>
              <IoMdSend size='20px' onClick={this.onMsgSend} />
            </div>
            <div
              className={`input-icon emoji ${
                this.state.showEmojis ? 'selected' : ''
              }`}
              onClick={this.toggleEmojis}>
              <IoIosHappy size='20px' />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
