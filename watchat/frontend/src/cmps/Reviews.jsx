import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadReviews, addReview } from '../store/actions/reviewActions.js';
import { loadUsers } from '../store/actions/userActions.js';
import { loadMovies } from '../store/actions/movieActions'
import { Link } from 'react-router-dom';


class Reviews extends Component {
  state = {
    reviewToEdit: {
      txt: '',
      aboutMovieId: this.props.movie._id,
      openTextArea:false
      
      // aboutUserId: ''
    }
  };
 

  componentDidMount() {
    // console.log('this.props.movie._id',this.props.movie._id)
    this.props.loadReviews(this.props.movie._id);
    this.props.loadUsers();
    this.props.loadMovies()
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      reviewToEdit: {
        ...prevState.reviewToEdit,
        [name]: value
      }
    }));
  };
  openReviewTextarea =()=>{
      this.setState({openTextArea:!this.state.openTextArea})
  }

  addReview = ev => {
    ev.preventDefault();
    this.props.addReview(this.state.reviewToEdit);
    this.setState({ reviewToEdit: { txt: '', aboutMovieId: this.props.movie._id } });
    // this.setState({ reviewToEdit: { txt: '', aboutUserId: '' } });
  };

  render() {
    // const {  } = this.props
    return (
      <React.Fragment>
        <div className="add-reviews-main-container">
            {/* <div className="review-container">
              <div className="review-txt">
                <div>
                    {this.props.reviews.length} reviews <span><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span> 
                </div> 
                 <div className="add-review-container" onClick={this.openReviewTextarea}><span className="add-review-txt">Add Review </span><img className="review-icon" src="./assets/img/meow-popcorn.gif" alt=""/></div>
               </div>
            </div>
        
            <div className={`form-container ${this.state.openTextArea?"":"hide-textarea"}`}>
              <form onSubmit={this.addReview} className='textarea'>
              <textarea placeholder="Add your comment here..." cols="30" rows="5"
                name="txt"
                onChange={this.handleChange}
                value={this.state.reviewToEdit.txt}
              ></textarea>
              <button>Submit</button>
            </form>
            </div>
         */}
      
      <div className="home"><div>
          {movie.reviews.map(review => (
             <table className="reviews-table">
               <tr className="reviews-tr">
                  <th className="reviews-th th-letter" >{review.byUser.substring(0, 1)}</th>
                  <th className="reviews-th th-name">By {review.byUser}</th>
               </tr>
               <tr className="reviews-tr">
                 <td className="reviews-td"></td>
                 <td className="reviews-td">{review.txt}</td>
               </tr>
             </table>
          ))}
        </div>
       
      </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.review.reviews,
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    movies: state.movie.movies,
  };
};
const mapDispatchToProps = {
  loadReviews,
  loadUsers,
  addReview,
  loadMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
