import React from 'react'
import { Link } from 'react-router-dom'

export function MovieSmallCard({ movie }) {
  return (
    <div key={movie._id} className={`home-choice-container`}>
      <div
        className='img-container'
        style={{
          backgroundImage: `url(${movie.coverUrl ? movie.coverUrl : ''})`,
        }}></div>
      <div className='title-btns-container'>
        <div className={`title ${movie.title.length > 11 ? 'ellipsis' : ''}`}>
          {movie.title}
        </div>
        <div className='btns-container'>
          <Link to={`/movie/${movie._id}`}>
            <span className='movie-btn movie-btn-details'>
              <i class='fas fa-info-circle'></i>
            </span>
          </Link>

          <Link to={`/room/${movie._id}`}>
            <span className='movie-btn'>
              <i class='far fa-play-circle'></i>
            </span>
          </Link>
          <Link>
            <span className='movie-btn'>
              <i class='fas fa-plus'></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
