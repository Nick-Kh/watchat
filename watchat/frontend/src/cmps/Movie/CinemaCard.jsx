import React from 'react'

import Tilt from 'react-parallax-tilt'
import { Link } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { avgReview } from '../../utils/movie-utils'

export function CinemaCard({ movie }) {
  // const avgReview = (movie) => {
  //   let sumReviews = 0
  //   let avg = 0
  //   let ratingCount = 0
  //   movie.reviews.forEach((review) => {
  //     if (review.rating) {
  //       sumReviews += parseInt(review.rating)
  //       ratingCount++
  //     }
  //   })
  //   avg = sumReviews / ratingCount
  //   return avg.toFixed(1)
  // }
  return (
    <div>
      <div className='live-tag'>
        <i>Live</i>
      </div>
      <Tilt
        className='parallax-effect-glare-scale'
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
        style={{ backgroundImage: `url(${movie.coverUrl})` }}>
        <div className='inner-element'>
          <Link to={`/room/${movie._id}`}>
            <div className='paly-card-btn'>
              <i class='fas fa-play card-play'></i>
            </div>
          </Link>
        </div>
      </Tilt>
      <div className='watch-movie-details'>
        <div className={`title ${movie.title.length > 11 ? 'ellipsis' : ''}`}>
          <div>{movie.title}</div>
        </div>
        <div className='details'>
          {movie.genres.splice(2).map((genre) => (
            <span className='details-genre'>
              <i>{genre}</i>
            </span>
          ))}
        </div>
        <div>
          <Link to={`/movie/${movie._id}`}>
            <i class='fas fa-info-circle'></i>
          </Link>
        </div>
        <div className='watching-details'>
          <div>
            <FaRegEye className='faRegEye' />
            {movie.viewersNumber
              ? movie.viewersNumber
              : Math.floor(Math.random() * (2000 - 500) + 500)}
          </div>
          <div>
            <AiFillStar />
            {avgReview(movie)}/10
          </div>
        </div>
      </div>
    </div>
  )
}
