import React from 'react'

export class ReactionPicker extends React.Component {
  state = {
    reactions: ['like', 'heart', 'angry', 'sad', 'wow', 'lol'],
  }
  render() {
    const { onSelectReaction } = this.props
    return (
      <div className='reactions-menu'>
        {this.state.reactions.map((emoji) => (
          <span
            className={`reaction ${emoji}`}
            onClick={() => {
              onSelectReaction(emoji)
            }}></span>
        ))}
      </div>
    )
  }
}
