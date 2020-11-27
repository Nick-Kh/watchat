import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { loadReviews } from '../store/actions/reviewActions.js';


class _UserDetails extends Component {
    componentDidMount() {
        this.props.loadReviews();
    }
    render() {
        const { loggedInUser } = this.props
       
        const userReviews = this.props.reviews.filter(review =>review.byUser.username === loggedInUser.username )
        console.log('userReviews',userReviews)
        return (
            <div className="user-details">
               {/* <h1 className="user-reviews-title">Welcome: {loggedInUser.username}</h1> */}
               
               {/* <h2>update your account</h2> */}
               {loggedInUser && loggedInUser.username !== "admin" &&<div className="user-reviews-title"><h2>My Reviews</h2> <button className="movie-details-btn" onClick={ () => this.props.history.goBack() }>Back</button></div>}
               {loggedInUser && loggedInUser.username === "admin" &&<div className="user-reviews-title"><h2>Users</h2> <button className="movie-details-btn" onClick={ () => this.props.history.goBack() }>Back</button></div>}
               <h2>
               {
                   userReviews.map(review=>
                    
                    <table className="reviews-table">
                      <tr className="reviews-tr">
                      <th className="reviews-th th-letter main-th-letter" >{review.byUser.username.substring(0, 1)}</th>
                         <th className="reviews-th th-name"><Link className="main-about  after-canvas" to={`movie/${review.aboutMovie._id}`}>
                            About {review.aboutMovie.name}
                          </Link></th>
                      </tr>
                      <tr className="reviews-tr">
                        <td className="reviews-td"></td>
                        <td className="reviews-td">{review.txt}</td>
                      </tr>
                    </table>
                    )
               }
               </h2>
               {/* <h2>Favorite Movies:</h2>
               <div>
               {favTopys.length>0? 
                    favTopys.map(favTopy=> 
                        <div>
                            <div className="movie-img-container" ><img className="movie-img" src={`https://robohash.org/${favTopy._id}/?set=set${favTopy.imgType}`} alt="" /></div>
                            <div className="movie-info"><div className="movie-name">{ favTopy.name }</div> <span className={favTopy.price>50?"red":"green"}>{ favTopy.price }$</span></div> 
                        </div>)
                    : "not favorite movies yet"}
               {console.log('loggedInUser.favMovies',loggedInUser.favMovies)}
               {console.log('favTopys',favTopys)}
               </div> */}
              
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        movies: state.movie.movies,
        loggedInUser: state.user.loggedInUser,
        reviews: state.review.reviews,
    }
}
const mapDispatchToProps = {
    loadReviews
  };
export const UserDetails = connect(mapStateToProps,mapDispatchToProps)(_UserDetails)