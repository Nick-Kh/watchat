import React from 'react'
import Login from '../pages/Login'
export class LoginModal extends React.Component {
  state = {
    isShown: true,
  }
  closeModal = () => {
    this.setState({ isShown: false })
    this.props.onOpenModal()
  }
  render() {
    const { isShown } = this.state
    const { children } = this.props
    return (
      // <div className={ `modal-wrapper ${isShown ? '' : 'hide'}` } onClick={ this.closeModal } >
      <div
        className={`modal-wrapper ${isShown ? '' : 'hide'}`}
        onClick={this.closeModal}>
        <div className='modal-content' onClick={(ev) => ev.stopPropagation()}>
          {/* <button onClick={ this.closeModal }>X</button> */}
          {/* { children } */}
          <Login closeModal={this.closeModal} />
        </div>
      </div>
    )
  }
}
