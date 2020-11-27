import React, { Component } from 'react'
import { movieService } from '../services/movieService.js'
import { Link } from 'react-router-dom'
// import Reviews from '../cmps/Reviews'
import { connect } from 'react-redux'
import {addMovie} from '../store/actions/movieActions.js'
import {updateUser} from '../store/actions/userActions.js'
import {ReviewModal} from '../cmps/ReviewModal'
// import {Foo} from '../cmps/Rating'


class _MovieDetails extends Component {
  state = {
    movie: null,
    showComponent: false,
    favoriteBtn: '',
    reviewToEdit: {
      txt: '',
      byUser: 'mili',
      // byUser: this.props.loggedInUser.username,
      rating : "",
      // aboutMovieId: this.props.movie._id,
      // openTextArea:false
    },
  }

  addToFav = (movie)=>{
      // console.log('favMovies',movie)
      let booleanValue = this.props.loggedInUser.favMovies.find(item=> item._id === movie._id  )
      // console.log("booleanValue",booleanValue)
      if(booleanValue){
        var index = this.props.loggedInUser.favMovies.findIndex(item=> item._id === movie._id );
        // console.log('index', index)
        this.props.loggedInUser.favMovies.splice(index, 1);
        // this.props.loggedInUser.favMovies.filter(item  => item  !== movie)
        // console.log(' this.props.loggedInUser.favMovies', this.props.loggedInUser.favMovies)
        this.props.updateUser(this.props.loggedInUser);

        // this.setState({favoriteBtn:''})

      }else{

        this.props.loggedInUser.favMovies.push(movie)
        // console.log(' this.props.loggedInUser.favMovies', this.props.loggedInUser.favMovies)
        this.props.updateUser(this.props.loggedInUser);
        // this.setState({favoriteBtn:'favoriteBtnStyle'})
      }

    
  }


  onOpenModal = () => {
    this.setState({
      // showComponent: !this.state.showComponent,
      showComponent: !this.state.showComponent,
    })
    // console.log('this.state.showComponent',this.state.showComponent)
  }

  componentDidMount() {
    this.loadMovie()


  }

