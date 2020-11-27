export const avgReview = (movie) => {
  let sumReviews = 0
  let avg = 0
  let ratingCount = 0
  if (movie.reviews) {
    movie.reviews.forEach((review) => {
      if (review.rating) {
        sumReviews += parseInt(review.rating)
        ratingCount++
      }
    })
    avg = sumReviews / ratingCount
    return avg.toFixed(1)
  } else return 7
}
