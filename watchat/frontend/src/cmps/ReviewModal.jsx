
import React from 'react'
// import Login from '../pages/Login'
export class ReviewModal extends React.Component {
    state = {
        isShown: true,
    }
    closeModal = () => {
        this.setState({ isShown: false })
        this.props.onOpenModal()
        
    }
    render() {
        const { isShown } = this.state
        const { children,addMovie } = this.props
        return (
            <div className={ `modal-wrapper ${isShown ? '' : 'hide'}` } onClick={ this.closeModal } >
                <div className="review-modal-content" onClick={ (ev) => ev.stopPropagation() }>
                    <form onSubmit={addMovie} className='review-form'>
                    { children }
                    <button className="review-submit-btn" >Continue</button>
                    </form>
                </div>
            </div >
        )
    }
}
