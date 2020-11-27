import reviewService from '../../services/reviewService';

export function loadReviews(movieId) {
  return async dispatch => {
    try {
      const reviews = await reviewService.query(movieId);
      // console.log('reviews form loadReviews()',reviews)
      dispatch({ type: 'SET_REVIEWS', reviews });

    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err);
    }
  };
}

export function addReview(review) {
  // console.log('review1',review)
  return async dispatch => {
    try {
      // console.log("review3",review)
      const addedReview = await reviewService.add(review);
      console.log('addedReview',addedReview)
      dispatch({ type: 'REVIEW_ADD',  addedReview });
    } catch (err) {
      console.log('ReviewActions: err in addReview', err);
    }
  };
}