  async loadMovie() {
    const movieId = this.props.match.params.id
    const movie = await movieService.getById(movieId)
    this.setState({ movie })
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      reviewToEdit: {
        ...prevState.reviewToEdit,[name]: value, byUser: 'GUEST'
      }
    }));
    // console.log('this.state.reviewToEdit',this.state.reviewToEdit)
  };

  addMovie = ev => {
    ev.preventDefault();
    // console.log(this.state.reviewToEdit,'this.state.reviewToEdit')
    // console.log(this.state.movie,'this.state.movie')
    // console.log(this.state.movie.reviews,'this.state.movie.reviews')
    this.state.movie.reviews.push(this.state.reviewToEdit)
    // console.log('newMovie',this.state.movie)
    this.props.addMovie(this.state.movie);
    // console.log(this.state.reviewToEdit,'this.state.reviewToEdit')
    // console.log(this.state.movie ,'this.state.movie. ')
    // this.setState({ reviewToEdit: { txt: '', aboutToyId: this.props.toy._id } });
    this.setState({ reviewToEdit: { txt: '' } });
    this.onOpenModal()
    // this.setState({ reviewToEdit: { txt: '', aboutUserId: '' } });
  };

  renderTitleColor(title) {
    switch(title) {
      case "The Equalizer":
        return 'dark-title-on-background';
      default:
        return 'light-title-on-background';
    }
  }

  renderInfoColor(title) {
    switch(title) {
      case "The Equalizer":
        return 'dark-info-on-background';
      case "Kill Switch":
        return 'dark-info-on-background';
      case "Hellboy":
        return 'dark-info-on-background';
      default:
        return 'light-info-on-background';
    }
  }

  avgReview=()=>{
    let sumReviews =0
    let avg= 0
    let ratingCount = 0
    this.state.movie.reviews.forEach(review=>
    {  
      if(review.rating){
        sumReviews += parseInt(review.rating)
        console.log('review.rating',review.rating)
        ratingCount ++}
      }
     
    )
    console.log('ratingCount',ratingCount)
    console.log('sumReviews',sumReviews)
    avg = sumReviews/ratingCount
    return avg.toFixed(1)
  }

  render() {
    const { movie } = this.state
    const { loggedInUser } = this.props
   

    if (!movie) return <div>Loading....</div>
    return (
      <React.Fragment>
        <div className='movie-details'>
          <div
            className='details-hero-container'
            style={{
              backgroundImage: `url(${
                movie.wideCoverUrl ? movie.wideCoverUrl : ''
              })`,
            }}>
            {/* <img className="details-hero-img" src="../assets/img/joker.png" alt=""/> */}
            <div className='details-hero-info-container'>
            <div className={`details-hero-title ${this.renderTitleColor(movie.title)}`}>{movie.title}</div>
            <div className={`details-hero-info ${this.renderInfoColor(movie.title)}`}>
                <div className='details year'>{movie.year}</div>
                <div className='details duration'>{movie.duration}</div>
              </div>
              <div className='details-hero-btns'>
                <div className='details-hero-btn play-btn'>
                  <Link to={`/room/${movie._id}`}>Play</Link>
                </div>
                <div className={`details-hero-btn my-list-btn ${loggedInUser&&loggedInUser.favMovies.find(item=> item._id === movie._id  )?"favoriteBtnStyle":''}`} onClick={()=>{this.addToFav(movie)}}>+ My List</div>
              </div>
            </div>

            <div className='scenes-container'>
              {movie.scenesUrl.map((scene) => (
                <div
                  className='scene-img-container'
                  style={{ backgroundImage: `url(${scene})` }}></div>
              ))}
            </div>
          </div>
          <section className='details-more-info-section'>
            <div className='description-container'>
              <div className='overview-title'>Overview</div>
              <div className='genres-title'>Genres</div>
              <div className='overview-txt'>${movie.description}</div>
              <div className='genres-txt'>
                {movie.genres.map((genre) => (
                  <div>{genre}</div>
                ))}
              </div>
            </div>

            <div className='cast-continer'>
              <div className='cast-title'>Cast</div>
              {movie.cast.map((actor, idx) => (
                <div className={`actor-container actor-${idx + 1}`}>
                  <img className='actor-img' src={`${actor.img}`} alt='' />
                  <div className='actor-info-container'>
                    <div className='actor-name'>{actor.name}</div>
                    <div className='actor-character'>{actor.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className='reviews-container'>
              <div className='reviews-title'>
             
             <div>
             <div>Reviews</div>
                <div className='reviews-count' >({movie.reviews.length} Reviews)</div>
             </div>
                <div className="number-style avg-number">⭐{this.avgReview()}/10
                </div>
               
             
              {/* <div onClick={this.onOpenModal} className="add-review-btn" >Add Review</div> */}
              <div onClick={this.onOpenModal} >

                
    <button className="colorful-button dark add-review-btn">
        <div className="wrapper">
            <span>Add Review</span>
            <div className="circle circle-12"></div>
            <div className="circle circle-11"></div>
            <div className="circle circle-10"></div>
            <div className="circle circle-9"></div>
            <div className="circle circle-8"></div>
            <div className="circle circle-7"></div>
            <div className="circle circle-6"></div>
            <div className="circle circle-5"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-1"></div>
        </div>
    </button>

              </div>
              </div>

            <div className='reviews-section'>

              {/* <div onClick={this.onOpenModal} className="add-review-btn" >Add Review</div> */}

            {this.state.showComponent?
            <ReviewModal onOpenModal={this.onOpenModal} addMovie={this.addMovie}>
              {/* <form onSubmit={this.addMovie} className='review-form'> */}
             <div className="form-container">
             <div className="form-title">Your Rating</div>
            <select name="rating" className="form-rating" onChange={this.handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <div  className="form-title">Your Review</div>
              <textarea  className="review-textarea" placeholder="Give us some detail about what you liked and disliked about the movie" cols="30" rows="5"
                name="txt"
                onChange={this.handleChange}
                value={this.state.reviewToEdit.txt}
              ></textarea>
             </div>
              {/* <button className="review-submit-btn">Continue</button> */}
            {/* </form> */}
            </ReviewModal>
           :null}
           
                  {/* <Reviews movie={movie}/> */}
                {movie.reviews.map(review => (
                <table className="reviews-table">
                  <tr className="reviews-tr">
                     {review.byUser&&<th className="reviews-th th-letter" >{review.byUser.substring(0, 1)}</th>}
                     <th className="reviews-th th-name">
                       <div>
                          <span className='reviews-th-name'>{review.byUser}</span>
                          <span>⭐{review.rating}/10</span>
                          {/* <span><Foo rating={review.rating}/></span> */}
                       </div>
                    </th>
                  </tr>
                  <tr className="reviews-tr">
                    <td className="reviews-td"></td>
                    <td className="reviews-td">{review.txt}</td>
                  </tr>
                </table>
                ))}

            </div>

          </section>
       
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loggedInUser: state.user.loggedInUser,
    reviews: state.review.reviews,
  }
}

const mapDispatchToProps = {
  addMovie,
  updateUser
};

export const MovieDetails = connect(mapStateToProps,mapDispatchToProps)(_MovieDetails)
// export const MovieDetails = connect(mapStateToProps)(_MovieDetails)
