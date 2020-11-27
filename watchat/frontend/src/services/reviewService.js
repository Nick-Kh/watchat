import httpService from './httpService';

export default {
  add,
  query,
  remove
};


// return axios.get('api/movie/?id=1223&balance=13');
// return axios.get('api/movie/?', {params: {id: 1223, balanse:13}});


function query(movieId) {
  console.log('movieId',movieId)
  var queryStr = (!movieId)? '':`?movieId=${movieId}&sort=anaAref`;
  // if (movieId) var queryStr = `?movieId=${movieId}&sort=anaAref`;
  // return httpService.get(`review${queryStr}`);
  return httpService.get(`review${queryStr || ''}`);
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`);
}
async function add(review) {
  console.log('review2',review)
  const addedReview  = await httpService.post('review', review);
  console.log('addedReview',addedReview)
  return  addedReview
}
