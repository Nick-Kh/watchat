import React from 'react'
import { Link } from 'react-router-dom'
import { avgReview } from '../../utils/movie-utils'

export function MovieBigCard({ movie }) {
  return (
    <div key={movie._id} className={`home-new-movie-container`}>
      <div
        className='new-movie-img-container'
        style={{
          backgroundImage: `url(${movie.coverUrl ? movie.coverUrl : ''})`,
        }}></div>
      <div className='info-continer-movie-card'>
        <div className={`title ${movie.title.length > 11 ? 'ellipsis' : ''}`}>
          {movie.title}
        </div>
        <div className='genres-container'>
          {movie.genres.map((genre) => (
            <div className='genre'>{genre}</div>
          ))}
        </div>
        <div className='btns-container'>
          <span className='movie-btn movie-btn-details'>
            <Link to={`/movie/${movie._id}`}>
              <i class='fas fa-info-circle'></i>
            </Link>
          </span>
          <span className='movie-btn'>
            <Link to={`/room/${movie._id}`}>
              <i class='far fa-play-circle'></i>
            </Link>
          </span>
          <span className='movie-btn'>
            <Link>
              <i class='fas fa-plus'></i>
            </Link>
          </span>
        </div>
        <div className='rate-container'>
          <div>
            <i class='far fa-eye'></i>
            {movie.viewersNumber
              ? movie.viewersNumber
              : Math.floor(Math.random() * (200 - 50) + 50)}
          </div>
          ⭐ {avgReview(movie)}/10
        </div>
      </div>
    </div>
  )
}
