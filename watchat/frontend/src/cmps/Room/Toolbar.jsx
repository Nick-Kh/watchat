import React, { Component } from 'react'
import {
  IoMdShare,
  IoIosLink,
  IoIosInformationCircleOutline,
} from 'react-icons/io'

export class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <div className='add-user toolbar-icon' onClick={this.props.onShare}>
          <a
            href={`whatsapp://send?text=${window.location.href} Watch ${this.props.movie.title} Together With Friends!`}
            data-action='share/whatsapp/share'
            target='_blank'>
            <IoMdShare size='20px' />
          </a>
        </div>
        <div className='copy-link toolbar-icon'>
          <IoIosLink size='20px' />
        </div>
        <div className='user-count toolbar-icon'>
          <IoIosInformationCircleOutline size='20px' />
        </div>
      </div>
    )
  }
}
